import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  accessToken: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      console.log("Setting user in Redux:", action.payload); // Debugging log
      state.user = action.payload.user;
      state.accessToken = action.payload.accessToken;
    },
    setAccessToken: (state, action) => {
      console.log("Setting access token:", action.payload); // Debugging log
      state.accessToken = action.payload;
    },
    logoutUser: (state) => {
      console.log("Logging out user");
      state.user = null;
      state.accessToken = null;
    },
  },
});

export const { setUser, logoutUser, setAccessToken } = userSlice.actions;
export default userSlice.reducer;
