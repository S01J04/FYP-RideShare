import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";

const Profile = () => {
  const [selected, setSelected] = useState("profile");

  return (
    <div className="max-w-4xl mx-auto p-6 rounded-lg">
      <div className="h-16"></div>

      {/* Tabs for Profile and Account */}
      <div className="text-2xl my-5 font-semibold flex flex-col md:flex-row items-center justify-center text-center">
        <div
          onClick={() => setSelected("profile")}
          className={`cursor-pointer border-b w-[50%] md:min-w-64 transition-all duration-300 ease-in-out ${
            selected === "profile" ? "border-secondary border-b-4" : "border-gray-200"
          }`}
        >
          Profile
        </div>
        <div
          onClick={() => setSelected("account")}
          className={`cursor-pointer border-b w-[50%] md:min-w-52 transition-all duration-300 ease-in-out ${
            selected === "account" ? "border-secondary border-b-4" : "border-gray-200"
          }`}
        >
          Account
        </div>
      </div>

      {/* Profile Tab */}
      {selected === "profile" ? (
        <div className=" ml-28">
          {/* Profile Header */}
          <div className="flex  items-center gap-4 ">
            <img
              src="https://randomuser.me/api/portraits/women/1.jpg"
              alt="Profile"
              className="w-16 h-16 rounded-full object-cover"
            />
            <div>
              <h2 className="text-xl font-semibold">Farooq</h2>
              <span className="text-sm text-gray-500">Expert</span>
            </div>
          </div>

          {/* Edit Options */}
          <div className="space-y-4 flex flex-col items-start mb-2 mt-4">
            <button className="text-secondary text-sm hover:underline">Edit profile photo</button>
            <button className="text-secondary text-sm hover:underline">Edit personal data</button>
          </div>
          <hr className=" border-gray-200 my-4" />

          {/* Verification Section */}
          <div className=" text-sm">
            <h3 className="text-md font-semibold mb-4">Verify your profile</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2">
                <span className="text-secondary">
                  <FontAwesomeIcon icon={faPlusCircle} />
                </span>
                <button className="text-secondary text-sm hover:underline">
                  Confirm identification document
                </button>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-500">✔</span>
                <span>engineerfarooq123@gmail.com</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-500">✔</span>
                <span>+49 176 8791 5376</span>
              </li>
            </ul>
          </div>
          <hr className="my-4 border-4 rounded-full border-gray-200 " />
          {/* Profile Section */}
          <div className=" text-sm">
            <h3 className="text-md font-semibold mb-4">Profile</h3>
            <ul className="space-y-3">
              <li>
                <button className="text-secondary hover:underline">
                  {" "}
                  <FontAwesomeIcon size={21} className=" pr-2" icon={faPlusCircle} /> Add a short biography
                </button>
              </li>
              <li className="flex items-center gap-2">
                <span>💬</span>
                <span>I am talkative when I feel comfortable</span>
              </li>
              <li className="flex items-center gap-2">
                <span>🎵</span>
                <span>I like to listen to music when I feel like it</span>
              </li>
              <li className="flex items-center gap-2">
                <span>🚬</span>
                <span>I don’t mind smoking</span>
              </li>
              <li className="flex items-center gap-2">
                <span>🐾</span>
                <span>I prefer not to travel with animals</span>
              </li>
            </ul>
            <button className="text-secondary hover:underline mt-4">Edit travel preferences</button>
          </div>
          <hr className="my-5 border-gray-200" />
          {/* Vehicles Section */}
          <div className="text-sm">
            <h3 className="text-md font-bold mb-4">Vehicles</h3>
            <ul className="space-y-3">
              <li>
                <span className="block font-bold">VOLKSWAGEN GOLF</span>
                <span className="text-gray-500">Gray</span>
              </li>
              <li>
                <button className="text-secondary hover:underline">
                  {" "}
                  <FontAwesomeIcon className="mr-3" icon={faPlusCircle} /> Add Vehicle
                </button>
              </li>
            </ul>
          </div>
        </div>
      ) : (
        // Account Tab
        <div className="ml-28 min-h-[60vh]">
          {/* Account Header */}
          <div className="flex items-center gap-4">
            <h2 className="text-xl font-semibold">Account Settings</h2>
          </div>

          {/* Edit Options */}
          <div className="space-y-4 flex flex-col items-start mb-2 mt-4">
            <button className="text-secondary text-sm hover:underline">Change email address</button>
            <button className="text-secondary text-sm hover:underline">Change phone number</button>
            <button className="text-secondary text-sm hover:underline">Change password</button>
            <button className="text-secondary text-sm hover:underline">Delete account</button>
          </div>
          <hr className="border-gray-200 my-4" />

          {/* Notifications Section */}
          <div className="text-sm">
            <h3 className="text-md font-semibold mb-4">Notifications</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2">
                <input type="checkbox" className="mr-2" />
                <span>Email notifications</span>
              </li>
              <li className="flex items-center gap-2">
                <input type="checkbox" className="mr-2" />
                <span>SMS notifications</span>
              </li>
              <li className="flex items-center gap-2">
                <input type="checkbox" className="mr-2" />
                <span>Push notifications</span>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
