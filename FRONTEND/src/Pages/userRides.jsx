import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCar, faArrowRight, faClock, faCalendar } from "@fortawesome/free-solid-svg-icons";

const RideHistory = () => {
  const [selectedTab, setSelectedTab] = useState("current"); // Active tab
  const [selectedHistoryRide, setSelectedHistoryRide] = useState(null); // Specific ride from history

  const ridesData = {
    current: {
      id: 1,
      title: "Ride to Downtown",
      date: "2025-01-25",
      time: "05:30 PM",
      status: "Ongoing",
      driver: "John Doe",
      vehicle: "Toyota Prius - Blue",
    },
    ongoing: {
      id: 2,
      title: "Ride to Airport",
      date: "2025-01-26",
      time: "06:30 AM",
      status: "Scheduled",
      driver: "Emily Smith",
      vehicle: "Honda Accord - White",
    },
    history: [
      {
        id: 3,
        title: "Ride to Business Meeting",
        date: "2025-01-20",
        time: "09:00 AM",
        status: "Completed",
        driver: "James Brown",
        vehicle: "BMW 5 Series - Black",
      },
      {
        id: 4,
        title: "Ride to the Mall",
        date: "2025-01-15",
        time: "02:00 PM",
        status: "Completed",
        driver: "Alice Johnson",
        vehicle: "Nissan Altima - Red",
      },
    ],
  };
  useEffect(() => {
     window.scrollTo(0, 0); // Scroll to top when component mounts
   }, []);
  return (
    <div className="max-w-4xl min-h-[70vh] mx-auto p-6 rounded-lg">
      <div className="h-16"></div>

      {/* Tabs */}
      <div className="text-2xl mb-5 font-semibold flex justify-center space-x-8">
        {["current", "ongoing", "history"].map((tab) => (
          <div
            key={tab}
            onClick={() => {
              setSelectedTab(tab);
              setSelectedHistoryRide(null); // Reset selected history ride
            }}
            className={`cursor-pointer border-b-4 ${
              selectedTab === tab ? "border-blue-500" : "border-gray-300"
            } transition-all duration-300`}
          >
            {tab === "current" && "Current Ride"}
            {tab === "ongoing" && "Scheduled Ride"}
            {tab === "history" && "Past Rides"}
          </div>
        ))}
      </div>

      {/* Ride Content */}
      <div className="space-y-4">
        {/* Current Ride */}
        {selectedTab === "current" && ridesData.current && (
          <RideCard
            ride={ridesData.current}
            onClick={() => alert("Current ride details")}
          />
        )}

        {/* Ongoing (Scheduled) Ride */}
        {selectedTab === "ongoing" && ridesData.ongoing && (
          <RideCard
            ride={ridesData.ongoing}
            onClick={() => alert("Ongoing ride details")}
          />
        )}

        {/* Past Rides */}
        {selectedTab === "history" && !selectedHistoryRide && (
          ridesData.history.map((ride) => (
            <RideCard
              key={ride.id}
              ride={ride}
              onClick={() => setSelectedHistoryRide(ride)}
            />
          ))
        )}

        {/* Selected History Ride Details */}
        {selectedTab === "history" && selectedHistoryRide && (
          <div className="bg-white shadow-md rounded-lg p-4">
            <h3 className="text-lg font-semibold mb-4">
              {selectedHistoryRide.title} Details
            </h3>
            <div className="space-y-2 overflow-y-auto max-h-64">
              <p>
                <strong>Date:</strong> {selectedHistoryRide.date}
              </p>
              <p>
                <strong>Time:</strong> {selectedHistoryRide.time}
              </p>
              <p>
                <strong>Status:</strong>{" "}
                <span className="text-green-500">{selectedHistoryRide.status}</span>
              </p>
              <p>
                <strong>Driver:</strong> {selectedHistoryRide.driver}
              </p>
              <p>
                <strong>Vehicle:</strong> {selectedHistoryRide.vehicle}
              </p>
            </div>
            <button
              className="text-blue-500 underline mt-4"
              onClick={() => setSelectedHistoryRide(null)}
            >
              Back to History
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

const RideCard = ({ ride, onClick }) => (
  <div
    className="bg-white shadow-md rounded-lg p-4 flex items-center gap-4 cursor-pointer"
    onClick={onClick}
  >
    <FontAwesomeIcon icon={faCar} className="text-blue-500 text-3xl" />
    <div className="flex-1">
      <h3 className="text-lg font-semibold">{ride.title}</h3>
      <div className="text-sm text-gray-600 flex items-center gap-2">
        <FontAwesomeIcon icon={faCalendar} className="text-gray-500" />
        <span>{ride.date}</span>
        <FontAwesomeIcon icon={faClock} className="ml-4 text-gray-500" />
        <span>{ride.time}</span>
      </div>
      <p className="text-sm text-gray-500">
        <span className="font-semibold">Driver:</span> {ride.driver}
      </p>
      <p className="text-sm text-gray-500">
        <span className="font-semibold">Vehicle:</span> {ride.vehicle}
      </p>
    </div>
    <FontAwesomeIcon icon={faArrowRight} className="text-gray-400 text-xl" />
  </div>
);

export default RideHistory;
