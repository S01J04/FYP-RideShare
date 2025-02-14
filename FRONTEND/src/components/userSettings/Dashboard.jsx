"use client";
import Profile from "@/Pages/Settings";
import { useEffect, useState, useMemo } from "react";
import ProfileEdit from "./ProfileEdit";
import ProfileImg from "./ProfileImg";
import { Editpersonaldata } from "./Editpersonaldata";
import TravelPreference from "./TravelPreference";
import { useSelector } from "react-redux";
import img from "../../assets/profileimg.jpg"; 
import { useNavigate } from "react-router";
import {ProfileDOB} from "./ProfileDOB";
import { AddBio } from "./AddBio";
import CreateVehicle from "./Vehicle";
import { useVehicle } from "@/redux/hooks/vehicleHook";

export default function UserSetting() {
  const [activeComponent, setActiveComponent] = useState(null);
 useEffect(() => {
    window.scrollTo(0, 0); // Scroll to top when component mounts
  }, []);
  // Retrieve user data from Redux store
  const profileData = useSelector((state) => state.user.user);
  const vehicleData = useSelector((state) => state.vehicle.vehicles);
  // console.log("Vehicle Data:", vehicleData);
  // console.log("Profile Data:", profileData);
  const navigate=useNavigate()
  if(!profileData){
      navigate('/')
  }

  // **Optimize Date Calculations with `useMemo`**
  const age = useMemo(() => {
    if (!profileData?.dateofbirth) return "N/A";
    const birthYear = new Date(profileData.dateofbirth).getFullYear();
    return new Date().getFullYear() - birthYear;
  }, [profileData?.dateofbirth]);

  const formattedDOB = useMemo(() => {
    if (!profileData?.dateofbirth) return null;
    const birthDate = new Date(profileData.dateofbirth);
    return `${birthDate.getDate()}-${birthDate.getMonth() + 1}-${birthDate.getFullYear()}`;
  }, [profileData?.dateofbirth]);

  const formattedCreatedAt = useMemo(() => {
    if (!profileData?.createdAt) return "N/A";
    const createdAtDate = new Date(profileData.createdAt);
    return `${createdAtDate.toLocaleString("default", { month: "long" })} ${createdAtDate.getFullYear()}`;
  }, [profileData?.createdAt]);
  // console.log("profileData", profileData);

  // **Optimize User State with `useEffect`**
  const [user, setUser] = useState({
    firstname: "",
    lastname: "",
    travelpreference: [],
    role: "",
    age: "",
    bio: "",
    dateofbirth: null,
    phonenumber: "",
    image: img, // Default profile image
    email: "",
    createdAt: "",
  }); 
  const [vehicle, setVehicle] = useState([]);  // Start with an empty array
  // console.log(vehicle)
  // console.log(user.dateofbirth)

  useEffect(() => {
    if (profileData) {
      setUser({
        firstname: profileData?.fullName?.split(" ")[0] || "",
        lastname: profileData?.fullName?.split(" ")[1] || "",
        preferences: profileData?.preferences || [],
        role: profileData?.role || "",
        age,
        bio: profileData?.bio || "",
        dateofbirth: formattedDOB,
        phonenumber: profileData?.phoneNumber || "N/A",
        image: profileData?.profilePicture        ,
        email: profileData?.email || "N/A",
        createdAt: formattedCreatedAt,
      });
    }
   
  }, [profileData, age, formattedDOB, formattedCreatedAt]);
  useEffect(() => {
    if (vehicleData && vehicleData.length > 0) {
      setVehicle(vehicleData.map(vehicle => ({
        vehicleType: vehicle.vehicleType || "",
        plateNumber: vehicle.plateNumber || "",
        year: vehicle.year || "",
        color: vehicle.color || "",
        model: vehicle.model || "",
      })));
    }
  }, [vehicleData]);
  
  // console.log("my vehicle",vehicle)

  // Function to handle component selection
  const handleSelectComponent = (component) => {
    setActiveComponent(component);
  };

  // **Render Active Component Dynamically**
  const renderComponent = () => {
    switch (activeComponent) {
      case "profile":
        return <ProfileEdit goBack={() => setActiveComponent(null)} user={user} />;
      case "profileimg":
        return <ProfileImg goBack={() => setActiveComponent(null)} user={user} setUser={setUser} />;
      case "dateofbirth":
        return <ProfileDOB goBack={() => setActiveComponent(null)} user={user} setUser={setUser} />;
      case "addbio":
        return <AddBio goBack={() => setActiveComponent(null)} user={user} setUser={setUser} />;
      case "editpersonaldata":
        return <Editpersonaldata goBack={() => setActiveComponent(null)} user={user} setUser={setUser} />;
      case "addvehicle":
        return <CreateVehicle goBack={() => setActiveComponent(null)} vehicle={vehicle} setVehicle={setVehicle} />;
      case "edittravelpreferences":
        return (
          <TravelPreference
            goBack={() => setActiveComponent(null)}
            userpreferences={user.preferences}
            setUserPreferences={(newPreferences) => setUser({ ...user, preferences: newPreferences })}
          />
        );
      default:
        return <Profile setActiveComponent={handleSelectComponent} user={user} vehicle={vehicle} />;
    }
  };

  return <div className="p-4">{renderComponent()}</div>;
}
