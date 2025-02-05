import React, { useState } from "react";
import { Button } from "./ui/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faClock } from "@fortawesome/free-solid-svg-icons";
import { useMaps } from "@/redux/hooks/mapHook";

export const Source = ({ fromLocation, setFromLocation, setFromCoordinates, nextStep }) => {
    const [pickupSuggestions, setPickupSuggestions] = useState([]); 
    const { handleDestinationChange, getCoordinates, isLoading } = useMaps();

    // Handle User Input & Fetch Suggestions
    const handlePickupChange = async (e) => {
        setFromLocation(e.target.value);
        if (e.target.value.length > 3) {
            const suggestions = await handleDestinationChange(e);
            setPickupSuggestions(suggestions);
        } else {
            setPickupSuggestions([]);
        }
    };

    // When user selects a suggestion
    const selectPickupLocation = async (location) => {
        setFromLocation(location);
        setPickupSuggestions([]);
    };

    // Fetch Coordinates & Proceed to Next Step
    const handleSubmit = async () => {
        if (!fromLocation) {
            alert("Please select a valid source location.");
            return;
        }

        const coordinates = await getCoordinates(fromLocation);
        if (coordinates) {
            setFromCoordinates(coordinates);
            nextStep(); // Proceed only after getting coordinates
        } else {
            alert("Failed to fetch coordinates. Please try again.");
        }
    };

    return (
        <div className="step md:min-w-[40%] flex-1 flex flex-col justify-start">
            <h2 className="text-3xl w-full justify-center flex items-center font-semibold">Where are you leaving from?</h2>

            <div className="relative flex items-center w-[100%] mt-8">
                <input
                    className="h-12 bg-gray-100 rounded-l-xl rounded-r-none w-full px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    type="text"
                    value={fromLocation}
                    onChange={handlePickupChange}
                    placeholder="Enter your origin"
                />
                <Button 
                    onClick={handleSubmit} 
                    className="h-12 bg-secondary text-white rounded-r-xl rounded-l-none px-8 hover:bg-blue-600 transition"
                    disabled={isLoading}
                >
                    {isLoading ? "Loading..." : "Submit"}
                </Button>
            </div>
            {pickupSuggestions.length > 0 && (
    <div className="suggestions my-2">
        {pickupSuggestions.map((suggestion, index) => {
            const parts = suggestion.split(","); // Split by comma
            const mainPlace = parts[0].trim(); // First part is the place name
            const address = parts.slice(1).join(",").trim(); // Rest is address

            return (
                <div 
                    key={index} 
                    className="gap-6 px-5 rounded-xl hover:bg-gray-300 py-2 w-[90%] flex items-center justify-around mx-auto cursor-pointer"
                    onClick={() => setFromLocation(suggestion)} 
                >
                    <FontAwesomeIcon icon={faClock} />
                    <div className="flex-1">
                        <div className="font-semibold">{mainPlace}</div>
                        {address && <div className="text-sm text-gray-600">{address}</div>}
                    </div>
                    <FontAwesomeIcon icon={faArrowRight} />
                </div>
            );
        })}
    </div>
)}

        </div>
    );
};
