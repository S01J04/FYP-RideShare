import { useState } from "react";
import axiosInstance from "../axiosInstance";

export const useCreateRide = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const createRide = async (rideData) => {
    if (!rideData) {
      setError("Invalid ride data");
      return false;
    }

    setIsLoading(true);
    setError(null); // Reset error state before making a request

    try {
      const response = await axiosInstance.post("/rides/create-ride", rideData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });

      console.log("Ride Created:", response);
      return response; // Return the response data for further use
    } catch (err) {
      console.error("Error creating ride:", err);
      setError(err.response ? err.response.data : err.message);
      return null; // Return null to indicate failure
    } finally {
      setIsLoading(false);
    }
  };

  return { createRide, isLoading, error };
};
