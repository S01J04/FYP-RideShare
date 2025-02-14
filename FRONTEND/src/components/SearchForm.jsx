import React, { useEffect, useRef, useState } from "react";
import { faCircle, faCircleHalfStroke, faLocationDot, faSearch, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { DatePicker } from "./DatePicker";
import SelectnoofPassengers, { SelectType } from "./Select";
import { useNavigate } from "react-router";
import gsap from "gsap";
import { RiLoader4Fill } from "react-icons/ri";
import { FaRegCircle } from "react-icons/fa";
import { RiArrowLeftRightFill } from "react-icons/ri";



import { pick } from "lodash";

// export const Search_Rides = () => {
//   const [currentDate, setCurrentDate] = useState("");
//   const [rideType, setRideType] = useState("mixed");
//   const navigate = useNavigate();

//   useEffect(() => {
//     const today = new Date();
//     const formattedDate = today.toISOString().split("T")[0];
//     setCurrentDate(formattedDate);
//   }, []);

//   const handleSearch = (e) => {
//     e.preventDefault();
//     navigate("/search-ride/:Muhammads");
//   };

//   return (
//     <form
//       onSubmit={handleSearch}
//       className="flex flex-col  md:flex-row w-full items-center justify-around   bg-white dark:bg-gray-900 shadow-md rounded-2xl"
//     >
//       {/* Pickup Location */}
//       <div className="relative flex items-center w-full md:w-[22%]">
//         <FontAwesomeIcon
//           icon={faCircle}
//           className="absolute left-3 top-1/2 transform -translate-y-1/2 text-subtext dark:text-gray-300"
//         />
//         <input
//           type="text"
//           placeholder="Leaving From"
//           className="w-full hover:bg-gray-300 placeholder:font-semibold placeholder:text-subtext hover:dark:bg-gray-800 h-12 pl-10 pr-4 rounded-2xl text-black dark:text-white  dark:bg-transparent placeholder-gray-600 dark:placeholder-gray-400 "
//         />
//       </div>

//       <div className="border my-1 md:mt-0 w-[90%] md:w-0  rounded-full border-gray-200 dark:border-gray-600 md:h-6 mx-1"></div>

//       {/* Drop Location */}
//       <div className="relative flex items-center w-full md:w-[22%]">
//         <FontAwesomeIcon
//           icon={faLocationDot}
//           className="absolute left-3 top-1/2 transform -translate-y-1/2 text-subtext dark:text-gray-300"
//         />
//         <input
//           type="text"
//           placeholder="Going to"
//           className="w-full hover:bg-gray-200 hover:dark:bg-gray-800 h-12 pl-10 pr-4 rounded-2xl placeholder:font-semibold placeholder:text-subtext text-black dark:text-white  dark:bg-transparent placeholder-gray-600 dark:placeholder-gray-400 "
//         />
//       </div>

//       <div className="border my-1 md:mt-0 w-[90%] md:w-0  rounded-full border-gray-200 dark:border-gray-600 md:h-6 mx-1"></div>

//       {/* Date Picker */}
//       <div className="relative flex items-center w-full md:w-[18%]">
//         <DatePicker />
//       </div>

//       <div className="border my-1 md:mt-0 w-[90%] md:w-0  rounded-full border-gray-200 dark:border-gray-600 md:h-6 mx-1"></div>

//       {/* Passenger Selector */}
//       <div className="relative my-[4px] flex items-center w-full md:w-[18%]">
    
//         <SelectnoofPassengers />
//       </div>

//       <div className="border my-1 md:mt-0 w-[90%] md:w-0  rounded-full border-gray-200 dark:border-gray-600 md:h-6 mx-1"></div>

//       {/* Ride Type Selector */}
//       <div className="relative flex items-center w-full md:w-[18%]">
//         <SelectType />
//       </div>
//       <div className="border my-1 md:mt-0 w-[90%] md:w-0  rounded-full border-gray-200 dark:border-gray-600  mx-1"></div>

//       {/* Search Button */}
//       <button
//         type="submit"
//         className="flex items-center  justify-center w-full md:w-12  lg:w-[12%] h-14 bg-primary text-white dark:bg-primary-dark dark:text-white rounded-r-2xl hover:bg-primary-hover transition-all"
//       >
//         <FontAwesomeIcon icon={faSearch} className=" md:mr-0 mr-2 lg:mr-1" />
//         <span className="md:hidden lg:inline">Search</span>
//       </button>
//     </form>
//   );
// };


export const SearchForm = () => {
  const [currentDate, setCurrentDate] = useState("");
  const [rideType, setRideType] = useState("mixed");
  const navigate = useNavigate();
  const [focusedInput, setFocusedInput] = useState(null);
  const [pickup, setPickup] = useState("");
  const [drop, setDrop] = useState("");

  const dropdownRef = useRef(null);
  const inputContainerRef = useRef(null);

  // Dummy locations
  const locations = ["New York  USA", "San Francisco  USA", "Berlin Germany","San Francisco  USA", "Berlin Germany","San Francisco  USA", "Berlin Germany"];

  // Animate dropdown appearing
  useEffect(() => {
    if (focusedInput && dropdownRef.current) {
      gsap.fromTo(
        dropdownRef.current,
        { opacity: 0, y: 80, scale: 0.3, transformOrigin: "bottom right" },
        { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: "power2.out" }
      );
    }
  }, [focusedInput]);

  // Scroll animation effect (slight up/down movement)
  useEffect(() => {
    const handleScroll = () => {
      gsap.to(inputContainerRef.current, {
        y: window.scrollY % 5,
        duration: 0.5,
        ease: "power1.out",
      });
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const today = new Date();
    const formattedDate = today.toISOString().split("T")[0];
    setCurrentDate(formattedDate);

  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    navigate("/search-ride/:Muhammads");
  };
 const [loader, setloader] = useState(false);
  return (
    <form
      onSubmit={handleSearch}  
      className="flex flex-col pl-[3px]  md:flex-row w-full items-center justify-around   bg-white dark:bg-gray-900 shadow-md rounded-2xl"
    >
      {/* Pickup Location */}
      <div ref={inputContainerRef} className="relative flex items-center w-full md:w-[22%]">
      {loader ?<RiLoader4Fill
  size={"1.3rem"}
  
  className="absolute  animate-spin left-3 top-1/3 text-subtext dark:text-gray-300"
/>: <FaRegCircle  strokeWidth={"25px"} size={"1.2rem"} className="absolute  left-3 top-1/3 text-subtext dark:text-gray-300" />}
<RiArrowLeftRightFill strokeWidth={1} size={"1.2rem"} className="absolute cursor-pointer  right-3 top-1/3 text-subtext dark:text-gray-300" />

        <input 
          type="text"
          placeholder="Leaving From"
          value={pickup}
          onChange={(e) => {
            setPickup(e.target.value)
            setFocusedInput("pickup")
          }}
          onBlur={() => setTimeout(() => setFocusedInput(null), 200)}
          className="w-full transition-all hover:bg-gray-200 placeholder:font-semibold placeholder:text-subtext hover:dark:bg-gray-800 h-12 pl-10 pr-9 overflow-hidden text-ellipsis whitespace-nowrap rounded-2xl text-black dark:text-white dark:bg-transparent placeholder-gray-600 dark:placeholder-gray-400"
          />
        {/* Dropdown for Pickup */}
        {focusedInput === "pickup" && (
          <div ref={dropdownRef} className="absolute top-full mt-2 w-full bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden">
            {locations.length > 0 && 
  locations
    .filter(
      (location) =>
        location.toLowerCase().includes(pickup.toLowerCase()) &&
        location !== pickup &&
        location !== drop
    )
    .map((location, index) => {
      // Split location by spaces but keep "New York" together
      const words = location.split(" ").filter((word) => word !== ""); // Remove extra spaces
      if(index>4) return null
      let cityName = words.slice(0, 2).join(" "); // First two words as city name (handles "New York", "San Francisco")
      let details = words.slice(2).join(" "); // Everything else as details

      return (
        <div
          key={index}
          onClick={() => {
            setDrop(location);
            setFocusedInput(null);
          }}
          className="p-3 z-20 hover:bg-gray-200 rounded-2xl mx-1 my-1 px-6 dark:hover:bg-gray-700 flex flex-col gap-1 hov  cursor-pointer"
        >
          {/* City Name (Bold) */}
          <div className="font-semibold text-heading text-md dark:text-white">{cityName}</div>
          {/* Location Details (Smaller Text) */}
          {details && (
            <div className="text-xs text-subtext font-semibold  dark:text-gray-400">
              {details}
            </div>
          )}
        </div>
      );
    })}

          </div>
        )}
      </div>

      <div className="border my-1 md:mt-0 w-[90%] md:w-0 rounded-full border-gray-200 dark:border-gray-600 md:h-6 mx-1"></div>

      {/* Drop Location */}
      <div className="relative flex items-center w-full md:w-[22%]">
      {loader ?<RiLoader4Fill
  size={"1.3rem"}
  
  className="absolute  animate-spin left-3 top-1/3 text-subtext dark:text-gray-300"
/>: <FaRegCircle  strokeWidth={"25px"} size={"1.2rem"} className="absolute  left-3 top-1/3 text-subtext dark:text-gray-300" />}
<RiArrowLeftRightFill strokeWidth={1} size={"1.2rem"} className="absolute cursor-pointer  right-3 top-1/3 text-subtext dark:text-gray-300" />

        <input
          type="text"
          placeholder="Going to"
          value={drop}
          onChange={(e) => {
            setDrop(e.target.value)
            setFocusedInput('drop');
          }}
          onBlur={() => setTimeout(() => setFocusedInput(null), 200)}
          className="w-full transition-all  hover:bg-gray-200 placeholder:font-semibold placeholder:text-subtext hover:dark:bg-gray-800 h-12 pl-10 pr-4 rounded-2xl text-black dark:text-white dark:bg-transparent placeholder-gray-600 dark:placeholder-gray-400"
        />
        {/* Dropdown for Drop */}
        {focusedInput === "drop" && (
          <div ref={dropdownRef} className="absolute top-full mt-2 w-full bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden">
           {locations.length > 0 && 
  locations
    .filter(
      (location) =>
        location.toLowerCase().includes(drop.toLowerCase()) &&
        location !== pickup &&
        location !== drop
    )
    .map((location, index) => {
      // Split location by spaces but keep "New York" together
      const words = location.split(" ").filter((word) => word !== ""); // Remove extra spaces
      if(index>4) return null
      let cityName = words.slice(0, 2).join(" "); // First two words as city name (handles "New York", "San Francisco")
      let details = words.slice(2).join(" "); // Everything else as details

      return (
        <div
          key={index}
          onClick={() => {
            setDrop(location);
            setFocusedInput(null);
          }}
          className="p-3 hover:bg-gray-200 rounded-2xl mx-1 my-1 px-6 dark:hover:bg-gray-700 flex flex-col gap-1 hov  cursor-pointer"
        >
          {/* City Name (Bold) */}
          <div className="font-semibold text-heading text-md dark:text-white">{cityName}</div>
          {/* Location Details (Smaller Text) */}
          {details && (
            <div className="text-xs text-subtext font-semibold  dark:text-gray-400">
              {details}
            </div>
          )}
        </div>
      );
    })}

          </div>
        )}
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
        className="flex items-center  justify-center w-full md:w-12  lg:w-[16%] h-14 bg-primary text-white dark:bg-secondary dark:text-white sm:rounded-2xl sm:m-1 md:m-0 md:rounded-none  md:rounded-r-2xl hover:bg-primary-hover transition-all"
      >
        <FontAwesomeIcon icon={faSearch} className=" md:mr-0 mr-2 lg:mr-1" />
        <span className="md:hidden lg:inline">Search</span>
      </button>
    </form>
  );
};