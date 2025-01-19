import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-dropdown-menu";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { MapPin } from "lucide-react";
import { DatePicker } from "@/components/DatePicker";
import { useEffect } from "react";

const PublishRidePage = () => {
  const [load, setLoading] = useState(true);
  const handleLoad = () => {
    setLoading(false);
  };
  const [rideDetails, setRideDetails] = useState({
    from: "",
    to: "",
    departureDate: "",
    departureTime: "",
    seatsAvailable: 1,
    pricePerSeat: "",
    allowPets: false,
    allowSmoking: false,
    allowMusic: false,
    additionalNotes: "",
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
    console.log("Ride Details Submitted:", rideDetails);
  };



  return (
    <div className=" pt-16  -white  w-full flex flex-col md:flex-row justify-center">
      {/* Left Side: Form */}
      <div className="w-full   -white md:w-1/2 p-6 md:p-10  rounded-lg shadow-lg">
        <h2 className="text-3xl font-semibold mb-6 text-center  ">
          Publish a Ride
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Route Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Departure City */}
            <div>
              <Label
                htmlFor="from"
                className="block text-lg font-medium text-gray-700 dark:text-gray-300"
              >
                Departure City
              </Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <Input
                  id="from"
                  name="from"
                  type="text"
                  value={rideDetails.from}
                  onChange={handleChange}
                  placeholder="Enter departure location"
                  className="pl-10"
                />
              </div>
            </div>

            {/* Destination City */}
            <div>
              <Label
                htmlFor="to"
                className="block text-lg font-medium text-gray-700 dark:text-gray-300"
              >
                Destination City
              </Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <Input
                  id="to"
                  name="to"
                  type="text"
                  value={rideDetails.to}
                  onChange={handleChange}
                  placeholder="Enter destination"
                  className="pl-10"
                />
              </div>
            </div>

            {/* Date */}
            <div>
              <Label
                htmlFor="departureDate"
                className="block text-lg font-medium text-gray-700 dark:text-gray-300"
              >
                Departure Date
              </Label>
              <DatePicker
                selectedDate={rideDetails.departureDate}
                onSelectDate={(date) =>
                  setRideDetails({ ...rideDetails, departureDate: date })
                }
              />
            </div>

            {/* Departure Time */}
            <div>
              <Label
                htmlFor="departureTime"
                className="block text-lg font-medium text-gray-700 dark:text-gray-300"
              >
                Departure Time
              </Label>
              <Input
                id="departureTime"
                name="departureTime"
                type="time"
                value={rideDetails.departureTime}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Ride Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                min="1"
                max="8"
                value={rideDetails.seatsAvailable}
                onChange={handleChange}
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
                placeholder="Enter price in $"
                value={rideDetails.pricePerSeat}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Preferences */}
          <div className="space-y-3">
            <Label className="block text-lg font-medium text-gray-700 dark:text-gray-300">
              Preferences
            </Label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              <Label className="flex items-center gap-2">
                <Switch
                  checked={rideDetails.allowSmoking}
                  onCheckedChange={(checked) =>
                    setRideDetails({ ...rideDetails, allowSmoking: checked })
                  }
                />
                Smoking Allowed
              </Label>
              <Label className="flex items-center gap-2">
                <Switch
                  checked={rideDetails.allowPets}
                  onCheckedChange={(checked) =>
                    setRideDetails({ ...rideDetails, allowPets: checked })
                  }
                />
                Pets Allowed
              </Label>
              <Label className="flex items-center gap-2">
                <Switch
                  checked={rideDetails.allowMusic}
                  onCheckedChange={(checked) =>
                    setRideDetails({ ...rideDetails, allowMusic: checked })
                  }
                />
                Music Allowed
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
            <Textarea
              id="additionalNotes"
              name="additionalNotes"
              value={rideDetails.additionalNotes}
              onChange={handleChange}
              placeholder="Any additional information for passengers..."
            />
          </div>

          <Button
            type="submit"
            className="mt-4 w-full bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
          >
            Publish Ride
          </Button>
        </form>
      </div>

      {/* Right Side: Map */}
      <div className="hidden md:flex my-10  -gray-300  rounded-lg md:w-1/2 h-auto bg-gray-200 dark:bg-gray-700">
      {load && <p>Loading...</p>}
      <img
        onLoad={handleLoad}
        style={{ display: load ? "none" : "block" }}
        className="w-full h-full  object-cover rounded-lg"
        src="https://developers.google.com/static/maps/images/landing/hero_maps_static_api.png"
        alt="Map"
      />
      </div>
    </div>
  );
};

export default PublishRidePage;
