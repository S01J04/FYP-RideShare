import React, { useEffect, useState } from "react";

const Pricing = ({ rideType, pricePerSeat, setPricePerSeat, PriceCargoCapacity, setPriceCargoCapacity, nextStep }) => {
  const [error, setError] = useState("");
  useEffect(() => {
    setPriceCargoCapacity(100);
      setPricePerSeat(100);
  },[] );

  const handleNext = () => {
    if ((rideType === "passenger" || rideType === "mixed") && pricePerSeat < 1) {
      setError("Price per passenger seat must be at least 1.");
      return;
    }

    if ((rideType === "cargo" || rideType === "mixed") && PriceCargoCapacity < 1) {
      setError("Price per cubic meter of cargo must be at least 1.");
      return;
    }

    setError(""); // Clear errors on valid input
    nextStep();
  };

  return (
    <div className="flex items-start w-full justify-center flex-1">
      <div className="p-10 w-full max-w-3xl rounded-lg">
        <h2 className="text-5xl pb-5 font-semibold text-center mb-8">
          {rideType === "passenger" && "Set your price per passenger seat"}
          {rideType === "cargo" && "Set your price for cargo capacity"}
          {rideType === "mixed" && "Set your prices for passengers and cargo"}
        </h2>

        {/* Passenger Price Section */}
        {(rideType === "passenger" || rideType === "mixed") && (
          <div className="mb-10">
            <h3 className="text-lg font-semibold mb-4">Price per passenger seat</h3>
            <div className="flex items-center justify-center gap-4">
              <button
                onClick={() => setPricePerSeat((prev) => Math.max(100, Number(prev) - 50))}
                className="w-16 h-16 relative text-secondary rounded-full border-secondary border-4 text-6xl font-extrabold transition"
              >
                <div className="absolute -top-2 right-4">-</div>
              </button>
              <span className="w-7/12 h-12 text-center bg-background text-5xl font-medium rounded-none focus:outline-none">
                <span className="text-secondary text-5xl ">{pricePerSeat} rs</span>
              </span>
              <button
                onClick={() => setPricePerSeat((prev) => Number(prev) + 50)}
                className="w-16 h-16 relative text-secondary rounded-full border-secondary border-4 text-5xl font-extrabold transition"
              >
                <div className="absolute -top-0 right-3">+</div>
              </button>
            </div>
          </div>
        )}

        {/* Cargo Price Section */}
        {(rideType === "cargo" || rideType === "mixed") && (
          <div>
            <h3 className="text-lg font-semibold mb-4">Price per cubic meter of cargo</h3>
            <div className="flex items-center justify-center gap-4">
              <button
                onClick={() => setPriceCargoCapacity((prev) => Math.max(100, Number(prev) - 50))}
                className="w-16 h-16 relative text-secondary rounded-full border-secondary border-4 text-6xl font-extrabold transition"
              >
                <div className="absolute -top-2 right-4">-</div>
              </button>
              <span className="w-7/12 h-12 text-center bg-background text-5xl font-medium rounded-none focus:outline-none">
                <span className="text-secondary text-5xl ">{PriceCargoCapacity} rs</span>
              </span>
              <button
                onClick={() => setPriceCargoCapacity((prev) => Number(prev) + 50)}
                className="w-16 h-16 relative text-secondary rounded-full border-secondary border-4 text-5xl font-extrabold transition"
              >
                <div className="absolute -top-0 right-3">+</div>
              </button>
            </div>
          </div>
        )}

        {/* Error Message */}
        {error && <p className="text-red-500 text-center mt-4">{error}</p>}

        <hr className="border border-gray-200 my-5" />

        {/* Publish Button */}
        <div className="mt-8 flex justify-center">
          <button
            onClick={handleNext}
            className="px-9 py-3 bg-secondary text-white font-semibold rounded-full shadow-md hover:bg-blue-600 transition"
          >
            Publish Ride
          </button>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
