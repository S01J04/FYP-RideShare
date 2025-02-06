import axios from 'axios';
import { store } from "./store"; // Import Redux store
import { setAccessToken, logoutUser } from "./slices/userSlice.js";
// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000/api', 
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
  timeout: 10000, // Timeout after 10 seconds
});

// Response Interceptor - Refresh Token on 401
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
      const originalRequest = error.config;
      
      if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;

          try {
              // Request new access token using refresh token
              const { data } = await axios.get("http://localhost:3000/api/users/refresh-token", { withCredentials: true });

              // Update Redux store with new token
              store.dispatch(setAccessToken(data.accessToken));

              // Retry the failed request with new token
              originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
              return axiosInstance(originalRequest);
          } catch (refreshError) {
              console.error("Token refresh failed:", refreshError);
              store.dispatch(logoutUser());
          }
      }

      return Promise.reject(error);
  }
);


// Response Interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    // Return response data directly for convenience
    return response.data;
  },
  (error) => {
    // Handle errors globally
    if (error.response) {
      console.error('API Error:', error.response.data);
      return Promise.reject(error.response.data); // Ensure this is handled correctly
    } else if (error.request) {
      console.error('Network Error:', error.message);
      return Promise.reject({ message: 'Network error. Please try again.' });
    } else {
      console.error('Error:', error.message);
      return Promise.reject({ message: error.message });
    }
  }
);
export default axiosInstance;
