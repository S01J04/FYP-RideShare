import Vehicle from "../models/Vehicle.model.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

// ✅ Add a new vehicle
export const addVehicle = asyncHandler(async (req, res) => {
    const { vehicleType, plateNumber, model, year, color } = req.body;

    if (!vehicleType || !plateNumber || !model || !year || !color) {
        throw new ApiError(400, "All required fields must be provided");
    }

    // Ensure plate number is uppercase
    const formattedPlateNumber = plateNumber.toUpperCase();

    // Check for duplicate plate number
    const existingVehicle = await Vehicle.findOne({ plateNumber: formattedPlateNumber });
    if (existingVehicle) {
        throw new ApiError(409, "Vehicle with this plate number already exists");
    }

    // Check if the driver already has a vehicle
    const hasVehicles = await Vehicle.exists({ driverId: req.user._id });

    // Create the new vehicle
    const vehicle = await Vehicle.create({
        driverId: req.user._id,
        vehicleType,
        plateNumber: formattedPlateNumber,
        model,
        year,
        color,
        isPreferred: !hasVehicles, // If no previous vehicles, set as preferred
    });

    res.status(201).json(new ApiResponse(201, vehicle, "Vehicle added successfully"));
});


// ✅ Get all vehicles for the logged-in driver
export const getVehicles = asyncHandler(async (req, res) => {
    const vehicles = await Vehicle.find({ driverId: req.user._id }).sort({ createdAt: -1 });
    console.log(vehicles)
    res.status(200).json(new ApiResponse(200,vehicles,"Vehicles fetched successfully"));
});

// ✅ Get a single vehicle by ID
export const getVehicleById = asyncHandler(async (req, res) => {
    const { vehicleId } = req.params;

    if (!vehicleId) throw new ApiError(400, "Vehicle ID is required");

    const vehicle = await Vehicle.findOne({
        _id: vehicleId,
        driverId: req.user._id,
    });

    if (!vehicle) {
        throw new ApiError(404, "Vehicle not found or access denied");
    }

    res.status(200).json({
        success: true,
        data: vehicle,
    });
});

// ✅ Update a vehicle
export const updateVehicle = asyncHandler(async (req, res) => {
    const { vehicleId } = req.params;
    const updates = req.body;

    if (!vehicleId) throw new ApiError(400, "Vehicle ID is required");

    const vehicle = await Vehicle.findOneAndUpdate(
        { _id: vehicleId, driverId: req.user._id }, // Only allow updating vehicles belonging to the user
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
export const getPreferredVehicle = asyncHandler(async (req, res) => {
    const vehicle = await Vehicle.findOne({ driverId: req.user._id, preferred: true });

    if (!vehicle) throw new ApiError(404, "No preferred vehicle found");

    res.status(200).json({
        success: true,
        data: vehicle,
    });
});

export const setPreferredVehicle = asyncHandler(async (req, res) => {
    const { vehicleId } = req.params;
    console.log(vehicleId);

    if (!vehicleId) throw new ApiError(400, "Vehicle ID is required");
    console.log("Hey")
    // Ensure vehicle belongs to the driver
    const vehicle = await Vehicle.findOne({ plateNumber: String(vehicleId), driverId: req.user._id });
    if (!vehicle) throw new ApiError(404, "Vehicle not found or not authorized");
    
    // Unset previous preferred vehicle
    await Vehicle.updateMany({ driverId: req.user._id, isPreferred: true }, { $set: { isPreferred: false } });

    // Set new preferred vehicle
    vehicle.isPreferred = true;
    await vehicle.save();
    // Fetch all vehicles for the driver
    const allVehicles = await Vehicle.find({ driverId: req.user._id });
    res.status(200).json(new ApiResponse(200,allVehicles,"Vehicle preferences updated successfully"));
});

// ✅ Delete a vehicle
export const deleteVehicle = asyncHandler(async (req, res) => {
    const { vehicleId } = req.params;

    if (!vehicleId) throw new ApiError(400, "Vehicle ID is required");

    const vehicle = await Vehicle.findOneAndDelete({
        _id: vehicleId,
        driverId: req.user._id, // Ensure only the owner can delete their vehicle
    });

    if (!vehicle) {
        throw new ApiError(404, "Vehicle not found or not authorized to delete");
    }

    res.status(200).json({
        success: true,
        message: "Vehicle deleted successfully",
    });
});
