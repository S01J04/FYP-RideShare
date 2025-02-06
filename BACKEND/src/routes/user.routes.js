import { Router } from "express";
import { 
    loginUser, 
    logoutUser, 
    registerUser, 
    refreshAccessToken, 
    changeCurrentPassword, 
    getCurrentUser, 
    updateUserprofilePicture, 
    updateAccountDetails,
    verifyUser,
    deleteUser
} from "../controllers/userController.js";
import {upload} from "../middlewares/multer.middleware.js"
import { verifyJWT } from "../middlewares/auth.middleware.js";

import rateLimit from 'express-rate-limit';

const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 10, // Limit each IP to 10 requests per window
    message: "Too many login attempts, please try again later",
});

const router = Router()
    router.route('/delete').delete(verifyJWT,deleteUser)
router.route('/verify/:token').get(verifyUser)
router.route("/register").post(
    upload.fields([
        {
            name: "profilePicture",
            maxCount: 1
        }
    ]),
    registerUser
    )

router.route("/login").post(loginLimiter,loginUser)

//secured routes
router.route("/logout").get(verifyJWT,  logoutUser)//Logout
router.route("/refresh-token").get(refreshAccessToken)//Refreshtokkens
router.route("/change-password").post(verifyJWT, changeCurrentPassword)//change password
router.route("/current-user").get(verifyJWT, getCurrentUser)//get current user
router.route("/update-account").patch(verifyJWT, updateAccountDetails)//update current user
router.route("/profilePicture").patch(verifyJWT, upload.single("profilePicture"), updateUserprofilePicture)// update user profile picture

export default router