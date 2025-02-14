import { Router } from "express";
import {
    addVehicle,
    getVehicles,
    getVehicleById,
    updateVehicle,
    deleteVehicle,
    getPreferredVehicle,
    setPreferredVehicle,
} from "../controllers/vechileController.js";

const router = Router();

router.patch('/update-preferences/:vehicleId', setPreferredVehicle);
router.get('/preferred', getPreferredVehicle);
// Create a new vehicle
router.post("/", addVehicle);

// Get all vehicles
router.get("/fetchvehicles", getVehicles);

// Get a specific vehicle by ID
router.get("/:vehicleId", getVehicleById);

// Update a vehicle
router.patch("/:vehicleId", updateVehicle);

// Delete a vehicle
router.delete("/:vehicleId", deleteVehicle);

export default router;
