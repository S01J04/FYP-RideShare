import { validationResult } from 'express-validator';
import { confirmRide, endRide,getFare, startRide} from '../utils/rideService.js';
import { sendMessageToSocketId } from '../utils/socket.js';
import ApiResponse from '../utils/ApiResponse.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import Ride from '../models/Ride.model.js';
import moment from 'moment'
export const PublishRide = async (req, res) => {
    try {
      // Validate incoming request
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, errors: errors.array() });
      }
  
      const {
        driverId,
        vehicleId,
        fromCoordinates,
        toCoordinates,
        polyline,
        fromLocation,
        toLocation,
        time,
        selectedDate,
        rideType,
        endtime,
        distance,
        duration,
        seats,
        pricePerSeat,
        cargoCapacity,
        priceCargoCapacity,
      } = req.body;
      console.log(req.body)
      // Validate required fields
      if (!driverId || !vehicleId || !fromCoordinates || !toCoordinates || !selectedDate || !rideType) {
        return res.status(400).json({ success: false, message: "Missing required fields" });
      }
  
      // Validate ride type
      const allowedRideTypes = ["passenger", "cargo", "mixed"];
      if (!allowedRideTypes.includes(rideType)) {
        return res.status(400).json({ success: false, message: "Invalid ride type" });
      }
      const normalizedDepartureDate = moment(selectedDate).startOf("day").toISOString();

      // Convert time to 24-hour format
    const startTime24 = moment(time, ["h:mm A"]).format("HH:mm");
    const endTime24 = moment(endtime, ["h:mm A"]).format("HH:mm");

    // Ensure end time is after start time
    if (moment(endTime24, "HH:mm").isBefore(moment(startTime24, "HH:mm"))) {
      return res.status(400).json({ success: false, message: "End time must be after start time" });
    }

    // Check for overlapping rides for the same driver on the same date
    const existingRides = await Ride.findOne({
        driverId,
        departureDate: normalizedDepartureDate,
        $or: [
            { starttime: { $lt: endTime24 }, endtime: { $gt: startTime24 } }, // Partial overlap
            { starttime: startTime24, endtime: endTime24 } // Exact match
        ]
    });

    if (existingRides.length > 0) {
      return res.status(400).json({ success: false, message: "Ride time conflicts with an existing ride" });
    }
    if (existingRides) {
        return res.status(400).json({ 
            success: false, 
            message: "A ride already exists in this time range. Please choose a different time."
        });
    }
    
      // Calculate actual distance if not provided
      const calculatedDistance = distance || getDistance(fromCoordinates, toCoordinates);
  
      // Construct ride object
      const rideData = {
        driverId,
        vehicleId,
        startLocation: {
            lat: fromCoordinates.ltd,
            lng: fromCoordinates.lng,
            address: fromLocation,
          },
          endLocation: {
            lat: toCoordinates.ltd,
            lng: toCoordinates.lng,
            address: toLocation,
          },
        polyline,
        starttime: startTime24,
        endtime: endTime24,
        departureDate:selectedDate,
        rideType,
        totalDistance: calculatedDistance,
        totalDuration: duration,
      };
  
      if (rideType === "passenger") {
        if (!seats || !pricePerSeat) {
          return res.status(400).json({ success: false, message: "Seats and price per seat are required for passenger rides" });
        }
        rideData.totalSeats = seats;
        rideData.pricePerSeat = pricePerSeat;
      } else if (rideType === "cargo") {
        if (!cargoCapacity || !priceCargoCapacity) {
          return res.status(400).json({ success: false, message: "Cargo capacity and price per unit are required for cargo rides" });
        }
        rideData.cargoCapacity = cargoCapacity;
        rideData.priceCargoCapacity = priceCargoCapacity;
      } else if (rideType === "mixed") {
        if (!seats || !pricePerSeat || !cargoCapacity || !priceCargoCapacity) {
          return res.status(400).json({ success: false, message: "All fields for passenger and cargo rides are required for mix ride" });
        }
        rideData.totalSeats = seats;
        rideData.pricePerSeat = pricePerSeat;
        rideData.cargoCapacity = cargoCapacity;
        rideData.priceCargoCapacity = priceCargoCapacity;
      }
  
      // Create the ride
      const ride = new Ride(rideData);
      await ride.save();
  
      return res.status(201).json(
        new ApiResponse(201,ride,"Ride created successfully")
      );
  
    } catch (error) {
      console.error("Error creating ride:", error);
      return res.status(500).json({
        success: false,
        message: "Internal server error",
        error: error.message,
      });
    }
  };

export const calculateFare = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { pickup, destination } = req.query;

    try {
        const fare = await getFare(pickup, destination);
        return res.status(200).json(fare);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};

export const approveRideRequest = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { rideId } = req.body;

    try {
        const ride = await confirmRide({ rideId, captain: req.captain });

        sendMessageToSocketId(ride.user.socketId, {
            event: 'ride-confirmed',
            data: ride
        });

        return res.status(200).json(ride);
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: err.message });
    }
};

export const commenceRide = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { rideId, otp } = req.query;

    try {
        const ride = await startRide({ rideId, otp, captain: req.captain });

        console.log(ride);

        sendMessageToSocketId(ride.user.socketId, {
            event: 'ride-started',
            data: ride
        });

        return res.status(200).json(ride);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};

export const finalizeRide = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { rideId } = req.body;

    try {
        const ride = await endRide({ rideId, captain: req.captain });

        sendMessageToSocketId(ride.user.socketId, {
            event: 'ride-ended',
            data: ride
        });

        return res.status(200).json(ride);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    } 
};
