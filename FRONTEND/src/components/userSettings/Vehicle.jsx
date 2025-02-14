import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";

import { useTheme } from "@/components/theme-provider";
import VehicleType from "../Vechile.jsx/VehicleType";
import VehicleColor from "../Vechile.jsx/VehicleColor";
import VehicleModel from "../Vechile.jsx/VehicleModel";
import { Vehicleyear } from "../Vechile.jsx/Vehicleyear";
import ConfirmVehicle from "../Vechile.jsx/ConfirmVehcile";
import VehiclePlateNumber from "../Vechile.jsx/VehiclePlateNumber";


const steps = [
  "Select Vehicle Type",
  "Enter Vehicle VehiclePlateNumber",
  "Enter Vehicle Color",
  "Model",
  "Year",
  "Confirm Vehicle",
];

const CreateVehicle = ({goBack, vehicle, setVehicle}) => {
   useEffect(() => {
      window.scrollTo(0, 0); // Scroll to top when component mounts
    }, []);
  const { theme } = useTheme();
  const isDarkMode = theme === "dark";

  const [step, setStep] = useState(0);
  const [vehicleType, setVehicleType] = useState("");
  const [vehicleModel, setVehicleModel] = useState("");
  const [vehicleYear, setVehicleYear] = useState("");
  const [vehicleColor, setVehicleColor] = useState("");
  const [vehiclePlateNumber, setvehiclePlateNumber] = useState("");


  const nextStep = () => setStep((prev) => Math.min(steps.length - 1, prev + 1));
  const prevStep = () => setStep((prev) => Math.max(0, prev - 1));

  return (
    <div className="flex min-h-[100dvh] flex-col mt-14 justify-start items-center">
      {/* Stepper with Theme Support */}
      <Box sx={{ width: "80%", mb: 4 }}>
        <Stepper
          activeStep={step}
          alternativeLabel
          sx={{
            "& .MuiStepLabel-label": { color: isDarkMode ? "white" : "black" },
            "& .Mui-active .MuiStepLabel-label": { color: isDarkMode ? "#38bdf9" : "#007bff" },
            "& .Mui-completed .MuiStepLabel-label": { color: isDarkMode ? "#4ade80" : "#28a745" },
            "& .MuiStepConnector-line": { borderColor: isDarkMode ? "#4b5563" : "#ccc" },
          }}
        >
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </Box>

      {step === 0 && <VehicleType vehicleType={vehicleType} setVehicleType={setVehicleType} nextStep={nextStep} />}
      {step === 1 && <VehiclePlateNumber vehiclePlateNumber={vehiclePlateNumber} setvehiclePlateNumber={setvehiclePlateNumber} nextStep={nextStep} />}
      {step === 2 && <VehicleColor  vehicleColor={vehicleColor} setVehicleColor={setVehicleColor} nextStep={nextStep} prevStep={prevStep} />}
      {step === 3 && <VehicleModel  vehicleModel={vehicleModel} setVehicleModel={setVehicleModel}  nextStep={nextStep} prevStep={prevStep} />}
      {step === 4 && <Vehicleyear  vehicleYear={vehicleYear} setVehicleYear={setVehicleYear} nextStep={nextStep} prevStep={prevStep} />}
      {step === 5 && (
        <ConfirmVehicle
          vehicle={vehicle}
          vehicleType={vehicleType}
          vehiclePlateNumber={vehiclePlateNumber}
          vehicleModel={vehicleModel}
          vehicleYear={vehicleYear}
          vehicleColor={vehicleColor}
          setVehicle={setVehicle}
          goBack={goBack}
        />
      )}
    </div>
  );
};

export default CreateVehicle;
