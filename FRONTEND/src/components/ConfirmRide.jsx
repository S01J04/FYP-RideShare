import React from 'react';
import { Button } from './ui/button';


const calculateArrivalTime = (departureTime, duration) => {
    if (!departureTime || !duration) return "Calculating...";
  
    const [timePart, period] = departureTime.split(" "); // Separate time and AM/PM
    const [hours, minutes] = timePart.split(":").map(Number); // Convert to numbers
  
    let totalMinutes = hours * 60 + minutes + parseInt(duration, 10); // Add travel time
    let newPeriod = period;
  
    let newHours = Math.floor(totalMinutes / 60);
    let newMinutes = totalMinutes % 60;
  
    // Convert to 12-hour format and switch AM/PM if needed
    if (newHours >= 12) {
      newPeriod = newPeriod === "AM" ? "PM" : "AM";
      if (newHours > 12) newHours -= 12;
    } else if (newHours === 0) {
      newHours = 12;
    }
  
    return `${String(newHours).padStart(2, "0")}:${String(newMinutes).padStart(2, "0")} ${newPeriod}`;
  };
  
  
const ConfirmRide = ({
  fromCoordinates,
  toCoordinates,
  selectedRoute,
  editMode,
  setEditMode,
  fromLocation,
  toLocation,
  time,
  selectedDate,
  rideType,
  seats,
  cargoCapacity,
  pricePerSeat,
  priceCargoCapacity,
  setSeats,
  setCargoCapacity,
  setPricePerSeat,
  setPriceCargoCapacity,
  distance,
  duration
}) => {
    
      
      // 🔥 Calculate arrival time dynamically
      const estimatedArrivalTime = calculateArrivalTime( time, duration);
    console.log("Selected Route:", selectedRoute,time)
  return (
    <div className="flex mx-auto w-[90%] md:w-1/3 items-start justify-center min-h-screen">
      <div className="w-full">
        <h2 className="text-3xl text-center font-semibold mb-7">Confirm Ride</h2>

        {/* 🚗 Ride Summary Section */}
        <div className="relative flex gap-5 my-4">
          {/* Timeline Dots */}
          <div className="relative left-28 top-3 flex flex-col items-center">
            <div className="absolute top-3 w-[2px] h-14 bg-gray-800"></div>
            <div className="w-3 h-3 border-2 border-gray-800 rounded-full bg-white z-10"></div>
            <div className="w-3 h-3 border-2 border-gray-800 rounded-full bg-white z-10 mt-[50px]"></div>
          </div>

          {/* Time and Duration */}
          <p className="text-md text-nowrap  pt-2  font-medium leading-relaxed">
            {time || "Not set"}  {/* ⏰ Show time dynamically */}
            <span  className="block w-full text-nowrap  text-sm font-medium py-12 border-black   overflow-hidden text-gray-700 mt-1">
            {estimatedArrivalTime || "Calculating..."} {/* ⏳ Show route duration */}
            
            </span>
          </p>

          {/* Location Details */}
          <div className="flex flex-col gap-0 w-full">
            <div className="flex items-center justify-between px-3 rounded-lg py-2 w-full">
              <p className="text-lg text-nowrap font-semibold leading-snug">
                {fromLocation || "Pickup location not set"}
                <span className="block text-xs text-gray-500">Start Point</span>
              </p>
            </div>
            <div className="flex items-center  justify-between px-3 rounded-lg py-2 w-full">
              <p className="text-lg font-semibold text-nowrap leading-snug">
                {toLocation || "Destination not set"}
                <span className="block text-xs text-gray-500">Drop-off Point</span>
              </p>
            </div>
          </div>
          <div className='text-lg w-1 font-semibold text-nowrap border-gray-300 flex justify-end items-end'>
  Price: {rideType === "cargo" ? `rs${priceCargoCapacity || "Calculating..."}` 
        : rideType === "passenger" ? `rs${pricePerSeat || "Calculating..."}` 
        : `rs${pricePerSeat || "Calculating..."} (per seat) & $${priceCargoCapacity || "Calculating..."} (cargo)`}
</div>
        </div>

        {/* 🚀 Ride Details */}
        <div className="mt-4">
          <p className="text-md font-semibold">
            Ride Type: <span className="text-gray-700">{rideType || "Not selected"}</span>
          </p>
          <p className="text-md font-semibold">
            Total Journy Time: <span className="text-gray-700">{duration || "Not selected"}</span>
          </p>
          {(rideType === "passenger" || rideType === "mixed") && (
            <p className="text-md font-semibold">
              Seats Available: <span className="text-gray-700">{seats}</span>
            </p>
          )}
          {(rideType === "cargo" || rideType === "mixed") && (
            <p className="text-md font-semibold">
              Cargo Capacity: <span className="text-gray-700">{cargoCapacity} cubic feet</span>
            </p>
          )}
          <p className="text-md font-semibold">
            Total Distance: <span className="text-gray-700">{distance || "Not set"}</span>
          </p>
          {(rideType === "cargo" || rideType === "mixed") && (
            <p className="text-md font-semibold">
              Cargo Price: <span className="text-gray-700">${priceCargoCapacity || "Not set"}</span>
            </p>
          )}
        </div>

        {/* ✏️ Edit Options */}
        <div className="mt-5">
          <div onClick={() => setEditMode("price")} className="underline text-secondary cursor-pointer">
            Edit Price
          </div>
          {(rideType === "passenger" || rideType === "mixed") && (
            <div onClick={() => setEditMode("seats")} className="underline text-secondary cursor-pointer">
              Edit Seats
            </div>
          )}
          {(rideType === "cargo" || rideType === "mixed") && (
            <div onClick={() => setEditMode("capacity")} className="underline text-secondary cursor-pointer">
              Edit Cargo Capacity
            </div>
          )}
          <Button className="w-full mt-4" onClick={() => alert("Ride Published!")}>
            Publish Ride
          </Button>
        </div>

        {/* 📌 Edit Modal */}
        {editMode && (
          <div className="absolute top-[40%] left-1/2 transform -translate-x-1/2 h-[40%] flex items-center flex-col justify-center -translate-y-1/2 bg-gray-100 p-6 shadow-lg w-[90%] md:w-1/3 z-50">
            <button className="absolute top-2 right-2 text-gray-600 hover:text-gray-800 transition text-2xl font-bold" onClick={() => setEditMode(null)}>×</button>
            <h3 className="text-2xl font-semibold mb-6 text-center">Edit {editMode.charAt(0).toUpperCase() + editMode.slice(1)} Details</h3>
            {editMode === "price" && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 text-center">Price Per Seat</label>
                <input type="number" value={pricePerSeat || ""} onChange={(e) => setPricePerSeat(e.target.value)} className="border p-2 rounded w-full" />
              </div>
            )}
            {editMode === "seats" && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 text-center">Seats Available</label>
                <input type="number" value={seats} onChange={(e) => setSeats(e.target.value)} className="border p-2 rounded w-full" />
              </div>
            )}
            {editMode === "capacity" && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 text-center">Cargo Capacity</label>
                <input type="number" value={cargoCapacity} onChange={(e) => setCargoCapacity(e.target.value)} className="border p-2 rounded w-full" />
              </div>
            )}
            <button className="bg-blue-500 text-white py-3 px-6 rounded-lg hover:bg-blue-600 transition mt-4" onClick={() => setEditMode(null)}>Save Changes</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ConfirmRide;
