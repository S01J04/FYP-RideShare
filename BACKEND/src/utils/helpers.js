import haversine from "haversine-distance";
import crypto from "crypto";

/**
 * Calculate distance between two coordinates using the Haversine formula
 * @param {Object} from - { lat: Number, lng: Number }
 * @param {Object} to - { lat: Number, lng: Number }
 * @returns {String} Distance in km
 */
export const getDistance = (from, to) => {
  const distanceMeters = haversine(
    { latitude: from.ltd, longitude: from.lng },
    { latitude: to.ltd, longitude: to.lng }
  );
  return (distanceMeters / 1000).toFixed(1) + " km"; // Convert to km
};

/**
 * Generate a unique ride code
 * @returns {String} Ride Code
 */
export const generateUniqueRideCode = () => {
  return "RIDE-" + crypto.randomBytes(3).toString("hex").toUpperCase();
};
