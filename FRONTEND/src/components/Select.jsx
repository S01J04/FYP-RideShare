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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTruckFast, faUser } from "@fortawesome/free-solid-svg-icons";

export default function SelectNoOfPassengers() {
  return (
    <Select>
      {/* Trigger with an icon and placeholder text */}
      <SelectTrigger className="relative pl-12 hover:dark:bg-gray-800 !border-none font-semibold text-subtext dark:text-gray-300 h-12 rounded-2xl  dark:bg-transparent ">
        <FontAwesomeIcon
          icon={faUser}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 text-subtext dark:text-gray-300"
        />
        <SelectValue placeholder="No of Passengers" />
      </SelectTrigger>

      {/* Content with passenger options */}
      <SelectContent className="bg-white dark:bg-gray-900">
        <SelectGroup>
          <SelectLabel className="text-gray-700 dark:text-gray-300">Passengers</SelectLabel>
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
export const SelectType = () => {
  return (
    <Select>
      <SelectTrigger className="relative pl-12 font-semibold !border-none text-subtext hover:dark:bg-gray-800  dark:text-gray-300 h-12 rounded-2xl  dark:bg-transparent ">
        <FontAwesomeIcon
          icon={faTruckFast}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 text-subtext dark:text-gray-300"
        />
        <SelectValue placeholder="Ride Type" />
      </SelectTrigger>

      <SelectContent className="bg-white dark:bg-gray-900">
        <SelectGroup>
          <SelectLabel className="text-gray-700 dark:text-gray-300">Ride Type</SelectLabel>
          <SelectItem value="mixed">Passanger</SelectItem>
          <SelectItem value="private">Cargo</SelectItem>
          <SelectItem value="shared">Mix</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};