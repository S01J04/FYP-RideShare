import React, { useEffect, useState } from "react";
import { faCircle, faCircleHalfStroke, faLocationDot, faSearch, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { DatePicker } from "./DatePicker";
import SelectnoofPassengers, { SelectType } from "./Select";
import { useNavigate } from "react-router";


export const Search_Rides = () => {
  const [currentDate, setCurrentDate] = useState("");
  const [rideType, setRideType] = useState("mixed");
  const navigate = useNavigate();

  useEffect(() => {
    const today = new Date();
    const formattedDate = today.toISOString().split("T")[0];
    setCurrentDate(formattedDate);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    navigate("/search-ride/:Muhammads");
  };

  return (
    <form
      onSubmit={handleSearch}
      className="flex flex-col  md:flex-row w-full items-center justify-around   bg-white dark:bg-gray-900 shadow-md rounded-2xl"
    >
      {/* Pickup Location */}
      <div className="relative flex items-center w-full md:w-[22%]">
        <FontAwesomeIcon
          icon={faCircle}
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-subtext dark:text-gray-300"
        />
        <input
          type="text"
          placeholder="Leaving From"
          className="w-full hover:bg-gray-300 placeholder:font-semibold placeholder:text-subtext hover:dark:bg-gray-800 h-12 pl-10 pr-4 rounded-2xl text-black dark:text-white  dark:bg-transparent placeholder-gray-600 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      <div className="border my-1 md:mt-0 w-[90%] md:w-0  rounded-full border-gray-200 dark:border-gray-600 md:h-6 mx-1"></div>

      {/* Drop Location */}
      <div className="relative flex items-center w-full md:w-[22%]">
        <FontAwesomeIcon
          icon={faLocationDot}
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-subtext dark:text-gray-300"
        />
        <input
          type="text"
          placeholder="Going to"
          className="w-full hover:bg-gray-200 hover:dark:bg-gray-800 h-12 pl-10 pr-4 rounded-2xl placeholder:font-semibold placeholder:text-subtext text-black dark:text-white  dark:bg-transparent placeholder-gray-600 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      <div className="border my-1 md:mt-0 w-[90%] md:w-0  rounded-full border-gray-200 dark:border-gray-600 md:h-6 mx-1"></div>

      {/* Date Picker */}
      <div className="relative flex items-center w-full md:w-[18%]">
        <DatePicker />
      </div>

      <div className="border my-1 md:mt-0 w-[90%] md:w-0  rounded-full border-gray-200 dark:border-gray-600 md:h-6 mx-1"></div>

      {/* Passenger Selector */}
      <div className="relative my-[4px] flex items-center w-full md:w-[18%]">
    
        <SelectnoofPassengers />
      </div>

      <div className="border my-1 md:mt-0 w-[90%] md:w-0  rounded-full border-gray-200 dark:border-gray-600 md:h-6 mx-1"></div>

      {/* Ride Type Selector */}
      <div className="relative flex items-center w-full md:w-[18%]">
        <SelectType />
      </div>
      <div className="border my-1 md:mt-0 w-[90%] md:w-0  rounded-full border-gray-200 dark:border-gray-600  mx-1"></div>

      {/* Search Button */}
      <button
        type="submit"
        className="flex items-center  justify-center w-full md:w-12  lg:w-[12%] h-14 bg-primary text-white dark:bg-primary-dark dark:text-white rounded-r-2xl hover:bg-primary-hover transition-all"
      >
        <FontAwesomeIcon icon={faSearch} className=" md:mr-0 mr-2 lg:mr-1" />
        <span className="md:hidden lg:inline">Search</span>
      </button>
    </form>
  );
};


export const SearchForm = () => {
  const [currentDate, setCurrentDate] = useState("");
  const [rideType, setRideType] = useState("mixed");
  const navigate = useNavigate();

  useEffect(() => {
    const today = new Date();
    const formattedDate = today.toISOString().split("T")[0];
    setCurrentDate(formattedDate);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    navigate("/search-ride/:Muhammads");
  };

  return (
    <form
      onSubmit={handleSearch}
      className="flex flex-col  md:flex-row w-full items-center justify-around   bg-white dark:bg-gray-900 shadow-md rounded-2xl"
    >
      {/* Pickup Location */}
      <div className="relative flex items-center w-full md:w-[22%]">
        <FontAwesomeIcon
          icon={faCircle}
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-subtext dark:text-gray-300"
        />
        <input
          type="text"
          placeholder="Leaving From"
          className="w-full hover:bg-gray-300 placeholder:font-semibold placeholder:text-subtext hover:dark:bg-gray-800 h-12 pl-10 pr-4 rounded-2xl text-black dark:text-white  dark:bg-transparent placeholder-gray-600 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      <div className="border my-1 md:mt-0 w-[90%] md:w-0  rounded-full border-gray-200 dark:border-gray-600 md:h-6 mx-1"></div>

      {/* Drop Location */}
      <div className="relative flex items-center w-full md:w-[22%]">
        <FontAwesomeIcon
          icon={faLocationDot}
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-subtext dark:text-gray-300"
        />
        <input
          type="text"
          placeholder="Going to"
          className="w-full hover:bg-gray-200 hover:dark:bg-gray-800 h-12 pl-10 pr-4 rounded-2xl placeholder:font-semibold placeholder:text-subtext text-black dark:text-white  dark:bg-transparent placeholder-gray-600 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      <div className="border my-1 md:mt-0 w-[90%] md:w-0  rounded-full border-gray-200 dark:border-gray-600 md:h-6 mx-1"></div>

      {/* Date Picker */}
      <div className="relative flex items-center w-full md:w-[18%]">
        <DatePicker />
      </div>

      <div className="border my-1 md:mt-0 w-[90%] md:w-0  rounded-full border-gray-200 dark:border-gray-600 md:h-6 mx-1"></div>

      {/* Passenger Selector */}
      <div className="relative my-[4px] flex items-center w-full md:w-[18%]">
    
        <SelectnoofPassengers />
      </div>

      <div className="border my-1 md:mt-0 w-[90%] md:w-0  rounded-full border-gray-200 dark:border-gray-600 md:h-6 mx-1"></div>

      {/* Ride Type Selector */}
      <div className="relative flex items-center w-full md:w-[18%]">
        <SelectType />
      </div>
      <div className="border my-1 md:mt-0 w-[90%] md:w-0  rounded-full border-gray-200 dark:border-gray-600  mx-1"></div>

      {/* Search Button */}
      <button
        type="submit"
        className="flex items-center  justify-center w-full md:w-12  lg:w-[16%] h-14 bg-primary text-white dark:bg-secondary dark:text-white rounded-r-2xl hover:bg-primary-hover transition-all"
      >
        <FontAwesomeIcon icon={faSearch} className=" md:mr-0 mr-2 lg:mr-1" />
        <span className="md:hidden lg:inline">Search</span>
      </button>
    </form>
  );
};