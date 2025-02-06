import { faBoxes, faCab } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { Button } from './ui/button'

const RideType = ({rideType, setRideType, nextStep}) => {
  return (
    <div className="w-full max-w-3xl   rounded-lg p-10">
    <h2 className="text-4xl font-bold text-center mb-8">
      What type of ride are you offering?
    </h2>

    {/* Ride Type Options */}
    <div className="grid my-15 grid-cols-1 md:grid-cols-3 gap-6">
      {/* Passenger Option */}
      <label
        className={`flex flex-col text-black items-center justify-center p-6 border rounded-lg cursor-pointer hover:shadow-lg transition-all ${rideType === "passenger"
            ? "border-secondary t bg-blue-50 dark:bg-gray-500"
            : "border-gray-300"
          }`}
        onClick={() => setRideType("passenger")}
      >
        <FontAwesomeIcon icon={faCab} className="text-secondary text-4xl" />
        <span className="text-lg font-semibold">Passenger</span>
        <p className="text-sm text-gray-500 dark:text-gray-800">Offer rides to passengers.</p>
      </label>

      {/* Cargo Option */}
      <label
        className={`flex flex-col text-black items-center justify-center p-6 border rounded-lg cursor-pointer hover:shadow-lg transition-all ${rideType === "cargo"
            ? "border-secondary t bg-blue-50 dark:bg-gray-500"
            : "border-gray-300"
          }`}
        onClick={() => setRideType("cargo")}
      >
        <FontAwesomeIcon icon={faBoxes} className="text-secondary text-4xl" />
        <span className="text-lg font-semibold">Cargo</span>
        <p className="text-sm text-gray-500  dark:text-gray-800">Transport goods and items.</p>
      </label>

      {/* Mixed Option */}
      <label
        className={`flex flex-col text-black items-center justify-center p-6 border rounded-lg cursor-pointer hover:shadow-lg transition-all ${rideType === "mixed"
            ? "border-secondary t bg-blue-50 dark:bg-gray-500"
            : "border-gray-300"
          }`}
        onClick={() => setRideType("mixed")}
      >
        <FontAwesomeIcon icon={faCab} className="text-secondary text-4xl" />
        <span className="text-lg font-semibold">Mixed</span>
        <p className="text-sm text-gray-500  dark:text-gray-800">
          Offer both passenger and cargo rides.
        </p>
      </label>
    </div>

    <div className="mt-8 flex justify-center">
      <Button
        onClick={nextStep}
        className="w-full bg-secondary text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition"
      >
        Next
      </Button>
    </div>
  </div>
  )
}

export default RideType