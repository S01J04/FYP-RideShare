import mongoose from 'mongoose';
const vehicleSchema = new mongoose.Schema(
    {
      driverId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
      vehicleType: { type: String, required: true }, // E.g., sedan, SUV, truck
      plateNumber: { type: String, required: true, unique: true },
      capacity: { type: Number, required: true }, // Passenger capacity
      rating: { type: Number, default: 0 },
      cargoAllowed: { type: Boolean, default: false },
      cargoCapacity: { type: Number }, // Cargo capacity in cubic feet
    },
    { timestamps: true }
  );
  
  const Vehicle = mongoose.model('Vehicle', vehicleSchema);
  
  export default Vehicle;
  