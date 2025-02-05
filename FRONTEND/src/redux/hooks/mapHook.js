import axiosInstance from "../axiosInstance";
import { useState } from "react";

export const useMaps = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    // Function to Get Location Suggestions
    const handleDestinationChange = async (e) => {
        console.log("Getting destination suggestions...");
        const inputValue = e.target.value;
        if (!inputValue) return [];

        setIsLoading(true);
        try {
            const response = await axiosInstance.get(`/maps/get-suggestions`, {
                params: { input: inputValue },
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });

            console.log(response); // ✅ Ensure this prints expected data
            return response || [];  // ✅ Return suggestions correctly
        } catch (err) {
            console.error("Error fetching suggestions:", err);
            return [];
        } finally {
            setIsLoading(false);
        }
    };

    // Function to Get Coordinates for Selected Location
    const getCoordinates = async (locationName) => {
        if (!locationName) return null;
 
        setIsLoading(true);
        try {
            const response = await axiosInstance.get(`/maps/get-coordinates`, {
                params: { location: locationName },
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
 
            console.log("Coordinates:", response); // ✅ Log the coordinates
            return response || null;
        } catch (err) {
            console.error("Error fetching coordinates:", err);
            return null;
        } finally {
            setIsLoading(false);
        }
    };

    return { handleDestinationChange, getCoordinates, isLoading, error };
};
