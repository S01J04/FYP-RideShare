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
  timeout: 100000, // Timeout after 100 seconds
});

let refreshTokenRequest = null; // Prevent multiple refresh calls

// Function to refresh the token
const refreshAuthToken = async () => {
  if (!refreshTokenRequest) {
    refreshTokenRequest = axios
      .get("http://localhost:3000/api/users/refresh-token", { withCredentials: true })
      .then(({ data }) => {
        store.dispatch(setAccessToken(data.accessToken)); // Update Redux store
        return data.accessToken;
      })
      .catch((error) => {
        console.error("Token refresh failed:", error);
        store.dispatch(logoutUser()); // Logout user on failure
        return null;
      })
      .finally(() => {
        refreshTokenRequest = null;
      });
  }

  return refreshTokenRequest;
};

// Request Interceptor - Attach Token
axiosInstance.interceptors.request.use(
  (config) => {
    const state = store.getState();
    const token = state.user.accessToken; // Get token from Redux store
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor - Refresh Token on 401
axiosInstance.interceptors.response.use(
  (response) => response.data, // Return data directly
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const newToken = await refreshAuthToken();

      if (newToken) {
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return axiosInstance(originalRequest); // Retry with new token
      }
    }

    return Promise.reject(error.response ? error.response.data : error.message);
  }
);

// ✅ Auto Refresh Token Every 14 Minutes
setInterval(async () => {
  try {
    await refreshAuthToken();
  } catch (error) {
    console.error("Auto-refresh failed:", error);
  }
}, 14 * 60 * 1000); // Refresh every 14 minutes

export default axiosInstance;
