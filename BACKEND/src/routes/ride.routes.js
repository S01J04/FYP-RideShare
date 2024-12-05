import express from "express";
import {
  createRide,
  getAllRides,
  getRideById,
  updateRide,
  deleteRide,
  getRidesByDriver,
} from "../controllers/rideController.js";

const router = express.Router();


router.post("/create", createRide);// Create a ride
router.get("/get-all", getAllRides);// Get all rides with optional filters
router.get("/get-by-id/:rideId", getRideById);// Get a ride by ID
router.put("/update/:rideId", updateRide);// Update a ride
router.delete("/delete/:rideId", deleteRide);// Delete a ride
router.get("/driver/:driverId", getRidesByDriver);// Get rides by a driver

export default router;
