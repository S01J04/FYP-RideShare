import React, { useState } from "react";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

export function DatePicker() {
  const [date, setDate] = useState();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className="w-full shadow-none  h-12 flex items-center justify-start pl-12 text-subtext dark:text-gray-300 bg-white dark:bg-transparent rounded-2xl hover:bg-gray-200 dark:hover:bg-gray-800 focus:ring-2 focus:ring-primary">
          <CalendarIcon className="h-5 w-5 absolute left-4 text-subtext dark:text-gray-300" />
          {date ? format(date, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>

      <PopoverContent className="p-0 w-auto bg-white dark:bg-gray-900 rounded-lg shadow-md">
        <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
      </PopoverContent>
    </Popover>
  );
}
