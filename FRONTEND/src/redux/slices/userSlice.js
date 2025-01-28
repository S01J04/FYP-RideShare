// userSlice.js

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: JSON.parse(localStorage.getItem("user")) || null, // Retrieve user data from localStorage if available
  accessToken: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload.user;
    },
    setAccessToken: (state, action) => {
      state.accessToken = action.payload;
    },
    logoutUser: (state) => {
      state.user = null; // Clear the user data from the state
    },
  },
});

export const { setUser, logoutUser , setAccessToken } = userSlice.actions;

export default userSlice.reducer;
