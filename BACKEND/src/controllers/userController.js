import  {asyncHandler}  from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js"
import  User from "../models/user.model.js"
import {uploadOnCloudinary} from "../utils/cloudinary.js"
import  ApiResponse  from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken"
import mongoose from "mongoose";
import sendVerificationEmail from "../utils/sendmail.js"
import { request } from "express";


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
    console.log(token)
    try {
        // Decode and verify the token
        const decoded = jwt.verify(token, process.env.EMAIL_VERIFICATION_SECRET);
        const { email } = decoded;

        // Find the user by email
        const user = await User.findOne({ email });
        console.log(user)
        if (!user) {
            throw new ApiError(404, "User not found");
        }

        if (user.emailverified) {
            return res
                .status(400)
                .json(new ApiResponse(202, null, "Email is already verified"));
        }

        // Mark the user as verified
        user.emailverified = true; // Update the `verified` field
        user.verificationToken = undefined; // Clear the token
        await user.save();

        return res
            .status(200)
            .json(new ApiResponse(200, user, "Email verified successfully"));
    } catch (error) {
        console.error("Verification error:", error.message);
        throw new ApiError(400, "Invalid or expired verification link");
    }
});


const registerUser = asyncHandler( async (req, res) => {
    console.log(req.body)
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

    // const uploadUserprofilePictureLocalPath = req.files?.profilePicture[0]?.path;
    // //const coverImageLocalPath = req.files?.coverImage[0]?.path;

    // if (!uploadUserprofilePictureLocalPath ) {
    //     throw new ApiError(400, "updateUserprofilePicture file is required")
    // }

    // const uploadUserprofilePicture = await uploadOnCloudinary(uploadUserprofilePictureLocalPath)

    const verificationToken=jwt.sign({ email },process.env.EMAIL_VERIFICATION_SECRET,  { expiresIn: "1h" })

    // if (!updateUserprofilePicture) {
    //     throw new ApiError(400, "updateUserprofilePicture file is required")
    // }
   

    await User.create({
        fullName,
        // profilePicture: uploadUserprofilePicture.url,
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
    console.log(req.body);

    if (!email || !password) {
        throw new ApiError(400, "Email and password are required");
    }

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
        throw new ApiError(404, "Invalid credentials");
    }

    if (!user.emailverified) {
        throw new ApiError(403, "Please verify your email before logging in");
    }

    const isPasswordValid = await user.isPasswordCorrect(password);

    if (!isPasswordValid) {
        console.log("Invalid password attempt");
        throw new ApiError(401, "Invalid credentials");
    }

    // Generate tokens
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    // Define secure cookie options
    const cookieOptions = {
        httpOnly: true,
        secure: true, // Only send over HTTPS
        sameSite: "Strict", // Prevent CSRF attacks
    };

    // Set cookies with explicit expiration
    res.cookie("accessToken", accessToken, {
        ...cookieOptions,
        maxAge: 30 * 60 * 1000, // 30 minute
    });

    res.cookie("refreshToken", refreshToken, {
        ...cookieOptions,
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    });

    // Remove password from response
    user.password = undefined;

    return res.status(200).json({
        success: true,
        statusCode: 200,
        data: { user, accessToken },
        message: "Login successful",
    });
});

const logoutUser = asyncHandler(async (req, res) => {
    try {
        // Ensure user exists before trying to update
        if (req.user) {
            await User.findByIdAndUpdate(req.user._id, {
                $unset: {
                    refreshToken: 1,
                    socketId: 1,
                },
            }, { new: true });
        }

        console.log("Logging out user...");

        // Clear cookies properly
        res.clearCookie("accessToken", {
            httpOnly: true,
            secure: true,
            sameSite: "Strict",
        });

        res.clearCookie("refreshToken", {
            httpOnly: true,
            secure: true,
            sameSite: "Strict",
        });

        return res.status(200).json(new ApiResponse(200, {}, "User logged out successfully"));
    } catch (error) {
        console.error("Logout error:", error);
        return res.status(500).json(new ApiError(500, "Logout failed"));
    }
});


const refreshAccessToken = asyncHandler(async (req, res) => {
    const refreshToken = req.cookies?.refreshToken || req.header("Authorization")?.replace("Bearer ", "");
    
    if (!refreshToken) {
        throw new ApiError(401, "No refresh token provided");
    }

    try {
        // Verify the refresh token
        const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
        
        const user = await User.findById(decoded._id);
        if (!user) {
            throw new ApiError(401, "User not found");
        }

        // Generate a new access token
        const newAccessToken = user.generateAccessToken();

        // Define secure cookie options
        const cookieOptions = {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production", // Only send over HTTPS in production
            sameSite: "Strict", // Prevent CSRF attacks
        };

        console.log("New Access Token Generated:", newAccessToken);

        // Send new access token in response
        return res
            .cookie("accessToken", newAccessToken, {
                ...cookieOptions,
                maxAge: 30 * 60 * 1000, // 15 minutes
            })
            .status(200)
            .json({ accessToken: newAccessToken });

    } catch (error) {
        console.error("Refresh token error:", error);
        throw new ApiError(403, "Invalid or expired refresh token");
    }
});



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
    const profilePictureLocalPath = req.files?.profilePicture[0]?.path
    console.log(req)
    console.log(profilePictureLocalPath,req.body)
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
        new ApiResponse(200, {user}, "profilePicture image updated successfully")
    )
})

