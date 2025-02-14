import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { HiOutlinePlusCircle } from "react-icons/hi";
import { FaComments, FaMusic, FaPaw, FaSmokingBan } from "react-icons/fa";
import img from '../assets/profileimg.jpg'
import { useVehicle } from "@/redux/hooks/vehicleHook";
import { useSelector } from "react-redux";

const Profile = ({ setActiveComponent, user }) => {
   useEffect(() => {
      window.scrollTo(0, 0); // Scroll to top when component mounts
    }, []);
//  console.log("calling vehicle",vehicle);
  const [selected, setSelected] = useState("profile");
  const vehicle = useSelector(state => state.vehicle.vehicles);
   console.log("my vehicles",vehicle.find(selector => selector.isPreferred===true )._id);
   const{updatePreference}=useVehicle()
  // Function to handle selection
  const handleSelectVehicle = async (vic) => {
    updatePreference(vic.plateNumber)
  };


  return (
    <div className="max-w-4xl mx-auto p-6 rounded-lg ">
      {/* Tabs for Profile and Account */}
      <div className="text-2xl my-5 font-semibold flex flex-col md:flex-row items-center justify-center text-center">
        <div
          onClick={() => setSelected("profile")}
          className={`cursor-pointer border-b w-[50%] md:min-w-64 transition-all duration-300 ease-in-out ${selected === "profile" ? "border-heading border-b-4" : "border-gray-200"
            }`}
        >
          About You
        </div>
        <div
          onClick={() => setSelected("account")}
          className={`cursor-pointer border-b w-[50%] md:min-w-52 transition-all duration-300 ease-in-out ${selected === "account" ? "border-heading border-b-4" : "border-gray-200"
            }`}
        >
          Account
        </div>
      </div>

      {/* Profile Tab */}
      {selected === "profile" ? (
        <div className=" mx-auto w-[70%]">
          {/* Profile Header */}
          <div onClick={() => setActiveComponent("profile", user)} className="flex justify-between  items-center gap-4  cursor-pointer hover:bg-gray-200 hover:dark:bg-gray-800 rounded-2xl py-2 px-2 ">
            <div>
              <h2 className="text-xl text-heading font-semibold">{user?.firstname + " " + user?.lastname}</h2>
              <span className="text-xs text-gray-500">{user?.role}</span>
              {user?.dateofbirth && (
                <span className="text-xs block text-gray-500">
                  Date of birth: {user.dateofbirth}
                </span>
              )}
            </div>
            <div className="flex items-center gap-2">
              <img
                src={user.image || img}
                alt="Profile"
                className="w-20 h-20 rounded-full object-top object-cover"
              />
              <MdOutlineKeyboardArrowRight size={"1.5rem"} className="text-gray-500" />

            </div>

          </div>

          {/* Edit Options */}
          <div className="space-y-4 flex flex-col items-start mb-2 mt-4">
            <button onClick={() => setActiveComponent("profileimg", user)} className="text-primary font-semibold text-sm hover:underline flex items-center gap-2 "> <HiOutlinePlusCircle size={"1rem"} /> {user?.image ? "Change profile photo" : "Add profile photo"}</button>
            {!user?.dateofbirth && <button onClick={() => setActiveComponent("dateofbirth", user)} className="text-primary font-semibold text-sm hover:underline flex items-center gap-2 "> <HiOutlinePlusCircle size={"1rem"} /> Add Date of birth</button>}
            <button onClick={() => setActiveComponent("editpersonaldata", user)} className="text-primary font-semibold text-sm hover:underline">Edit personal data</button>
          </div>
          <hr className=" border-gray-200 my-4" />

          {/* Verification Section */}
          <div className=" text-sm">
            <h3 className="text-lg  text-heading font-semibold mb-4">Verify your profile</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2">
                <span className="text-primary">
                  <HiOutlinePlusCircle size={"1rem"} />
                </span>
                <button className="text-primary font-semibold text-sm hover:underline">
                  Confirm email muhammad12345sohaib@gmail.com
                </button>
              </li>
              <li className="flex items-center gap-2">

                <button className="text-primary font-semibold text-sm hover:underline flex items-center gap-2 "> <HiOutlinePlusCircle size={"1rem"} /> Confirm phone number</button>
              </li>
            </ul>
          </div>
          <hr className="my-4 border-4 rounded-full border-gray-200 " />
          {/* Profile Section */}
          <div className=" text-sm">
            <h3 className="text-md text-heading text-lg font-semibold mb-4">About You</h3>
            <ul className="space-y-3">
              <li>
                <span className="text-md text-heading font-semibold  my-2 block"><i>{user?.bio && `"${user.bio}"`}</i></span>
                {!user.bio && <button onClick={() => setActiveComponent("addbio", user)} className="text-primary flex items-center gap-2 hover:underline">
                  {" "}
                  <HiOutlinePlusCircle size={"1rem"} /> Add a short biography
                </button>}
              </li>
              {/* Travel Preferences Section */}
              <div className="text-sm">
                <h3 className="text-md text-heading text-lg font-semibold mb-4">About You</h3>
                <ul className="space-y-3">
                  {user?.preferences?.map((preference, index) => (
                    <li key={index} className="flex text-primary items-center gap-2">
                      {/* Display appropriate icons based on category */}
                      {preference?.category === "Chattiness" && preference?.selectedOption !== "No preference selected" && <FaComments />}
                      {preference?.category === "Music" && preference?.selectedOption !== "No preference selected" && <FaMusic />}
                      {preference?.category === "Smoking" && preference?.selectedOption !== "No preference selected" && <FaSmokingBan />}
                      {preference?.category === "Pets" && preference?.selectedOption !== "No preference selected" && <FaPaw />}

                      {/* Display selected option or fallback message */}
                      <span className="text-heading font-semibold">
                        {preference?.selectedOption !== "No preference selected"
                          ? preference?.selectedOption
                          : ``}
                      </span>
                    </li>
                  ))}

                </ul>

              </div>

            </ul>
            <button onClick={() => setActiveComponent("edittravelpreferences", user)} className="text-primary flex items-center gap-2 hover:underline mt-4"> <HiOutlinePlusCircle size={"1rem"} />Edit travel preferences</button>
          </div>
          <hr className="my-5 border-gray-200" />
          {/* Vehicles Section */}
          <div className="text-sm">
            <h3 className="text-lg text-heading  font-bold mb-4">Vehicles</h3>
            {
              vehicle &&
              <ul className=" my-4">
              {/* Vehicle Details */}
              {vehicle.map((vic, index) => (
        <li
          key={index}
          className={`flex w-full items-center p-2 rounded-2xl cursor-pointer transition-all duration-200
            ${vic.isPreferred ? "bg-blue-200" : "hover:bg-slate-200"}`}
          onClick={() => handleSelectVehicle(vic)}
        >
         

          {/* Vehicle Info */}
          <div className="flex  w-full items-center justify-between">
            <div>
            <div className="block w-full font-bold text-lg text-heading">{vic?.model}</div>
            <div className="text-gray-500   " >
              <span style={{ color: vic?.color }}>{vic?.color}</span> • {vic?.vehicleType} • {vic?.year} •
              <span className="font-bold text-heading">{vic?.plateNumber}</span>
            </div>
            </div>
             {/* Radio Button */}
          <input
            type="radio"
            name="vehicle"
            checked={vic.isPreferred }
            onChange={() => handleSelectVehicle(vic)}
            className="mr-3 block w-5 h-5 cursor-pointer"
          />
          </div>
        </li>
      ))}
            </ul>
            }
            <button
                  onClick={() => setActiveComponent("addvehicle", vehicle)}
                  className="text-primary flex items-center gap-2 hover:underline font-semibold"
                >
                  <HiOutlinePlusCircle size={"1.2rem"} /> Add Vehicle
                </button>

          </div>
        </div>
      ) : (
        // Account Tab
        <div className="mx-auto w-[70%] min-h-[50vh] ">
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
