import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String , required: true},
    role: { type: String, enum: ["driver", "passenger", "admin"], default: "passenger" },
    phoneNumber: { type: String },
    profilePicture: { type: String },
    emailverified: { type: Boolean, default: false }, // User verification status for google
    verified: { type: Boolean, default: false }, // User verification status for google
    verificationToken: { type: String }, // Email verification token
    refreshToken: { type: String },
    lastLogin: { type: Date },
    accountStatus: { type: String, enum: ["active", "suspended", "deactivated"], default: "active" },
    socketId: { type: String, default: null },
  },
  { timestamps: true }
);

// Hash password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Verify password
userSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};

// Generate JWT Access Token
userSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    { _id: this._id, email: this.email, role: this.role },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
  );
};

// Generate JWT Refresh Token
userSchema.methods.generateRefreshToken = function () {
  return jwt.sign(
    { _id: this._id },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: process.env.REFRESH_TOKEN_EXPIRY }
  );
};

 const User = mongoose.model("User", userSchema);
 export default User