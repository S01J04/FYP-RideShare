import { faArrowRight, faClock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { useMaps } from "@/redux/hooks/mapHook";

export const Destination = ({ toLocation, setToLocation, setToCoordinates, nextStep }) => {
    const [suggestions, setSuggestions] = useState([]);
    const { handleDestinationChange, getCoordinates, isLoading } = useMaps();

    // Fetch destination suggestions
    const handleDestinationInput = async (e) => {
        setToLocation(e.target.value);
        if (e.target.value.length > 3) {
            const fetchedSuggestions = await handleDestinationChange(e);
            setSuggestions(fetchedSuggestions);
        } else {
            setSuggestions([]);
        }
    };

    // When a user selects a destination
    const selectDestination = async (location) => {
        setToLocation(location);
        setSuggestions([]);
    };

    // Fetch coordinates & move to next step
    const handleSubmit = async () => {
        if (!toLocation) {
            alert("Please select a valid destination.");
            return;
        }

        const coordinates = await getCoordinates(toLocation);
        if (coordinates) {
            setToCoordinates(coordinates);
            nextStep(); // Move to next step after fetching coordinates
        } else {
            alert("Failed to fetch coordinates. Please try again.");
        }
    };

    return (
        <div className="step md:min-w-[40%] flex-1 flex flex-col justify-start">
            <h2 className="text-3xl w-full justify-center flex items-center font-semibold">
                Where would you like to go?
            </h2>

            {/* Input Field */}
            <div className="relative flex items-center w-full mt-8">
                <input
                    className="h-12 bg-gray-100 rounded-l-xl rounded-r-none w-full px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    type="text"
                    value={toLocation}
                    onChange={handleDestinationInput}
                    placeholder="Enter your destination"
                />

                {/* Submit Button */}
                <Button
                    onClick={handleSubmit}
                    className="h-12 bg-secondary text-white rounded-r-xl rounded-l-none px-8 hover:bg-blue-600 transition"
                    disabled={isLoading}
                >
                    {isLoading ? "Loading..." : "Submit"}
                </Button>
            </div>

            {/* Suggestions */}
            {suggestions.length > 0 && (
                <div className="suggestions my-2">
                    {suggestions.map((suggestion, index) => {
                        const parts = suggestion.split(",");
                        const mainPlace = parts[0].trim();
                        const address = parts.slice(1).join(",").trim();

                        return (
                            <div
                                key={index}
                                className="gap-6 px-5 rounded-xl hover:bg-gray-300 py-2 w-[90%] flex items-center justify-around mx-auto cursor-pointer"
                                onClick={() => selectDestination(suggestion)}
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