const deleteUser = asyncHandler(async(req, res) => {
    const user = await User.findByIdAndDelete(req.user?._id)
    return res
    .status(200)
    .json(new ApiResponse(200, user, "User deleted successfully"))
})

const CreateUserProfile = asyncHandler(async (req, res, next) => {
    try {
        console.log(req.body);
        const userId = req.user._id;
        let { feild, value } = req.body; // 'feild' is misspelled, change to 'field' if needed

        // Fix typo in 'feild' -> should be 'field'
        const field = feild; 

        // Fetch user from DB
        const user = await User.findById(userId);
        if (!user) {
            return next(new ApiError(404, "User not found"));
        }

        // Validate required fields
        if (!field || !value) {
            return next(new ApiError(400, "Fields required"));
        }

        // Convert Date of Birth correctly
        if (field === "dateofbirth") {
            value = new Date(value); // Convert '2025-02-04' to a Date object
        }

        // Check if field already exists
        if (user[field]) {
            return next(new ApiError(400, `Field ${field} already exists`));
        }

        // Update user profile
        user[field] = value;
        await user.save();

        res.json(new ApiResponse(200, {user}, `${field} added successfully`));
    } catch (error) {
        next(new ApiError(500, error.message || "Internal Server Error"));
    }
});

const UpdateUserProfile = asyncHandler(async (req, res) => {
    console.log(req.body)
    try {
      const userId = req.user._id;
      const { feild, value } = req.body;
  // Fix typo in 'feild' -> should be 'field'
  const field = feild; 
      // Validations
      if (!field || !value) {
        throw new ApiError(400, "Fields required");
      }
  
      // Fetch user from database
      const user = await User.findById(userId);
      if (!user) {
        throw new ApiError(404, "User not found");
      }
  
      // Prevent unnecessary updates
      if (user[field] == value) {
        throw new ApiError(400, `Field '${field}' already has this value`);
      }
  
      // Handle name updates separately
      if (field === "firstname" || field === "lastname") {
        let nameParts = user.fullName ? user.fullName.split(" ") : ["", ""];
  
        if (field === "firstname") {
          nameParts[0] = value; // Update first name
        } else if (field === "lastname") {
          nameParts[1] = value; // Update last name
        }
  
        user.fullName = nameParts.join(" ").trim(); // Reconstruct full name
      } else {
        user[field] = value; // Update other fields normally
      }
  
      await user.save();
  
      res.json(new ApiResponse(200, {user}, `${field} updated successfully`));
    } catch (error) {
      throw new ApiError(500, error.message || "Internal Server Error");
    }
  });

export {
    registerUser,
    loginUser,
    logoutUser,
    refreshAccessToken,
    changeCurrentPassword,
    getCurrentUser,
    updateAccountDetails,
    updateUserprofilePicture,
    CreateUserProfile,
    UpdateUserProfile,
    verifyUser,
    deleteUser
}
