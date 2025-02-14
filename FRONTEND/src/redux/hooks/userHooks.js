import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { logoutUser, setAccessToken, setUser } from "../slices/userSlice";
import { useNavigate } from "react-router";
import axiosInstance from "../axiosInstance";
import { useVehicle } from "./vehicleHook";

// Login hook
export const useLogin = () => {
    const dispatch = useDispatch();
    const {fetchVehicles} = useVehicle()
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const loginUser = async ({ email, password }) => {
      setIsLoading(true);
      try {
        console.log("Sending payload:", { email, password });
        const response = await axiosInstance.post(
          "/users/login",
          { email, password },
          {
            headers: { "Content-Type": "application/json" },
            credentials: true, // Ensures cookies are sent
          }
        );

        console.log("Response data:", response.data);
        dispatch(setUser(response.data.user)); // Store user in Redux
        dispatch(setAccessToken(response.data.accessToken))
        if (response.success===true) {
          fetchVehicles(); // Fetch vehicles once after login
        }
        navigate("/");
      } catch (err) {
        console.error("Error response:", err.response?.data || err.message);
        console.log(err)
        setError(err.message || "An unexpected error occurred.");
      } finally {
        setIsLoading(false);
      }
    };
    
    return { loginUser, isLoading, error };
  };

// Signup hook
export const useSignup = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const signupUser = async (myformdata) => {
    setIsLoading(true);
    try {
      const response = await axiosInstance.post("/users/register", myformdata);
      dispatch(setUser(response.data)); // Dispatch user data to Redux store
    } catch (err) {
      setError(err.response ? err.response.data : err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return { signupUser, isLoading, error };
};
//User profile information

export const useProfile = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleRequest = async (apiCall) => {
    setIsLoading(true);
    try {
      const response = await apiCall();
      console.log(response);
      return response;
    } catch (err) {
      console.error("Error fetching user profile:", err);
      setError(err.response ? err.response.data : err.message);
    } finally {
      setIsLoading(false);
    }
  };

  // ✅ Set/update profile image
  const setProfileImg = async (profilePicture) => {
    console.log("Uploading profile image...");

    const formData = new FormData();
    formData.append("profilePicture", profilePicture);

    return handleRequest(() =>
      axiosInstance.post("/users/profile-upload-picture", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
    );
  };

  const updateProfileImg = (profilePicture) => {
    console.log("Updating profile image...");

    const formData = new FormData();
    formData.append("profilePicture", profilePicture);

    return handleRequest(() =>
      axiosInstance.put("/users/profile-update-picture", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
    );
  };

  // ✅ Generic functions for setting/updating profile fields
  const updateProfile = (feild, value) =>
   {return handleRequest(() => axiosInstance.patch("/users/profile/update", { feild, value }));}

  const setProfile = (feild, value) =>{
    return handleRequest(() => axiosInstance.post("/users/profile/set", { feild, value }));}

  // ✅ Specific profile updates
  const setProfileBio = (bio) => setProfile("bio", bio);
  const updateProfileBio = (bio) => updateProfile("bio", bio);

  // ✅ Handle first & last name in a single field (`name`)
  const updateProfileFirstName = (firstname) => updateProfile("firstname", firstname);
  const updateProfileLastName = (lastname) => updateProfile("lastname", lastname);

  // ✅ Date of Birth
  const addProfileDateOfBirth = (dateofbirth) => setProfile("dateofbirth", dateofbirth);
  const updateProfileDateOfBirth = (dateofbirth) => updateProfile("dateofbirth", dateofbirth);

  // ✅ Email
  const updateProfileEmail = (email) => updateProfile("email", email);

  // ✅ Phone Number
  const addProfilePhoneNumber = (phoneNumber) => setProfile("phone", phoneNumber);
  const updateProfilePhoneNumber = (phoneNumber) => updateProfile("phone", phoneNumber);

  // ✅ Profile Preferences
  const setProfilePreferences = (preferencesData) =>
    handleRequest(() => axiosInstance.post("/users/profile/preferences", { preferences: preferencesData }));

  const updateProfilePreferences = (preferences) => updateProfile("preferences", preferences)

  // ✅ Vehicle Management

  return {
    setProfile,
    updateProfile,
    setProfileImg,
    updateProfileImg,
    setProfileBio,
    updateProfileBio,
    setProfilePreferences,
    updateProfilePreferences,
    updateProfileFirstName,
    updateProfileLastName,
    updateProfileEmail,
    updateProfilePhoneNumber,
    addProfilePhoneNumber,
    updateProfileDateOfBirth,
    addProfileDateOfBirth,
    isLoading,
    error,
  };
};


// Logout hook
export const useLogout = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // actions/userActions.js
 const logoutUserAction = () => async (dispatch) => {
    try {
      // Dispatch a "loading" action if necessary
      dispatch({ type: 'user/logoutRequest' });
  
      // Perform the async task (e.g., API call)
      const response = await axiosInstance.get('/users/logout');
      console.log(response)      
      // if (!response.data.success) {
      //   throw new Error('Logout failed');
      // }
      document.cookie = "refreshToken=; Max-Age=0; path=/; secure; HttpOnly;";
      // Dispatch a "success" action
      dispatch(logoutUser());
   
      localStorage.removeItem('user');
      localStorage.removeItem('persist:root')
      console.log("Logout successful");
    } catch (error) {
      // Dispatch a "failure" action
      dispatch({ type: 'user/logoutFailure', payload: error.message });
      console.log("Logout failed:", error.message);
    }
  };
  

  return { logoutUserAction, isLoading, error };
};
