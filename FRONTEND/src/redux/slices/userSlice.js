import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// ✅ Thunk to update profile picture in Redux
export const updateProfilePicture = createAsyncThunk(
  "user/updateProfilePicture",
  async (profilePicture, { getState }) => {
    const { user } = getState().user;
    return { ...user, profilePicture}; // Update only image field
  }
);
export const updateProfile = createAsyncThunk(
  "user/updateProfile",
  async ({ field, value }, { getState }) => {
    const { user } = getState().user;
    console.log("inside thunk",field,value)
    let updatedUser = { ...user, [field]: value };
    return updatedUser;
  }
);




const initialState = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  accessToken: localStorage.getItem("accessToken") || null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      console.log("Setting user in Redux:", action.payload);
      state.user = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload)); // Persist user
    },
    setAccessToken: (state, action) => {
      console.log("Setting access token:", action.payload);
      state.accessToken = action.payload;
      localStorage.setItem("accessToken", action.payload); // Persist token
    },
    logoutUser: (state) => {
      console.log("Logging out user");
      state.user = null;
      state.accessToken = null;
      localStorage.removeItem("user");
      localStorage.removeItem("accessToken"); // Clear storage on logout
    },
  },
  extraReducers: (builder) => { // ✅ Move this outside reducers
    builder.addCase(updateProfilePicture.fulfilled, (state, action) => {
      console.log("Updating user profile picture in Redux:", action.payload);
      state.user = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload)); // Persist update
    });
    builder.addCase(updateProfile.fulfilled, (state, action) => {
      console.log("Updating user profile in Redux:", action.payload);
  
      // ✅ Merge only the updated field
      state.user = { ...state.user, ...action.payload };
  
      // ✅ Persist the updated state
      localStorage.setItem("user", JSON.stringify(state.user));
    });
  },
});

export const { setUser, logoutUser, setAccessToken } = userSlice.actions;
export default userSlice.reducer;
