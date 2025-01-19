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
      {/* Trigger with placeholder text in gray */}
      <SelectTrigger className="pl-9">
        <SelectValue
          className="text-gray-400 px-2 pl-7 lg:pl-10" // Placeholder text styling
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
export const SelectType = () => {
  return ( <Select>
    {/* Trigger with placeholder text in gray */}
    <SelectTrigger className="">
      <SelectValue
        className="" // Placeholder text styling
        placeholder="Select type"
      />
    </SelectTrigger>

    {/* Content with options for numbers from 1 to 5 */}
    <SelectContent className={" "}>
      <SelectGroup>
        <SelectLabel >Add type</SelectLabel>
        <SelectItem key={"1"} value={"passanger"} >
          <FontAwesomeIcon icon={faUser}/> Passangers
        </SelectItem>
        <SelectItem key={"2"} value={"cargo"}>
        <FontAwesomeIcon icon={faTruckFast}/> Cargo
        </SelectItem>
        <SelectItem key={"3"} value={"mix"}>
        <FontAwesomeIcon icon={faPlus}/> Mix
        </SelectItem>
      </SelectGroup>
    </SelectContent>
  </Select>)
}