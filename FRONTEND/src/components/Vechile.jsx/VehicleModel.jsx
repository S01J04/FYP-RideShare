import React, { useEffect } from 'react'
import { Button } from '../ui/button';

const VehicleModel = ({ vehicleModel, setVehicleModel, nextStep }) => {
     useEffect(() => {
        window.scrollTo(0, 0); // Scroll to top when component mounts
      }, []);
    return (
        <div className="step md:min-w-[40%] flex-1 flex flex-col justify-start">
            <h2 className="text-3xl w-full justify-center flex items-center font-semibold">
                Enter Vehicle Model
            </h2>
            <div className="relative flex items-center w-full mt-8">
                <input
                    className="h-12 bg-gray-100 rounded-l-xl rounded-r-none w-full px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    type="text"
                    value={vehicleModel}
                    onChange={(e) => setVehicleModel(e.target.value)}
                    placeholder="Enter vehicle model Corrolla,Mercedes,etc"
                />
                <Button 
                    onClick={nextStep} 
                    className="h-12 bg-primary text-white rounded-r-xl !rounded-l-none px-8 hover:bg-blue-600 transition"
                >
                    Submit
                </Button>
            </div>
        </div>
    );
}

export default VehicleModel