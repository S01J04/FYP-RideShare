import Ride from "../models/Ride.model.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

// Create a new ride
export const createRide = asyncHandler(async (req, res) => {
  const {
    driverId,
    passengers,
    startLocation,
    endLocation,
    stops,
    departureDate,
    availableSeats,
    cargoCapacityAvailable,
    pricePerSeat,
    pricePerCubicFoot,
  } = req.body;

  // Validation
  if (!startLocation || !endLocation || !departureDate) {
    throw new ApiError(400, "All required fields must be provided.");
  }

  const newRide = new Ride({
    driverId,
    passengers,
    startLocation,
    endLocation,
    stops,
    departureDate,
    availableSeats,
    cargoCapacityAvailable,
    pricePerSeat,
    pricePerCubicFoot,
  });

  const savedRide = await newRide.save();
  return res
    .status(201)
    .json(new ApiResponse(201, savedRide, "Ride created successfully."));
});

// Get all rides (with optional filters)
export const getAllRides = asyncHandler(async (req, res) => {
  const { departureDate, startLocation, endLocation } = req.query;

  const query = {};
  if (departureDate) {
    query.departureDate = { $gte: new Date(departureDate) };
  }
  if (startLocation) {
    query["startLocation.address"] = { $regex: startLocation, $options: "i" };
  }
  if (endLocation) {
    query["endLocation.address"] = { $regex: endLocation, $options: "i" };
  }

  const rides = await Ride.find(query).populate("driverId", "fullName email").lean();
  return res
    .status(200)
    .json(new ApiResponse(200, rides, "Rides fetched successfully."));
});

// Get ride by ID
export const getRideById = asyncHandler(async (req, res) => {
  const { rideId } = req.params;

  const ride = await Ride.findById(rideId).populate("driverId", "fullName email").lean();
  if (!ride) {
    throw new ApiError(404, "Ride not found.");
  }

  return res.status(200).json(new ApiResponse(200, ride, "Ride details fetched."));
});

// Update a ride
export const updateRide = asyncHandler(async (req, res) => {
  const { rideId } = req.params;
  const updates = req.body;

  const updatedRide = await Ride.findByIdAndUpdate(rideId, updates, { new: true });
  if (!updatedRide) {
    throw new ApiError(404, "Ride not found.");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, updatedRide, "Ride updated successfully."));
});

// Delete a ride
export const deleteRide = asyncHandler(async (req, res) => {
  const { rideId } = req.params;

  const deletedRide = await Ride.findByIdAndDelete(rideId);
  if (!deletedRide) {
    throw new ApiError(404, "Ride not found.");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, null, "Ride deleted successfully."));
});

// Get rides created by a driver
export const getRidesByDriver = asyncHandler(async (req, res) => {
  const { driverId } = req.params;

  const rides = await Ride.find({ driverId }).populate("driverId", "fullName email").lean();
  return res
    .status(200)
    .json(new ApiResponse(200, rides, "Rides by driver fetched successfully."));
});
