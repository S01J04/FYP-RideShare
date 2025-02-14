import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { Button } from "../ui/button";

export const Vehicleyear = ({ vehicleYear, setVehicleYear, nextStep }) => {
    const [yearSuggestions, setYearSuggestions] = useState([]);
    
    // Sample static vehicle year options
    const vehicleYears = [];
    for (let year = 2025; year >= 1990; year--) {
        vehicleYears.push(year.toString());
    }
     useEffect(() => {
        window.scrollTo(0, 0); // Scroll to top when component mounts
      }, []);
    // console.log(vehicleYears);
    
    
    // Handle User Input & Show Suggestions
    const handleYearChange = (e) => {
        const inputValue = e.target.value;
        setVehicleYear(inputValue);
        
        if (inputValue.length > 1) {
            const filteredYears = vehicleYears.filter(year => 
                year.startsWith(inputValue)
            );
            setYearSuggestions(filteredYears);
        } else {
            setYearSuggestions([]);
        }
    };
    
    // When user selects a suggestion
    const selectVehicleYear = (year) => {
        setVehicleYear(year);
        setYearSuggestions([]); // Hide suggestions after selection
    };
    
    // Proceed to Next Step
    const handleSubmit = () => {
        if (!vehicleYear || !vehicleYears.includes(vehicleYear)) {
            alert("Please select a valid vehicle year.");
            return;
        }
        nextStep();
    };

    return (
        <div className="step md:min-w-[40%] flex-1 flex flex-col justify-start">
            <h2 className="text-3xl w-full justify-center flex items-center font-semibold">
                Enter Vehicle Year
            </h2>
            
            <div className="relative flex items-center w-full mt-8">
                <input
                    className="h-12 bg-gray-100 rounded-l-xl rounded-r-none w-full px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    type="text"
                    value={vehicleYear}
                    onChange={handleYearChange}
                    placeholder="Enter vehicle year (e.g., 2020)"
                />
                <Button 
                    onClick={handleSubmit} 
                    className="h-12 bg-primary text-white rounded-r-xl !rounded-l-none px-8 hover:bg-blue-600 transition"
                >
                    Submit
                </Button>
            </div>
            
            {/* Suggestions List */}
            {yearSuggestions.length > 0 && (
                <div className="suggestions my-2">
                    {yearSuggestions.slice(0,5).map((year, index) => (
                        
                        <div 
                            key={index} 
                            className="gap-6 px-5 rounded-xl hover:bg-gray-300 py-2 w-[90%] flex items-center justify-between mx-auto cursor-pointer"
                            onClick={() => selectVehicleYear(year)}
                        >
                            <span className="font-semibold">{year}</span>
                            <FontAwesomeIcon icon={faArrowRight} />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};