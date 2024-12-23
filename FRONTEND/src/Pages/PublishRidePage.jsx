import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@radix-ui/react-dropdown-menu';
import React, { useState } from 'react'

const PublishRidePage = () => {
  const [rideDetails, setRideDetails] = useState({
    from: '',
    to: '',
    departureDate: '',
    seatsAvailable: 1,
    pricePerSeat: 0,
    cargo: false,
    passengerOnly: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRideDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(rideDetails);
  };

  return (
    <div className="min-h-[calc(100vh-64px-373px)] w-[100vw] h-[90vh] flex">
      {/* Left side: Form */}
      <div className="w-full my-10 md:w-1/2 p-8 bg-white border-r border-gray-200">
        <h2 className="text-2xl font-semibold mb-6">Publish a Ride</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="from">From</Label>
            <Input
              id="from"
              name="from"
              type="text"
              value={rideDetails.from}
              onChange={handleChange}
              placeholder="Enter departure location"
            />
          </div>
          <div>
            <Label htmlFor="to">To</Label>
            <Input
              id="to"
              name="to"
              type="text"
              value={rideDetails.to}
              onChange={handleChange}
              placeholder="Enter destination"
            />
          </div>
          <div>
            <Label htmlFor="departureDate">Departure Date</Label>
            <Input
              id="departureDate"
              name="departureDate"
              type="datetime-local"
              value={rideDetails.departureDate}
              onChange={handleChange}
            />
          </div>
          <div>
            <Label htmlFor="seatsAvailable">Seats Available</Label>
            <Input
              id="seatsAvailable"
              name="seatsAvailable"
              type="number"
              value={rideDetails.seatsAvailable}
              onChange={handleChange}
              min="1"
                max="5"
            />
          </div>
          <div>
            <Label htmlFor="pricePerSeat">Price per Seat</Label>
            <Input
              id="pricePerSeat"
              name="pricePerSeat"
              type="number"
              value={rideDetails.pricePerSeat}
              onChange={handleChange}
              min="200"
            
            />
          </div>
          <div className="flex items-center space-x-4">
            <div>
              <Label htmlFor="cargo">Cargo Only</Label>
              <input
                id="cargo"
                name="cargo"
                type="checkbox"
                checked={rideDetails.cargo}
                onChange={(e) => setRideDetails({ ...rideDetails, cargo: e.target.checked })}
              />
            </div>
            <div>
              <Label htmlFor="passengerOnly">Passenger Only</Label>
              <input
                id="passengerOnly"
                name="passengerOnly"
                type="checkbox"
                checked={rideDetails.passengerOnly}
                onChange={(e) => setRideDetails({ ...rideDetails, passengerOnly: e.target.checked })}
              />
            </div>
          </div>
          <Button type="submit" className="mt-4 w-full bg-blue-600 text-white hover:bg-blue-700">
            Publish Ride
          </Button>
        </form>
      </div>

      {/* Right side: Map */}
      <div className="hidden my-10 border border-black md:flex  w-[50%] h-[70%] ">
        {/* Replace with your map component */}
        <img className='w-full h-full' src="https://developers.google.com/static/maps/images/landing/hero_maps_static_api.png" alt="" />
      </div>
    </div>
  );
};

export default PublishRidePage;
