import React, { useEffect, useState } from "react";

const CapSeat = ({ rideType, seats, setSeats, cargoCapacity, setCargoCapacity, nextStep }) => {
  const [error, setError] = useState("");
  useEffect(()=>{setCargoCapacity(5)},[])

  const handleNext = () => {
    if (rideType === "passenger" && seats < 1) {
      setError("You must take at least 1 passenger.");
      return;
    }

    if (rideType === "cargo" && cargoCapacity < 5) {
      setError("Cargo capacity must be at least 5 cubic meters.");
      return;
    }

    if (rideType === "mixed" && seats < 1 && cargoCapacity < 5) {
      setError("At least 1 passenger or a minimum of 5 cubic meters of cargo capacity is required.");
      return;
    }

    setError(""); // Clear errors on valid input
    nextStep();
  };

  return (
    <div className="flex items-start w-full justify-center flex-1">
      <div className="w-full max-w-3xl rounded-lg">
        <h2 className="text-5xl pb-5 font-semibold text-center mb-8">
          {rideType === "passenger" && "Passenger Details"}
          {rideType === "cargo" && "Cargo Details"}
          {rideType === "mixed" && "Passenger & Cargo Details"}
        </h2>

        {/* Passenger Section */}
        {(rideType === "passenger" || rideType === "mixed") && (
          <div className="mb-10">
            <h3 className="text-lg font-semibold mb-4">How many passengers can you take?</h3>
            <div className="flex items-center justify-center gap-4">
              <button
                onClick={() => setSeats((prev) => Math.max(1, prev - 1))}
                className="w-16 h-16 relative text-secondary rounded-full border-secondary border-4 text-6xl font-extrabold transition"
              >
                <div className="absolute -top-2 right-4">-</div>
              </button>
              <span className="w-7/12 h-12 text-center bg-background text-5xl font-medium rounded-none focus:outline-none">
                <span className="text-secondary text-5xl">{seats} </span>
              </span>
              <button
                onClick={() => setSeats((prev) => Math.min(6, prev + 1))}
                className="w-16 h-16 relative text-secondary rounded-full border-secondary border-4 text-5xl font-extrabold transition"
              >
                <div className="absolute -top-0 right-3">+</div>
              </button>
            </div>
          </div>
        )}

        {/* Cargo Section */}
        {(rideType === "cargo" || rideType === "mixed") && (
          <div>
            <h3 className="text-lg font-semibold mb-4">How much cargo space is available? (in cubic meters)</h3>
            <div className="flex items-center justify-center gap-4">
              <button
                onClick={() => setCargoCapacity((prev) => Math.max(5, prev - 5))}
                className="w-16 h-16 relative text-secondary rounded-full border-secondary border-4 text-6xl font-extrabold transition"
              >
                <div className="absolute -top-2 right-4">-</div>
              </button>
              <span className="w-7/12 h-12 text-center bg-background text-5xl font-medium rounded-none focus:outline-none">
              <span className="text-secondary text-5xl">{cargoCapacity} cbm</span>
              </span>
              <button
                onClick={() => setCargoCapacity((prev) => Math.min(100, prev + 5))}
                className="w-16 h-16 relative text-secondary rounded-full border-secondary border-4 text-5xl font-extrabold transition"
              >
                <div className="absolute -top-0 right-3">+</div>
              </button>
            </div>
          </div>
        )}

        {/* Error Message */}
        {error && <p className="text-red-500 text-center mt-4">{error}</p>}

        <hr className="border-4 rounded-full border-gray-200 my-9" />

        {/* Next Button */}
        <div className="mt-8 flex justify-center">
          <button
            onClick={handleNext}
            className="px-9 py-3 bg-secondary text-white font-semibold rounded-full shadow-md hover:bg-secondary transition"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default CapSeat;
