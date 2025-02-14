import React, { useEffect } from 'react';
import { Button } from '../ui/button';

const vehicleTypes = ["sedan", "car", "SUV", "truck", "minivan", "bus", "van"];

const VehicleType = ({ vehicleType, setVehicleType, nextStep }) => {
     useEffect(() => {
        window.scrollTo(0, 0); // Scroll to top when component mounts
      }, []);
    return (
        <div className="step md:min-w-[40%] flex-1 flex flex-col justify-start">
            <h2 className="text-3xl w-full justify-center flex items-center font-semibold">
                Select Vehicle Type
            </h2>
            <div className="relative flex items-center w-full mt-8">
                <select
                    className="h-12 bg-gray-100 rounded-l-xl rounded-r-none w-full px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={vehicleType}
                    onChange={(e) => setVehicleType(e.target.value)}
                >
                    <option value="" disabled>Select a vehicle type</option>
                    {vehicleTypes.map((type) => (
                        <option key={type} value={type}>
                            {type.charAt(0).toUpperCase() + type.slice(1)}
                        </option>
                    ))}
                </select>
                <Button 
                    onClick={nextStep} 
                    className="h-12 bg-primary text-white rounded-r-xl !rounded-l-none px-8 hover:bg-blue-600 transition"
                    disabled={!vehicleType}
                >
                    Submit
                </Button>
            </div>
        </div>
    );
};
export default  VehicleType