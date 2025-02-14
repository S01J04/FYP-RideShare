import mongoose from "mongoose";

const vehicleSchema = new mongoose.Schema(
  {
    driverId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    vehicleType: { type: String, required: true, enum: ["sedan", "car", "SUV", "truck", "minivan", "bus", "van"] },
    plateNumber: { type: String, required: true, unique: true, uppercase: true },
    model: { type: String, required: true },
    year: { type: Number, required: true, min: 1990, max: new Date().getFullYear() + 1 },
    color: { type: String, required: true },
    isPreferred: { type: Boolean, default: false } // ✅ Preferred vehicle field
  },
  { timestamps: true }
);

const Vehicle = mongoose.model("Vehicle", vehicleSchema);
export default Vehicle;
