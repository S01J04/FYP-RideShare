import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { useDispatch } from "react-redux";
import { setVehicles } from "@/redux/slices/vechileSlice";
import { useVehicle } from "@/redux/hooks/vehicleHook";


const ConfirmVehicle = ({ vehicleType, vehicleModel, vehiclePlateNumber, vehicleColor, vehicleYear, goBack, vehicle, setVehicle }) => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const dispatch = useDispatch();
    const { addVehicle, isLoading, error } = useVehicle();
     useEffect(() => {
        window.scrollTo(0, 0); // Scroll to top when component mounts
      }, []);

    const handleConfirm = async () => {
        if (!vehicleType || !vehiclePlateNumber || !vehicleModel || !vehicleColor || !vehicleYear) {
            alert("Please fill in all the required fields.");
            return;
        }

        setIsSubmitting(true);

        const newVehicle = {
            vehicleType,
            plateNumber: vehiclePlateNumber,
            model: vehicleModel,
            color: vehicleColor,
            year: vehicleYear,
        };

        try {
            const response = await addVehicle(newVehicle);
            console.log("reponse from confirm vechile",response);
            goBack();
        } catch (error) {
            console.error("Error adding vehicle:", error);
            alert("Failed to add vehicle.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="step md:min-w-[25%] flex-1 flex flex-col justify-start">
            <h2 className="text-3xl w-full justify-center flex items-center font-semibold">
                Confirm Your Vehicle Details
            </h2>

            <div className="w-full p-6 mt-8">
                {[
                    { label: "Type", value: vehicleType },
                    { label: "Plate Number", value: vehiclePlateNumber },
                    { label: "Model", value: vehicleModel },
                    { label: "Color", value: vehicleColor },
                    { label: "Year", value: vehicleYear }
                ].map(({ label, value }) => (
                    <div key={label} className="flex justify-between pb-3 mb-3">
                        <span className="font-semibold">{label}:</span>
                        <span>{value}</span>
                    </div>
                ))}
            </div>

            <div className="flex justify-center w-full mt-6">
                <Button
                    onClick={handleConfirm}
                    disabled={isSubmitting || isLoading}
                    className={`bg-primary text-white px-8 py-2 rounded-xl transition ${isSubmitting || isLoading ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-600"}`}
                >
                    {isSubmitting || isLoading ? "Saving..." : "Confirm & Proceed"}
                </Button>
            </div>
        </div>
    );
};

export default ConfirmVehicle;
