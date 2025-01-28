import axios from 'axios';

// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000/api', 
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
  timeout: 10000, // Timeout after 10 seconds
});

// Request Interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    // Example: Get token from cookies or Redux state
    const token = document.cookie
      .split('; ')
      .find((row) => row.startsWith('token='))
      ?.split('=')[1];

    // If token exists, add it to Authorization header
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    // Handle request errors
    return Promise.reject(error);
  }
);
// axiosInstance.interceptors.response.use(
//     (response) => response,
//     async (error) => {
//         if (error.response.status === 401) {
//             // Attempt to refresh token
//             const { data } = await axios.post('/users/refresh-token');
//             const newAccessToken = data?.accessToken;

//             // // Retry the failed request with new token
//             // error.config.headers['Authorization'] = `Bearer ${newAccessToken}`;
//             // return axiosInstance(error.config);
//         }

//         return Promise.reject(error);
//     }
// );


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
