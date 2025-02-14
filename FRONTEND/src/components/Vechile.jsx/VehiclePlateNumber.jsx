import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";

const VehiclePlateNumber = ({ vehiclePlateNumber, setvehiclePlateNumber, nextStep }) => {
    const handlechange=(e)=>{
        const input = e.target.value.toUpperCase(); // Convert input to uppercase
          setvehiclePlateNumber(input)
    }
   useEffect(() => {
      window.scrollTo(0, 0); // Scroll to top when component mounts
    }, []);
    return (
        <div className="step md:min-w-[40%] flex-1 flex flex-col justify-start">
                   <h2 className="text-3xl w-full justify-center flex items-center font-semibold">
                       Enter Vehicle Plate number
                   </h2>
                   <div className="relative flex items-center w-full mt-8">
                       <input
                           className="h-12 bg-gray-100 rounded-l-xl rounded-r-none w-full px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                           type="text"
                           value={vehiclePlateNumber}
                           onChange={handlechange}
                           placeholder="Enter vehicle plate number"
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
};

export default VehiclePlateNumber;
