import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { logoutUser, setAccessToken, setUser } from "../slices/userSlice";
import { useNavigate } from "react-router";
import axiosInstance from "../axiosInstance";

// Login hook
export const useLogin = () => {
    const dispatch = useDispatch();
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

        console.log("Response data:", response);
        dispatch(setUser(response.data)); // Store user in Redux
        dispatch(setAccessToken(response.data.accessToken))
        localStorage.setItem("user", JSON.stringify(response.data.accessToken)); // Save token
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
      localStorage.setItem("user"); // Store user data in localStorage
    } catch (err) {
      setError(err.response ? err.response.data : err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return { signupUser, isLoading, error };
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
