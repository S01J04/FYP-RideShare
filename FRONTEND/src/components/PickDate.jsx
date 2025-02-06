import React, { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Calendar } from "./ui/calendar";

const PickDate = ({ selectedDate, setSelectedDate, nextStep }) => {
  // ✅ Set tomorrow's date as the default
  const getTomorrow = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow;
  };

  // State to manage the selected date
  const [date, setDate] = useState(selectedDate || getTomorrow());

  // Update parent state when user selects a new date
  useEffect(() => {
    setSelectedDate(date);
  }, [date, setSelectedDate]);

  return (
    <div className="   w-full max-w-2xl p-4">
      <h2 className="text-4xl font-bold text-center mb-20">When are you leaving?</h2>

      {/* Two-Month Calendar Section */}
      <div className="flex justify-between gap-6">
        {/* Left Calendar - Current Month */}
        <div className="flex-1">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            defaultMonth={new Date()} // Show current month
            fromDate={new Date()} // Prevent past dates
            className="rounded-md shadow w-full"
            classNames={{
              day_selected: "bg-secondary text-white hover:bg-secondary  ", // ✅ Fix selected color + remove hover effect
              day_today: " text-black", // ✅ Remove default highlight on today's date
            }}
          />
        </div>

        {/* Right Calendar - Next Month */}
        <div className="flex-1">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            defaultMonth={new Date(new Date().setMonth(new Date().getMonth() + 1))} // Show next month
            fromDate={new Date()} // Prevent past dates
            className="rounded-md shadow w-full"
            classNames={{
              day_selected: "bg-secondary text-white hover:bg-secondary  ", // ✅ Fix selected color + remove hover effect
              day_today: " text-black", // ✅ Remove default highlight on today's date
            }}
          />
        </div>
      </div>
      
      <div>
        {selectedDate && (
          <div className="mt-4 text-center">
            <span className="font-semibold">Selected Date:</span> {selectedDate.toDateString()}
          </div>
        )}
      </div>

      <div className="mt-8 flex justify-center">
        <Button
          onClick={nextStep}
          className="w-full bg-secondary text-white font-semibold rounded-lg shadow-md hover:bg-secondary transition"
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default PickDate;
