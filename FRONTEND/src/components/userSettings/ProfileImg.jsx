import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { IoClose } from "react-icons/io5";
import { useProfile } from "@/redux/hooks/userHooks";
import img from "../../assets/profileimg.jpg";
import { useDispatch } from "react-redux";
import { updateProfilePicture } from "@/redux/slices/userSlice";

export default function ProfileEdit({ goBack, user, setUser }) {
  const [tempImage, setTempImage] = useState(user?.image || img);
  const [imageFile, setImageFile] = useState(null);
  const { setProfileImg, updateProfileImg, isLoading } = useProfile();
  const dispatch=useDispatch()
  // Handle Image Selection
 useEffect(() => {
    window.scrollTo(0, 0); // Scroll to top when component mounts
  }, []);
    const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setTempImage(URL.createObjectURL(file)); // Show preview
      setImageFile(file); // Store file for backend upload
    }
  };

  // Upload Image to Backend
  const handleSave = async () => {
    if (!imageFile) {
      alert("Please select an image!");
      return;
    }

    try {
     if(!user?.image){
      const response = await setProfileImg(imageFile); // Upload image
      // console.log(response)
      if (response?.data?.user?.profilePicture) {
        const updatedUser={
          ...user,
          image: response?.data?.user.profilePicture,
        }
        if(!isLoading){
          // console.log("User",user,"updated",updatedUser)
          setUser(updatedUser);
          dispatch(updateProfilePicture(response?.data?.user.profilePicture)); // 🔥 Update Redux state
          goBack();
        }
      } else {
        alert("Image upload failed, please try again.");
      }
     }else{
      const response = await updateProfileImg(imageFile); // Upload image
      // console.log(response)
      if (response?.data?.user?.profilePicture) {
        const updatedUser={
          ...user,
          image: response?.data?.user.profilePicture,
        }
       
        if(!isLoading){
          // console.log("User",user,"updated",updatedUser)
          setUser(updatedUser);
          dispatch(updateProfilePicture(response?.data?.user.profilePicture)); // 🔥 Update Redux state
          goBack();
        }
      } else {
        alert("Image upload failed, please try again.");
      }
     }
    } catch (error) {
      console.error("Profile Image Upload Error:", error);
      alert("Failed to upload image. Please try again.");
    }
  };

  return (
    <div className="p-6 w-full max-w-3xl mx-auto">
      <button onClick={goBack} className="text-sm text-heading hover:underline">
        <IoClose size={"2rem"} />
      </button>

      {/* Profile Picture Preview */}
      <div className="flex justify-between mx-auto max-w-2xl p-7 min-h-[60vh]">
        <div>
          <img src={tempImage} className="w-28 h-28 rounded-full object-top object-cover" alt="Profile" />
        </div>
        <div className="text-center w-[70%] font-bold text-heading text-3xl">
          Don't wear sunglasses, look straight ahead and make sure you're alone.
          
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
            id="fileInput"
          />

          <Button
            onClick={() => document.getElementById("fileInput").click()}
            className="block text-white bg-primary hover:text-black mx-auto mt-5"
          >
            Choose a picture
          </Button>

          {tempImage !== user?.image && (
            <div className="mt-4 flex justify-center gap-4">
              <Button onClick={() => setTempImage(user?.image)} className="bg-gray-500 text-white hover:bg-gray-700">
                Cancel
              </Button>
              <Button onClick={()=>handleSave()} className="bg-green-500 text-white hover:bg-green-700">
                {isLoading ? "Saving..." : "Save"}
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
