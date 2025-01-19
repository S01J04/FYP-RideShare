import React, { useState } from "react";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils"; // Utility for class names
import { Button } from "@/components/ui/button"; // Custom button component
import { Calendar } from "@/components/ui/calendar"; // Custom calendar component
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"; // Custom popover components

export function DatePicker() {
  const [date, setDate] = useState(); // Removed type annotation for compatibility with JavaScript

  return (
    <Popover>
      {/* Popover Trigger */}
      <PopoverTrigger asChild>
        <Button
          
          className={cn(
            "w-[100%] bg-white pr-8  text-black dark:text-gray-500 hover:bg-slate-200 lg:text-base md:text-sm  justify-start text-left font-normal",
            !date && "text-muted-foreground" // Placeholder styling when no date is selected
          )}
        >
          <CalendarIcon className=" h-4 w-4" />
          {date ? format(date, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>

      {/* Popover Content */}
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate} // Updates the state when a date is selected
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
