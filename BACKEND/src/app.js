import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import routes from "./routes/index.routes.js";
import ApiError from "./utils/ApiError.js"; // Adjust the path to your ApiError file

const app = express();

// Middleware

app.use(express.json({ limit: "50mb" })); // Limit JSON payload size
app.use(express.urlencoded({ extended: true, limit: "50mb" })); // Limit URL-encoded payload size
app.use(express.static("public")); // Serve static files from the "public" directory
app.use(cookieParser()); // Parse cookies


// CORS Middleware
app.use(
  cors({
    origin: "http://localhost:5173", // Replace with your frontend URL
    credentials: true, // Allow cookies
  })
);

// Handle Preflight Requests
app.options("*", cors({
  origin: "http://localhost:5173",
  credentials: true,
}));

// Set CORS Headers for All Routes
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:5173");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});
// Routes
app.use("/api", routes);

// Catch-all Route for Undefined Endpoints
app.use((req, res, next) => {
  next(new ApiError(404, "Resource not found"));
});

// Centralized Error Handler
app.use((err, req, res, next) => {
  // If it's an instance of ApiError, use its properties
  if (err instanceof ApiError) {
    return res.status(err.statusCode).json(err.toJSON());
  }

  // For other errors, fallback to a generic response
  console.error(err.stack); // Log the error stack for debugging
  res.status(500).json({
    success: false,
    statusCode: 500,
    message: "Internal Server Error",
    errors: [err.message], // Include the error message for debugging
  });
});

// Export the app for server setup
export { app };
