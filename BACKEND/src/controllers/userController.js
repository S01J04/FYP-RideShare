import  {asyncHandler}  from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js"
import  User from "../models/user.model.js"
import {uploadOnCloudinary} from "../utils/cloudinary.js"
import  ApiResponse  from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken"
import mongoose from "mongoose";
import sendVerificationEmail from "../utils/sendmail.js"


const generateAccessAndRefereshTokens = async(userId) =>{
    try {
        const user = await User.findById(userId)
        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()

        user.refreshToken = refreshToken
        await user.save({ validateBeforeSave: false })

        return {accessToken, refreshToken}


    } catch (error) {
        throw new ApiError(500, "Something went wrong while generating referesh and access token")
    }
}

const verifyUser = asyncHandler(async (req, res) => {
    const { token } = req.params; // Extract the token from the URL

    try {
        // Decode and verify the token
        const decoded = jwt.verify(token, process.env.EMAIL_VERIFICATION_SECRET);
        const { email } = decoded;

        // Find the user by email
        const user = await User.findOne({ email });

        if (!user) {
            throw new ApiError(404, "User not found");
        }

        if (user.emailverified) {
            return res
                .status(400)
                .json(new ApiResponse(400, null, "Email is already verified"));
        }

        // Mark the user as verified
        user.emailverified = true; // Update the `verified` field
        user.verificationToken = undefined; // Clear the token
        await user.save();

        return res
            .status(200)
            .json(new ApiResponse(200, null, "Email verified successfully"));
    } catch (error) {
        console.error("Verification error:", error.message);
        throw new ApiError(400, "Invalid or expired verification link");
    }
});


const registerUser = asyncHandler( async (req, res) => {
    const emailRegex = 

/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/


function isEmailValid(email) {
    // Check if the email is defined and not too long
    if (!email || email.length > 254) return false;

    // Use a single regex check for the standard email parts
    if (!emailRegex.test(email)) return false;

    // Split once and perform length checks on the parts
    const parts = email.split("@");
    if (parts[0].length > 64) return false;

    // Perform length checks on domain parts
    const domainParts = parts[1].split(".");
    if (domainParts.some(part => part.length > 63)) return false;

    // If all checks pass, the email is valid
    return true;
}
    const {fullName, email, password } = req.body
    //console.log("email: ", email);

    if (
        [fullName, email, password].some((field) => field?.trim() === "")
    ) {
        throw new ApiError(400, "All fields are required")
    }
     if(!isEmailValid(email)){
        throw new ApiError(400,"plz provide valid email")
     }
    const existedUser = await User.findOne({
          email 
    })

    if (existedUser) {
        throw new ApiError(409, "User with email or username already exists")
    }
    //console.log(req.files);

    const uploadUserprofilePictureLocalPath = req.files?.profilePicture[0]?.path;
    //const coverImageLocalPath = req.files?.coverImage[0]?.path;

    if (!uploadUserprofilePictureLocalPath ) {
        throw new ApiError(400, "updateUserprofilePicture file is required")
    }

    const uploadUserprofilePicture = await uploadOnCloudinary(uploadUserprofilePictureLocalPath)

    const verificationToken=jwt.sign({ email },process.env.EMAIL_VERIFICATION_SECRET,  { expiresIn: "1h" })

    if (!updateUserprofilePicture) {
        throw new ApiError(400, "updateUserprofilePicture file is required")
    }
   

    await User.create({
        fullName,
        profilePicture: uploadUserprofilePicture.url,
        email,
        emailverified:false,
        verified: false,
        verificationToken,
        password, 
        
    })
    await sendVerificationEmail(email, verificationToken);

    return res.status(201).json(
        new ApiResponse(201, null, "User registered. Please verify your email.")
    );

} )

const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        throw new ApiError(400, "Email and password are required");
    }

    const user = await User.findOne({ email });

    if (!user) {
        throw new ApiError(404, "User not found");
    }

    if (!user.emailverified) {
        throw new ApiError(403, "Please verify your email before logging in");
    }

    const isPasswordValid = await user.isPasswordCorrect(password);

    if (!isPasswordValid) {
        throw new ApiError(401, "Invalid credentials");
    }

    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    const options = {
        httpOnly: true,
        secure: true,
    };
    

    return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(
            new ApiResponse(
                200,
                { user, accessToken, refreshToken },
                "Login successful"
            )
        );
});

