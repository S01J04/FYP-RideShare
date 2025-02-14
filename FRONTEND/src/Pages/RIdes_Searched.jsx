import { useEffect, useState } from "react";
import RideCard from "@/components/ride/RideCard";
import RideFilters from "@/components/filters/RideFilters";
import mockRides from "@/constants/mockrides.js";
import {  SearchForm } from "@/components/SearchForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCar, faSearch, faTruck, faMotorcycle, faLink, faUsersBetweenLines } from "@fortawesome/free-solid-svg-icons";
import { FaMix } from "react-icons/fa";

export default function RidesSearched() {
   useEffect(() => {
      window.scrollTo(0, 0); // Scroll to top when component mounts
    }, []);
  const [rides, setRides] = useState(mockRides); // Filtered rides
  const [activeTab, setActiveTab] = useState("All"); // Current active filter
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const tabs = [
    { label: "All", icon: faLink },
    { label: "Carpool", icon: faCar },
    { label: "Cargo", icon: faTruck },
    { label: "Mix", icon: faUsersBetweenLines  },
  ];

  // Handle tab changes and filtering logic
  const handleTabChange = (tab) => {
    setActiveTab(tab);

    if (tab === "All") {
      setRides(mockRides); // Show all rides
    } else {
      const filteredRides = mockRides.filter((ride) => {
        if (tab === "Carpool") return ride.type === "carpool" ;
        if (tab === "Cargo") return ride.type === "cargo" ;
        if (tab === "Bikes") return ride.type === "bikes"; // You can add a type for bikes in your mockRides data
        return false;
      });
      setRides(filteredRides);
    }
  };

  return (
    <div className="container mb-14 mx-auto w-[95%] lg:[100%] xl:w-[70%]">
      {/* Top Search Bar */}
      <div className="h-20"></div>
      <div
        className=""
      >
        <div
       className=" text-base outline-none  md:w-[95%] lg:w-[85%] xl:w-[95%] 2xl:w-[105%]
          rounded-2xl  shadow-md flex flex-col md:flex-row items-center justify-between  "
     >
          <SearchForm className="w-[110%] mr-10" />
        </div>

        {/* Mobile Search & Filter Triggers */}
        <div className="flex justify-between items-center lg:hidden w-full">
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => setIsSearchOpen(true)}
          >
            <div>
              <FontAwesomeIcon size={"2x"} icon={faSearch} />
            </div>
            <div className="text-sm">
              Mardan → Peshawar
              <div className="text-xs text-gray-600 dark:text-gray-400">
                today, 1 passenger
              </div>
            </div>
          </div>
          <div
            className="text-xl font-bold cursor-pointer"
            onClick={() => setIsFilterOpen(true)}
          >
            Filter
          </div>
        </div>
      </div>

      {/* Filter & Search Modals (Mobile Only) */}
      {isFilterOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 overflow-hidden">
          <div className="bg-white dark:bg-gray-800 overflow-y-auto max-h-[90vh] rounded-lg w-11/12 max-w-md">
            <RideFilters />
            <div className="p-4">
              <button
                onClick={() => setIsFilterOpen(false)}
                className="mt-4 w-full bg-primary text-white py-2 rounded-lg"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {isSearchOpen && (
        <div className="fixed inset-0 z-10 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg w-11/12 max-w-md">
            <h3 className="text-xl font-bold mb-4">Search</h3>
            <SearchForm />
            <button
              onClick={() => setIsSearchOpen(false)}
              className="mt-4 w-full bg-primary text-white py-2 rounded-lg"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Tabs for Filtering */}
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-[300px,1fr] gap-8">
        {/* Desktop Filters */}
        <aside className="lg:sticky hidden lg:block lg:top-20 lg:h-[calc(100vh-5rem)] overflow-auto">
          <RideFilters />
        </aside>

        <main className="space-y-4">
          <div className="flex items-center justify-center w-full">
            {tabs.map((tab) => (
              <div
                key={tab.label}
                onClick={() => handleTabChange(tab.label)} // Use the tab click handler
                className={`relative flex-1 text-center  py-4 cursor-pointer ${
                  activeTab === tab.label
                    ? "text-secondary"
                    : "hover:bg-gray-200 hover:dark:bg-gray-800"
                }`}
              >
                {tab.icon && (
                  <FontAwesomeIcon className="mx-1 dark:white" icon={tab.icon} />
                )}
                <span className="first:block  hidden md:block">{tab.label}</span>
                {/* Animated bottom border */}
                <span
                  className={`absolute bottom-0 left-0 h-1 w-full bg-secondary transition-transform duration-300 ${
                    activeTab === tab.label ? "scale-x-100" : "scale-x-0"
                  }`}
                />
              </div>
            ))}
          </div>

          {/* Available Rides Section */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Available Rides</h2>
            <span className="text-muted-foreground">{rides.length} rides found</span>
          </div>

          {/* Rides based on filter */}
          {rides.map((ride) => (
            <RideCard key={ride.id} ride={ride} />
          ))}
        </main>
      </div>
    </div>
  );
}
