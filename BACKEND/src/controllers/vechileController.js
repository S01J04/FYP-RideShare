import Vehicle from "../models/Vehicle.model.js";
import  ApiError  from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";

// Add a new vehicle
export const addVehicle = asyncHandler(async (req, res) => {
    const { vehicleType, plateNumber, capacity, cargoAllowed, cargoCapacity } = req.body;

    if (!vehicleType || !plateNumber || !capacity) {
        throw new ApiError(400, "All required fields must be provided");
    }

    const vehicle = await Vehicle.create({
        driverId: req.user._id, // Assuming `verifyJWT` middleware sets `req.user`
        vehicleType,
        plateNumber,
        capacity,
        cargoAllowed,
        cargoCapacity,
    });

    res.status(201).json({
        success: true,
        message: "Vehicle added successfully",
        data: vehicle,
    });
});

// Get all vehicles
export const getVehicles = asyncHandler(async (req, res) => {
    const vehicles = await Vehicle.find({ driverId: req.user._id }); // Fetch vehicles for the logged-in user
    res.status(200).json({
        success: true,
        data: vehicles,
    });
});

// Get vehicle by ID
export const getVehicleById = asyncHandler(async (req, res) => {
    const { vehicleId } = req.params;

    const vehicle = await Vehicle.findOne({
        _id: vehicleId,
        driverId: req.user._id,
    });

    if (!vehicle) {
        throw new ApiError(404, "Vehicle not found");
    }

    res.status(200).json({
        success: true,
        data: vehicle,
    });
});

// Update a vehicle
export const updateVehicle = asyncHandler(async (req, res) => {
    const { vehicleId } = req.params;
    const updates = req.body;

    const vehicle = await Vehicle.findOneAndUpdate(
        { _id: vehicleId, driverId: req.user._id },
        { $set: updates },
        { new: true, runValidators: true }
    );

    if (!vehicle) {
        throw new ApiError(404, "Vehicle not found or not authorized to update");
    }

    res.status(200).json({
        success: true,
        message: "Vehicle updated successfully",
        data: vehicle,
    });
});

// Delete a vehicle
export const deleteVehicle = asyncHandler(async (req, res) => {
    const { vehicleId } = req.params;

    const vehicle = await Vehicle.findOneAndDelete({
        _id: vehicleId,
        driverId: req.user._id,
    });

    if (!vehicle) {
        throw new ApiError(404, "Vehicle not found or not authorized to delete");
    }

    res.status(200).json({
        success: true,
        message: "Vehicle deleted successfully",
    });
});
