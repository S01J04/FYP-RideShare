import React, { useEffect, useRef, useState } from "react";
import { HiOutlinePlusCircle } from "react-icons/hi";
import { IoClose } from "react-icons/io5";
import { Button } from "../ui/button";
import gsap from "gsap";
import { useProfile } from "@/redux/hooks/userHooks";
import { useDispatch } from "react-redux";
import { updateProfile } from "@/redux/slices/userSlice";

export const AddBio = ({ goBack, user, setUser }) => {
  const [editField, setEditField] = useState(null); // Stores which field is being edited
  const [newValue, setNewValue] = useState("hey"); // Stores new value for editing
  const modalRef = useRef(null);
  const dispatch = useDispatch();
  const {setProfileBio,isLoading,error} = useProfile();
  

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

  // Save the new value and close the popup
  const saveChanges = async() => {
    console.log(user);
    if (newValue.length <= 0) {
      alert("Input must not be empty ", [editField])
      return
    }
    if(user){
      const response = await setProfileBio( newValue);
      console.log("response: ", response)
      setUser({ ...user, [editField]: newValue })
      dispatch(updateProfile({ field: "bio", value: response?.data?.user.bio}));
      console.log("BIO",response?.data?.user.bio)
    
      
      if(!isLoading){
        setEditField(null);
        goBack();}
    }
   
  };
 useEffect(() => {
    window.scrollTo(0, 0); // Scroll to top when component mounts
  }, []);
  return (
    <div className="mx-auto min-h-[60vh] max-w-3xl relative">
      {/* Cross btn */}
      <button className="" onClick={goBack}>
        <IoClose className="text-heading" size={"2rem"} />
      </button>

      <div className="text-heading text-3xl font-semibold p-5 text-center">
        Personal details
      </div>

      <div className="flex flex-col gap-0 p-5">
        {/* Date of Birth */}
        <div
          className="hover:bg-gray-200 border-2 border-primary hover:dark:bg-gray-800 p-3 rounded-2xl cursor-pointer"
          onClick={() => openEditBox("bio", user?.bio)}
        >
          <span className="text-subtext block">Please Enter your bio</span>
          <span className="text-primary text-lg font-semibold">{user?.bio}</span>
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
        {editField === "bio" && (
            <textarea
            name="bio"
            placeholder="Enter your bio........"
            className="border-2 border-primary rounded-2xl p-3 w-full focus:outline-none"
            rows="4" // Allows multiline input
            value={newValue}
            onChange={(e) => setNewValue(e.target.value)}
          />
        )
       }
          
        

        {/* Clear Button (Not for Date Input) */}
        {editField !== "bio" &&  (
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
    </div>
  );
}

