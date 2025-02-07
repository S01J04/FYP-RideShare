import { getDistanceTime } from './mapservices.js';

import rideModel from '../models/Ride.model.js';

export const getFare = async (pickup, destination) => {
    if (!pickup || !destination) {
        throw new Error('Pickup and destination are required');
    }

    const distanceTime = await getDistanceTime(pickup, destination);
    const distanceKm = distanceTime.distance.value / 1000; // Convert meters to km
    const durationMin = distanceTime.duration.value / 60; // Convert seconds to minutes

    // Reference pricing: Swabi to Mardan ~250 PKR, Swabi to Peshawar ~500 PKR
    const baseFareCar = 100; // Base starting fare for a car
    const perKmRateCar = 15; // Rate per km for a car
    const perMinuteRateCar = 3; // Rate per minute for a car

    const baseFareCargo = 200; // Base starting fare for cargo
    const perKmRateCargo = 20; // Rate per km for cargo
    const perMinuteRateCargo = 5; // Rate per minute for cargo

    const carFare = Math.round(
        baseFareCar + (distanceKm * perKmRateCar) + (durationMin * perMinuteRateCar)
    );

    const cargoFare = Math.round(
        baseFareCargo + (distanceKm * perKmRateCargo) + (durationMin * perMinuteRateCargo)
    );

    return {
        car: carFare,
        cargo: cargoFare
    };
}



function getOtp(num) {
    function generateOtp(num) {
        const otp = crypto.randomInt(Math.pow(10, num - 1), Math.pow(10, num)).toString();
        return otp;
    }
    return generateOtp(num);
}


export const createRide = async ({
    user, pickup, destination, vehicleType
}) => {
    if (!user || !pickup || !destination || !vehicleType) {
        throw new Error('All fields are required');
    }

    const fare = await getFare(pickup, destination);



    const ride = rideModel.create({
        user,
        pickup,
        destination,
        otp: getOtp(6),
        fare: fare[ vehicleType ]
    })

    return ride;
}

export const confirmRide = async ({
    rideId, captain
}) => {
    if (!rideId) {
        throw new Error('Ride id is required');
    }

    await rideModel.findOneAndUpdate({
        _id: rideId
    }, {
        status: 'accepted',
        captain: captain._id
    })

    const ride = await rideModel.findOne({
        _id: rideId
    }).populate('user').populate('captain').select('+otp');

    if (!ride) {
        throw new Error('Ride not found');
    }

    return ride;

}

export const startRide = async ({ rideId, otp, captain }) => {
    if (!rideId || !otp) {
        throw new Error('Ride id and OTP are required');
    }

    const ride = await rideModel.findOne({
        _id: rideId
    }).populate('user').populate('captain').select('+otp');

    if (!ride) {
        throw new Error('Ride not found');
    }

    if (ride.status !== 'accepted') {
        throw new Error('Ride not accepted');
    }

    if (ride.otp !== otp) {
        throw new Error('Invalid OTP');
    }

    await rideModel.findOneAndUpdate({
        _id: rideId
    }, {
        status: 'ongoing'
    })

    return ride;
}

export const endRide = async ({ rideId, captain }) => {
    if (!rideId) {
        throw new Error('Ride id is required');
    }

    const ride = await rideModel.findOne({
        _id: rideId,
        captain: captain._id
    }).populate('user').populate('captain').select('+otp');

    if (!ride) {
        throw new Error('Ride not found');
    }

    if (ride.status !== 'ongoing') {
        throw new Error('Ride not ongoing');
    }

    await rideModel.findOneAndUpdate({
        _id: rideId
    }, {
        status: 'completed'
    })

    return ride;
}

