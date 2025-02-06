import { useState } from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";

import "react-time-picker/dist/TimePicker.css";
import "react-clock/dist/Clock.css";
import { Destination } from "@/components/Destination";
import { Source } from "@/components/Source";
import { Routes } from "@/components/routes";
import PickDate from "@/components/PickDate";
import TimePick from "@/components/TimePick";
import RideType from "@/components/RideType";
import CapSeat from "@/components/CapSeat";
import Pricing from "@/components/Pricing";
import ConfirmRide from "@/components/ConfirmRide";
import { useTheme } from "@/components/theme-provider";

const steps = [
  "Select Source",
  "Select Destination",
  "Choose Route",
  "Pick Date",
  "Pick Time",
  "Select Ride Type",
  "Set Capacity",
  "Set Pricing",
  "Confirm Ride",
];

const PublishRideForm = () => {
  const { theme } = useTheme();
  const isDarkMode = theme === "dark";

  const [fromLocation, setFromLocation] = useState();
  const [fromCoordinates, setFromCoordinates] = useState(null);
  const [toLocation, setToLocation] = useState("");
  const [toCoordinates, setToCoordinates] = useState(null);
  const [time, setTime] = useState("12:00 AM");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [step, setStep] = useState(0);
  const [rideType, setRideType] = useState("passenger");
  const [selectedRoute, setSelectedRoute] = useState("");
  const [seats, setSeats] = useState(1);
  const [cargoCapacity, setCargoCapacity] = useState(1);
  const [pricePerSeat, setPricePerSeat] = useState();
  const [PriceCargoCapacity, setPriceCargoCapacity] = useState(150);
  const [editMode, setEditMode] = useState(false);

  const nextStep = () => setStep((prev) => Math.min(steps.length - 1, prev + 1));
  const prevStep = () => setStep((prev) => Math.max(0, prev - 1));

  return (
    <div className={`flex min-h-[100dvh] flex-col mt-14 justify-start items-center `}>

      {/* Stepper with Theme Support */}
      <Box sx={{ width: "80%",  mb:4 }}>
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

      {step === 0 && <Source fromLocation={fromLocation} setFromCoordinates={setFromCoordinates} setFromLocation={setFromLocation} nextStep={nextStep} />}
      {step === 1 && <Destination toLocation={toLocation} setToCoordinates={setToCoordinates} setToLocation={setToLocation} nextStep={nextStep} />}
      {step === 2 && <Routes fromLocation={fromLocation} toLocation={toLocation} selectedRoute={selectedRoute} setSelectedRoute={setSelectedRoute} nextStep={nextStep} />}
      {step === 3 && <PickDate selectedDate={selectedDate} setSelectedDate={setSelectedDate} nextStep={nextStep} />}
      {step === 4 && <TimePick time={time} setTime={setTime} nextStep={nextStep} prevStep={prevStep} />}
      {step === 5 && <RideType rideType={rideType} setRideType={setRideType} nextStep={nextStep} />}
      {step === 6 && <CapSeat rideType={rideType} seats={seats} setSeats={setSeats} cargoCapacity={cargoCapacity} setCargoCapacity={setCargoCapacity} nextStep={nextStep} />}
      {step === 7 && <Pricing rideType={rideType} pricePerSeat={pricePerSeat} setPricePerSeat={setPricePerSeat} PriceCargoCapacity={PriceCargoCapacity} setPriceCargoCapacity={setPriceCargoCapacity} nextStep={nextStep} />}
      {step === 8 && (<ConfirmRide selectedRoute={selectedRoute} toCoordinates={toCoordinates} fromCoordinates={fromCoordinates} editMode={editMode} setEditMode={setEditMode} fromLocation={fromLocation}  toLocation={toLocation}  time={time}  selectedDate={selectedDate}  rideType={rideType}  seats={seats}   cargoCapacity={cargoCapacity}   pricePerSeat={pricePerSeat}   priceCargoCapacity={PriceCargoCapacity}   distance={selectedRoute?.legs[0]?.distance?.text || "Unknown"}   duration={selectedRoute?.legs[0]?.duration?.text || "Unknown"} />)}
    </div>
  );
};

export default PublishRideForm;
