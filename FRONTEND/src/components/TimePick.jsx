import React, { useState } from "react";

const TimePick = ({ nextStep, setTime, time }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedHour, setSelectedHour] = useState(time?.split(":")[0] || "12");
  const [selectedMinute, setSelectedMinute] = useState(time?.split(":")[1]?.slice(0, 2) || "00");
  const [period, setPeriod] = useState(time?.includes("PM") ? "PM" : "AM");

  const hours = Array.from({ length: 12 }, (_, i) => (i + 1).toString().padStart(2, "0"));
  const minutes = Array.from({ length: 60 }, (_, i) => i.toString().padStart(2, "0"));

  const handleTimeChange = () => {
    const formattedTime = `${selectedHour}:${selectedMinute} ${period}`;
    setTime(formattedTime);
    console.log(time)
    setShowDropdown(false);
  };

  return (
    <div className="  w-full max-w-md p-4">

      <h2 className="text-4xl font-bold text-center mb-6">When are you leaving?</h2>

      {/* Time Picker Section */}
      <div className="text-center">
        <h3 className="text-lg font-semibold mb-4">Select Start Time</h3>
        <div className="relative inline-block">
          <button
            className="w-[20rem] py-2 px-4 rounded-lg shadow-md font-bold text-4xl text-secondary"
            onClick={() => setShowDropdown(!showDropdown)}
          >
            <span className="mr-2 border-r border-gray-200 px-2">{selectedHour}</span>: 
            <span className="mr-2 border-r border-gray-200 px-2">{selectedMinute}</span>  
            <span className="mr-2 px-2">{period}</span>
          </button>

          {showDropdown && (
            <div className="absolute left-1/2 transform -translate-x-1/2 mt-2 bg-white shadow-lg rounded-lg p-3 w-64">
              <div className="flex justify-between">
                {/* Hour Selection */}
                <select
                  className="w-1/3 p-2 border rounded-md"
                  value={selectedHour}
                  onChange={(e) => setSelectedHour(e.target.value)}
                >
                  {hours.map((h) => (
                    <option key={h} value={h}>
                      {h}
                    </option>
                  ))}
                </select>

                {/* Minute Selection */}
                <select
                  className="w-1/3 p-2 border rounded-md"
                  value={selectedMinute}
                  onChange={(e) => setSelectedMinute(e.target.value)}
                >
                  {minutes.map((m) => (
                    <option key={m} value={m}>
                      {m}
                    </option>
                  ))}
                </select>

                {/* AM/PM Selection */}
                <select
                  className="w-1/3 p-2 border rounded-md"
                  value={period}
                  onChange={(e) => setPeriod(e.target.value)}
                >
                  <option value="AM">AM</option>
                  <option value="PM">PM</option>
                </select>
              </div>

              <button
                onClick={handleTimeChange}
                className="mt-4 w-full bg-secondary text-white py-2 rounded-md shadow-md"
              >
                Confirm
              </button>
            </div>
          )}
        </div>
      </div>
      <div className="mt-8 flex justify-center">
        <button
          onClick={nextStep}
          className="w-full bg-secondary text-white font-semibold rounded-lg shadow-md hover:bg-secondary transition py-2"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default TimePick;
