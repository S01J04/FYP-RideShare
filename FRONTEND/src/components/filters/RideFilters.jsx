import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useState } from "react";

export default function RideFilters({bool}) {
  const [priceRange, setPriceRange] = useState([0, 5000]); // State to store slider values

  const handleSliderChange = (value) => {
    setPriceRange(value); // Update state when slider value changes
  };
  return (
    <div className="space-y-6 p-4 bg-card rounded-lg">
      {/* Clear All Option */}
      <div className="flex justify-end">
        <button className="text-sm text-red-500 hover:underline">Clear All</button>
      </div>

      {/* Sort By */}
      <div>
        <h3 className="font-semibold mb-4">Sort By</h3>
        <div className="space-y-2">
          <Label className="flex items-center gap-2">
            <Switch />
            Price (Lowest First)
          </Label>
          <Label className="flex items-center gap-2">
            <Switch />
            Closest to Arrival
          </Label>
          <Label className="flex items-center gap-2">
            <Switch />
            Shortest Ride
          </Label>
          <Label className="flex items-center gap-2">
            <Switch />
            Earliest Departure
          </Label>
        </div>
      </div>

      {/* Price Range */}
      <div className="space-y-6 p-4 bg-card rounded-lg">
      <div>
        <h3 className="font-semibold mb-4">Price Range</h3>
        <Slider
          defaultValue={priceRange}
          onValueChange={handleSliderChange} // Use onValueChange to get slider value
          max={5000}
          step={1}
          className="w-full"
        />
        <div className="flex justify-between mt-2 text-sm">
          <span>${priceRange[0]}</span> {/* Display the minimum value */}
        
        </div>
      </div>
    </div>

      {/* Pickup Time Before/After */}
      <div>
        <h3 className="font-semibold mb-4">Pickup Time</h3>
        <div className="space-y-2">
          <Label className="flex items-center gap-2">
            <Switch />
            Before 8AM
          </Label>
          <Label className="flex items-center gap-2">
            <Switch />
            After 6PM
          </Label>
        </div>
      </div>

      {/* Trust & Safety */}
      <div>
        <h3 className="font-semibold mb-4">Trust & Safety</h3>
        <div className="space-y-2">
          <Label className="flex items-center gap-2">
            <Switch />
            Verified Driver
          </Label>
          <Label className="flex items-center gap-2">
            <Switch />
            Highly Rated (4+ Stars)
          </Label>
        </div>
      </div>

      {/* Amenities */}
      <div>
        <h3 className="font-semibold mb-4">Amenities</h3>
        <div className="space-y-2">
          <Label className="flex items-center gap-2">
            <Switch />
            Smoking Allowed
          </Label>
          <Label className="flex items-center gap-2">
            <Switch />
            Max 2 in Back Seat
          </Label>
          <Label className="flex items-center gap-2">
            <Switch />
            Air Conditioning
          </Label>
          <Label className="flex items-center gap-2">
            <Switch />
            Pets Allowed
          </Label>
        </div>
      </div>

      {/* Other Filters */}
      <div>
        <h3 className="font-semibold mb-4">Other Filters</h3>
        <div className="space-y-2">
          <Label className="flex items-center gap-2">
            <Switch />
            Luggage Allowed
          </Label>
          <Label className="flex items-center gap-2">
            <Switch />
            Quiet Rides
          </Label>
        </div>
      </div>
    </div>
  );
}
