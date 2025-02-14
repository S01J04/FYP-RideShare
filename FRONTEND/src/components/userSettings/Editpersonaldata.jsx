import React, { useEffect, useRef, useState } from "react";
import { HiOutlinePlusCircle } from "react-icons/hi";
import { IoClose } from "react-icons/io5";
import { Button } from "../ui/button";
import gsap from "gsap";
import { useDispatch } from "react-redux";
import { useProfile } from "@/redux/hooks/userHooks";
import { updateProfile } from "@/redux/slices/userSlice";

export const Editpersonaldata = ({ goBack, user, setUser }) => {
   useEffect(() => {
      window.scrollTo(0, 0); // Scroll to top when component mounts
    }, []);
  const [editField, setEditField] = useState(null); // Stores which field is being edited
  const [newValue, setNewValue] = useState(""); // Stores new value for 
  const dispatch = useDispatch(null);
  const modalRef = useRef(null);
  const{
    updateProfileBio,
    updateProfileFirstName,
    updateProfileLastName,
    updateProfileEmail,
    updateProfilePhoneNumber,
    updateProfileDateOfBirth,
    isLoading,}=useProfile()
  useEffect(() => {
    if (editField) {
      gsap.from(modalRef.current, {
        y: "100vh", // Animate from bottom
        opacity: 0,
        duration: 0.6,
        ease: "power3.out",
      });
    }
  }, [editField]);
  // Open the popup box with the selected field
  const openEditBox = (field, value) => {
    setEditField(field);
    setNewValue(value);
  };

    
  const get = (field) => {
    switch (field) {
      case "firstname":
        return updateProfileFirstName;
      case "lastname":
        return updateProfileLastName;
      case "email":
        return updateProfileEmail;
      case "phone":
        return updateProfilePhoneNumber;
      case "bio":
        return updateProfileBio;
      case "dateofbirth":
        return updateProfileDateOfBirth;
      default:
        return null;

      }  }
  // Save the new value and close the popup
  const saveChanges = async(e) => {
   try {
    console.log("Field updated:", editField); // Logs the name of the field
    console.log("New value:", newValue); // Logs the new input value
      if (newValue.length <= 0) {
        alert("Input must not be empty ", [editField])
        return
      }
      const response = await get(editField).call(this, newValue);
      console.log(response); // Check full response object
  
      if (response?.data?.success === false) {
        alert(response.data.message);
        return;
      }
      
      
      if (!isLoading && response) {
        // Update local state (asynchronously)
        setUser((prevUser) => {
          const updatedUser = { ...prevUser, [editField]: newValue };
      
          // Calculate fullName correctly
          if (editField === "firstname") {
            updatedUser.fullName = newValue + " " + (prevUser?.lastname || "");
          } else if (editField === "lastname") {
            updatedUser.fullName = (prevUser?.firstname || "") + " " + newValue;
          }
        });
      
        // Dispatch Redux update with new fullName only
        if (editField === "firstname" || editField === "lastname") {
          dispatch(
            updateProfile({
              field: "fullName",
              value:
                editField === "firstname"
                  ? newValue + " " + (user?.lastname || "")
                  : (user?.firstname || "") + " " + newValue,
            })
          );
          setEditField(null);
          goBack();
         
        }else{
             // Dispatch Redux update for the edited field
        dispatch(updateProfile({ field: editField, value: newValue }));
        setEditField(null);
        goBack();
        }
      
     
      }
   } catch (error) {
    console.log(error);
    alert(error);

   }
    
  };

  return (
    <div className="mx-auto max-w-3xl relative">
      {/* Cross btn */}
      <button className="" onClick={goBack}>
        <IoClose className="text-heading" size={"2rem"} />
      </button>

      <div className="text-heading text-3xl font-semibold p-5 text-center">
        Personal details
      </div>

      <div className="flex flex-col gap-0 p-5">
        {/* First Name */}
        <div
          className="hover:bg-gray-200 hover:dark:bg-gray-800 p-3 rounded-2xl cursor-pointer"
          onClick={() => openEditBox("firstname", user?.firstname)}
        >
          <span className="text-subtext block">First Name</span>
          <span className="text-primary text-lg font-semibold">{user?.firstname}</span>
        </div>

        {/* Last Name */}
        <div
          className="hover:bg-gray-200 hover:dark:bg-gray-800 p-3 rounded-2xl cursor-pointer"
          onClick={() => openEditBox("lastname", user?.lastname)}
        >
          <span className="text-subtext block">Last Name</span>
          <span className="text-primary text-lg font-semibold">{user?.lastname}</span>
        </div>

        {/* Date of Birth */}
        <div
          className="hover:bg-gray-200 hover:dark:bg-gray-800 p-3 rounded-2xl cursor-pointer"
          onClick={() => openEditBox("dateofbirth", user?.dateofbirth)}
        >
          <span className="text-subtext block">Date of birth</span>
          <span className="text-primary text-lg font-semibold">{user?.dateofbirth}</span>
        </div>

        {/* Email Address */}
        <div
          className="hover:bg-gray-200 hover:dark:bg-gray-800 p-3 rounded-2xl cursor-pointer"
          onClick={() => openEditBox("email", user?.email)}
        >
          <span className="text-subtext block">Email address</span>
          <span className="text-primary text-lg font-semibold">{user?.email}</span>
        </div>

        {/* Add Phone Number */}
        <div
        onClick={()=> openEditBox("phoneNumber", )}
        className="hover:bg-gray-200 hover:dark:bg-gray-800 p-3 rounded-2xl cursor-pointer">
          <span className="text-primary text-lg font-semibold flex items-center gap-2">
            <HiOutlinePlusCircle size={"1.6rem"} /> Add a phone number
          </span>
        </div>
        {/* Add bio */}
        {!user?.bio ? <div
        onClick={()=> openEditBox("bio", "As a driver on our rideshare platform, I ensure a safe, comfortable, and reliable journey for passengers. With a focus on punctuality and smooth driving, I respect travel preferences, including music, conversation, and pet accommodations")}
        className="hover:bg-gray-200 hover:dark:bg-gray-800 p-3 rounded-2xl cursor-pointer">
          <span className="text-primary text-lg font-semibold flex items-center gap-2">
            <HiOutlinePlusCircle size={"1.6rem"} /> Add a bio
          </span>
        </div>:<div
        onClick={()=> openEditBox("bio", "As a driver on our rideshare platform, I ensure a safe, comfortable, and reliable journey for passengers. With a focus on punctuality and smooth driving, I respect travel preferences, including music, conversation, and pet accommodations")}
        className="hover:bg-gray-200 hover:dark:bg-gray-800 p-3 rounded-2xl cursor-pointer">
         <span className="text-subtext block">Change bio</span>
         <span className="text-subtext font-serif text-sm font-semibold">{user?.bio}</span>
        </div>}
      </div>

      {/* Editable Popup Box */}
      {editField && (
  <div className="absolute inset-0 flex justify-center items-center">
    <div ref={modalRef} className="bg-background p-5 w-full h-full">
      <button onClick={() => setEditField(null)}>
        <IoClose className="text-heading" size={"1.5rem"} />
      </button>
      <div className="flex justify-between items-center my-10">
        <h3 className="text-4xl font-semibold text-center w-full text-heading">
          What is your {editField}?
        </h3>
      </div>
      <div className="relative">
        {/* Date Input */}
        {editField === "dateofbirth" ? (
          <input
            className="border-2 border-primary rounded-2xl p-3 w-full focus:outline-none"
            type="date"
            value={newValue}
            onChange={(e) => setNewValue(e.target.value)}
          />
        ) : editField === "bio" ? (
          // Textarea for bio
          <textarea
            name="bio"
            className="border-2 border-primary rounded-2xl p-3 w-full focus:outline-none"
            rows="4" // Allows multiline input
            value={newValue}
            onChange={(e) => setNewValue(e.target.value)}
          />
        ) : (
          // Default Text Input
          <input
            className="border-2 border-primary rounded-2xl p-3 w-full focus:outline-none"
            type="text"
            value={newValue}
            onChange={(e) => setNewValue(e.target.value)}
          />
        )}

        {/* Clear Button (Not for Date Input) */}
        {editField !== "dateofbirth" && editField !== "bio" && (
          <IoClose
            className="text-heading absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
            onClick={() => setNewValue("")}
            size={"1.5rem"}
          />
        )}
      </div>
      <div className="mx-auto mt-3 flex items-center justify-center w-full">
        <Button onClick={saveChanges}>Save</Button>
      </div>
    </div>
  </div>
)}

    </div>
  );
};
