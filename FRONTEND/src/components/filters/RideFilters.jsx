import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Calendar } from '@/components/ui/calendar';

export default function RideFilters() {
  return (
    <div className="space-y-6 p-4 bg-card rounded-lg">
      <div>
        <h3 className="font-semibold mb-4">Price Range</h3>
        <Slider
          defaultValue={[0, 100]}
          max={100}
          step={1}
          className="w-full"
        />
        <div className="flex justify-between mt-2 text-sm">
          <span>$0</span>
          <span>$100</span>
        </div>
      </div>

      <div>
        <h3 className="font-semibold mb-4">Departure Time</h3>
        <div className="space-y-2">
          <Label className="flex items-center gap-2">
            <Switch />
            Morning (6AM - 12PM)
          </Label>
          <Label className="flex items-center gap-2">
            <Switch />
            Afternoon (12PM - 6PM)
          </Label>
          <Label className="flex items-center gap-2">
            <Switch />
            Evening (6PM - 12AM)
          </Label>
        </div>
      </div>

      <div>
        <h3 className="font-semibold mb-4">Ride Type</h3>
        <div className="space-y-2">
          <Label className="flex items-center gap-2">
            <Switch />
            Passengers Only
          </Label>
          <Label className="flex items-center gap-2">
            <Switch />
            Cargo Allowed
          </Label>
        </div>
      </div>

      <div>
        <h3 className="font-semibold mb-4">Date</h3>
        <Calendar className="rounded-md border" />
      </div>
    </div>
  );
}