import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@radix-ui/react-dropdown-menu';
import React, { useState } from 'react';

const PublishRidePage = () => {
  const [rideDetails, setRideDetails] = useState({
    from: '',
    to: '',
    departureDate: '',
    seatsAvailable: 1,
    pricePerSeat: 0,
    cargo: false,
    passengerOnly: false,
    allowPets: false,
    allowSmoking: false,
    allowMusic: false,
    additionalNotes: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRideDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setRideDetails((prevDetails) => ({
      ...prevDetails,
      [name]: checked,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(rideDetails);
  };

  return (
    <div className="min-h-[calc(100vh-64px-373px)] w-full h-auto flex justify-center bg-gray-100 dark:bg-gray-900">
      {/* Left side: Form */}
      <div className="w-full my-10 md:w-1/2 p-8 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 rounded-lg shadow-lg">
        <h2 className="text-3xl font-semibold mb-6 text-center text-gray-900 dark:text-gray-100">
          Publish a Ride
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label htmlFor="from" className="block text-lg font-medium text-gray-700 dark:text-gray-300">
              From
            </Label>
            <Input
              id="from"
              name="from"
              type="text"
              value={rideDetails.from}
              onChange={handleChange}
              placeholder="Enter departure location"
              className="mt-1 p-3 border-2 border-gray-300 dark:border-gray-600 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            />
          </div>
          <div>
            <Label htmlFor="to" className="block text-lg font-medium text-gray-700 dark:text-gray-300">
              To
            </Label>
            <Input
              id="to"
              name="to"
              type="text"
              value={rideDetails.to}
              onChange={handleChange}
              placeholder="Enter destination"
              className="mt-1 p-3 border-2 border-gray-300 dark:border-gray-600 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            />
          </div>
          <div>
            <Label
              htmlFor="departureDate"
              className="block text-lg font-medium text-gray-700 dark:text-gray-300"
            >
              Departure Date
            </Label>
            <Input
              id="departureDate"
              name="departureDate"
              type="datetime-local"
              value={rideDetails.departureDate}
              onChange={handleChange}
              className="mt-1 p-3 border-2 border-gray-300 dark:border-gray-600 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            />
          </div>
          <div>
            <Label
              htmlFor="seatsAvailable"
              className="block text-lg font-medium text-gray-700 dark:text-gray-300"
            >
              Seats Available
            </Label>
            <Input
              id="seatsAvailable"
              name="seatsAvailable"
              type="number"
              value={rideDetails.seatsAvailable}
              onChange={handleChange}
              min="1"
              max="5"
              className="mt-1 p-3 border-2 border-gray-300 dark:border-gray-600 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            />
          </div>
          <div>
            <Label
              htmlFor="pricePerSeat"
              className="block text-lg font-medium text-gray-700 dark:text-gray-300"
            >
              Price per Seat
            </Label>
            <Input
              id="pricePerSeat"
              name="pricePerSeat"
              type="number"
              value={rideDetails.pricePerSeat}
              onChange={handleChange}
              min="200"
              className="mt-1 p-3 border-2 border-gray-300 dark:border-gray-600 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            />
          </div>

          {/* Checkboxes */}
          <div className="space-y-3">
            <div className="flex items-center">
              <input
                id="cargo"
                name="cargo"
                type="checkbox"
                checked={rideDetails.cargo}
                onChange={handleCheckboxChange}
                className="mr-2"
              />
              <Label htmlFor="cargo" className="text-gray-700 dark:text-gray-300">
                Cargo Only
              </Label>
            </div>
            <div className="flex items-center">
              <input
                id="passengerOnly"
                name="passengerOnly"
                type="checkbox"
                checked={rideDetails.passengerOnly}
                onChange={handleCheckboxChange}
                className="mr-2"
              />
              <Label htmlFor="passengerOnly" className="text-gray-700 dark:text-gray-300">
                Passenger Only
              </Label>
            </div>
            <div className="flex items-center">
              <input
                id="allowPets"
                name="allowPets"
                type="checkbox"
                checked={rideDetails.allowPets}
                onChange={handleCheckboxChange}
                className="mr-2"
              />
              <Label htmlFor="allowPets" className="text-gray-700 dark:text-gray-300">
                Allow Pets
              </Label>
            </div>
            <div className="flex items-center">
              <input
                id="allowSmoking"
                name="allowSmoking"
                type="checkbox"
                checked={rideDetails.allowSmoking}
                onChange={handleCheckboxChange}
                className="mr-2"
              />
              <Label htmlFor="allowSmoking" className="text-gray-700 dark:text-gray-300">
                Allow Smoking
              </Label>
            </div>
            <div className="flex items-center">
              <input
                id="allowMusic"
                name="allowMusic"
                type="checkbox"
                checked={rideDetails.allowMusic}
                onChange={handleCheckboxChange}
                className="mr-2"
              />
              <Label htmlFor="allowMusic" className="text-gray-700 dark:text-gray-300">
                Allow Music
              </Label>
            </div>
          </div>

          {/* Additional Notes */}
          <div>
            <Label
              htmlFor="additionalNotes"
              className="block text-lg font-medium text-gray-700 dark:text-gray-300"
            >
              Additional Notes
            </Label>
            {/* <textarea
              id="additionalNotes"
              name="additionalNotes"
              value={rideDetails.additionalNotes}
              onChange={handleChange}
              placeholder="Add any additional notes for the ride"
              className="mt-1 p-3 border-2 border-gray-300 dark:border-gray-600 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              rows="4"
            /> */}
          </div>

          <Button
            type="submit"
            className="mt-4 w-full bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
          >
            Publish Ride
          </Button>
        </form>
      </div>

      {/* Right side: Map */}
      <div className="hidden md:flex my-10 border border-gray-300 dark:border-gray-700 rounded-lg md:w-1/2 h-[70%] bg-gray-200 dark:bg-gray-700">
        <img
          className="w-full h-full object-cover rounded-lg"
          src="https://developers.google.com/static/maps/images/landing/hero_maps_static_api.png"
          alt="Map"
        />
      </div>
    </div>
  );
};

export default PublishRidePage;
