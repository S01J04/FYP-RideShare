import React, { useEffect, useState } from "react";
import { faLocationDot, faSearch, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { DatePicker } from "./DatePicker";
import SelectnoofPassengers, { SelectType } from "./Select";
import { useNavigate } from "react-router";


export const Search_Rides = () => {
  const [currentDate, setCurrentDate] = useState("");
  const [rideType, setRideType] = useState("mixed"); // State for the ride type
  const navigate = useNavigate();

  useEffect(() => {
    const today = new Date();
    const formattedDate = today.toISOString().split("T")[0]; // Format the date as yyyy-mm-dd
    setCurrentDate(formattedDate); // Set the current date
  }, []);

  const handleSearch = (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    navigate("/search-ride/:Muhammads");
  };

  return (
    <form
      onSubmit={handleSearch} // Bind the handleSearch function to the form submission
      className="flex flex-col outline-none lg:flex-row w-full items-center justify-around gap-4"
    >
      {/* Pickup Location */}
      <div className="relative outline-none flex items-center w-full lg:w-[22%]">
        <FontAwesomeIcon
          icon={faLocationDot}
          className="absolute dark:text-black top-1/2 left-3 transform -translate-y-1/2"
        />
        <input
          type="text"
          placeholder="Pickup Location"
          className="lg:text-base px-2 pl-7 lg:pl-10 dark:text-black hover:bg-slate-200 md:text-sm w-full h-10  border rounded-md"
        />
      </div>

      {/* Drop Location */}
      <div className="relative flex items-center w-full lg:w-[22%]">
        <FontAwesomeIcon
          icon={faLocationDot}
          className="absolute dark:text-black top-1/2 left-3 transform -translate-y-1/2"
        />
        <input
          type="text"
          placeholder="Drop Location"
          className="lg:text-base dark:text-black   hover:bg-slate-200 md:text-sm w-full h-10 px-2 pl-7 lg:pl-10 rounded-md"
        />
      </div>

      {/* Date Picker */}
      <div className="relative flex  items-center w-full lg:w-[18%]">
        <DatePicker />
      </div>

      {/* Passenger Selector */}
      <div className="relative flex items-center w-full  lg:w-[21%]">
        <FontAwesomeIcon
          icon={faUser}
          className="absolute dark:text-black top-1/2 left-3 transform -translate-y-1/2"
        />
        <SelectnoofPassengers />
      </div>

      {/* Ride Type Selector */}
      <div className="relative flex items-center w-full lg:w-[15%]">
        <SelectType />
      </div>

      {/* Search Button */}
      <button
        type="submit" // Form submission will trigger onSubmit
        className="md:text-center lg:w-[15%] border  h-10 text-white rounded-md hover:bg-secondary hover:dark:text-white hover:text-black md:rounded-full lg:rounded-md transition-all justify-center relative flex items-center w-full md:w-10"
      >
        <span className="">
          <FontAwesomeIcon
            icon={faSearch}
            className="absolute top-1/2 left-3 transform -translate-y-1/2"
          />
        </span>
        <span className="md:hidden lg:block">Search</span>
      </button>
    </form>
  );
};

export const SearchForm = () => {
  const [currentDate, setCurrentDate] = useState("");
  const [rideType, setRideType] = useState("mixed"); // State for the ride type
  const navigate = useNavigate();

  useEffect(() => {
    const today = new Date();
    const formattedDate = today.toISOString().split("T")[0]; // Format the date as yyyy-mm-dd
    setCurrentDate(formattedDate); // Set the current date
  }, []);

  const handleSearch = (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    navigate("/search-ride/:Muhammads");
  };

  return (
    <form
      onSubmit={handleSearch} // Bind the handleSearch function to the form submission
      className="flex flex-col outline-none md:flex-row w-full items-center justify-around gap-4"
    >
      {/* Pickup Location */}
      <div className="relative outline-none flex items-center w-full md:w-[22%]">
        <FontAwesomeIcon
          icon={faLocationDot}
          className="absolute dark:text-black top-1/2 left-3 transform -translate-y-1/2"
        />
        <input
          type="text"
          placeholder="Pickup Location"
          className="lg:text-base dark:text-black hover:bg-slate-200 md:text-sm w-full h-10 pl-10 border rounded-md"
        />
      </div>

      {/* Drop Location */}
      <div className="relative flex items-center w-full md:w-[22%]">
        <FontAwesomeIcon
          icon={faLocationDot}
          className="absolute dark:text-black top-1/2 left-3 transform -translate-y-1/2"
        />
        <input
          type="text"
          placeholder="Drop Location"
          className="lg:text-base dark:text-black hover:bg-slate-200 md:text-sm w-full h-10 pl-10 rounded-md"
        />
      </div>

      {/* Date Picker */}
      <div className="relative flex items-center w-full md:w-[18%]">
        <DatePicker />
      </div>

      {/* Passenger Selector */}
      <div className="relative flex items-center w-full md:w-[18%]">
        <FontAwesomeIcon
          icon={faUser}
          className="absolute dark:text-black top-1/2 left-3 transform -translate-y-1/2"
        />
        <SelectnoofPassengers />
      </div>

      {/* Ride Type Selector */}
      <div className="relative flex items-center w-full md:w-[18%]">
        <SelectType />
      </div>

      {/* Search Button */}
      <button
        type="submit" // Form submission will trigger onSubmit
        className="md:text-center lg:w-[15%] border  h-10 text-white rounded-md hover:bg-secondary hover:dark:text-white hover:text-black md:rounded-full lg:rounded-md transition-all justify-center relative flex items-center w-full md:w-10"
      >
        <span className="block md:block lg:block">
          <FontAwesomeIcon
            icon={faSearch}
            className="absolute top-1/2 left-3 transform -translate-y-1/2"
          />
        </span>
        <span className="md:hidden lg:block">Search</span>
      </button>
    </form>
  );
};