const logoutUser = asyncHandler(async(req, res) => {
    await User.findByIdAndUpdate(
        req.user._id,
        {
            $unset: {
                refreshToken: 1, // this removes the field from document,
                socketId: 1
            }
        },
        {
            new: true
        }
    )

    const options = {
        httpOnly: true,
        secure: true
    }

    return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "User logged Out"))
})

const refreshAccessToken = asyncHandler(async (req, res) => {
    const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken

    if (!incomingRefreshToken) {
        throw new ApiError(401, "unauthorized request")
    }

    try {
        const decodedToken = jwt.verify(
            incomingRefreshToken,
            process.env.REFRESH_TOKEN_SECRET
        )
    
        const user = await User.findById(decodedToken?._id)
    
        if (!user) {
            throw new ApiError(401, "Invalid refresh token")
        }
    
        if (incomingRefreshToken !== user?.refreshToken) {
            throw new ApiError(401, "Refresh token is expired or used")
            
        }
    
        const options = {
            httpOnly: true,
            secure: true
        }
    
        const {accessToken, newRefreshToken} = await generateAccessAndRefereshTokens(user._id)
    
        return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", newRefreshToken, options)
        .json(
            new ApiResponse(
                200, 
                {accessToken, refreshToken: newRefreshToken},
                "Access token refreshed"
            )
        )
    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid refresh token")
    }

})

const changeCurrentPassword = asyncHandler(async(req, res) => {
    const {oldPassword, newPassword} = req.body

    

    const user = await User.findById(req.user?._id)
    const isPasswordCorrect = await user.isPasswordCorrect(oldPassword)

    if (!isPasswordCorrect) {
        throw new ApiError(400, "Invalid old password")
    }

    user.password = newPassword
    await user.save({validateBeforeSave: false})

    return res
    .status(200)
    .json(new ApiResponse(200, {}, "Password changed successfully"))
})


const getCurrentUser = asyncHandler(async(req, res) => {
    return res
    .status(200)
    .json(new ApiResponse(
        200,
        req.user,
        "User fetched successfully"
    ))
})

const updateAccountDetails = asyncHandler(async(req, res) => {
    const {fullName, email} = req.body

    if (!fullName || !email) {
        throw new ApiError(400, "All fields are required")
    }

    const user = await User.findByIdAndUpdate(
        req.user?._id,
        {
            $set: {
                fullName,
                email: email
            }
        },
        {new: true}
        
    ).select("-password")

    return res
    .status(200)
    .json(new ApiResponse(200, user, "Account details updated successfully"))
});

const updateUserprofilePicture = asyncHandler(async(req, res) => {
    const profilePictureLocalPath = req.file?.path

    if (!profilePictureLocalPath ) {
        throw new ApiError(400, "updateUserprofilePicture file is missing")
    }

    //TODO: delete old image - assignment

    const profilePicture = await uploadOnCloudinary(profilePictureLocalPath )

    if (!profilePicture.url) {
        throw new ApiError(400, "Error while uploading on updateUserprofilePicture")
        
    }

    const user = await User.findByIdAndUpdate(
        req.user?._id,
        {
            $set:{
                profilePicture: profilePicture.url
            }
        },
        {new: true}
    ).select("-password")

    return res
    .status(200)
    .json(
        new ApiResponse(200, user, "profilePicture image updated successfully")
    )
})

const deleteUser = asyncHandler(async(req, res) => {
    const user = await User.findByIdAndDelete(req.user?._id)
    return res
    .status(200)
    .json(new ApiResponse(200, user, "User deleted successfully"))
})



export {
    registerUser,
    loginUser,
    logoutUser,
    refreshAccessToken,
    changeCurrentPassword,
    getCurrentUser,
    updateAccountDetails,
    updateUserprofilePicture,
    verifyUser,
    deleteUser
}