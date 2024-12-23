import * as React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function SelectNoOfPassengers() {
  return (
    <Select>
      {/* Trigger with placeholder text in gray */}
      <SelectTrigger className="pl-9">
        <SelectValue
          className="text-gray-400" // Placeholder text styling
          placeholder="No of Passengers"
        />
      </SelectTrigger>

      {/* Content with options for numbers from 1 to 5 */}
      <SelectContent className={"bg-white "}>
        <SelectGroup>
          <SelectLabel >Passengers</SelectLabel>
          {[...Array(5)].map((_, i) => (
            <SelectItem key={i + 1} value={`${i + 1}`}>
              {i + 1}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
