import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// ✅ Thunk to add a vehicle
export const addVehicle = createAsyncThunk("vehicle/addVehicle", async (vehicle, { getState }) => {
  const { vehicles } = getState().vehicle;
  return [...vehicles, vehicle]; // Add new vehicle to the list
});

// ✅ Thunk to remove a vehicle
export const removeVehicle = createAsyncThunk("vehicle/removeVehicle", async (plateNumber, { getState }) => {
  const { vehicles } = getState().vehicle;
  return vehicles.filter(vehicle => vehicle.plateNumber !== plateNumber);
});

// ✅ Initial state
const initialState = {
  vehicles: JSON.parse(localStorage.getItem("vehicles")) || [], // Load from storage
};

const vehicleSlice = createSlice({
  name: "vehicle",
  initialState,
  reducers: {
    setVehicles: (state, action) => {
      state.vehicles = action.payload;
      localStorage.setItem("vehicles", JSON.stringify(action.payload)); // Persist
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addVehicle.fulfilled, (state, action) => {
      state.vehicles = action.payload;
      localStorage.setItem("vehicles", JSON.stringify(action.payload));
    });
    builder.addCase(removeVehicle.fulfilled, (state, action) => {
      state.vehicles = action.payload;
      localStorage.setItem("vehicles", JSON.stringify(action.payload));
    });
  },
});

export const { setVehicles } = vehicleSlice.actions;
export default vehicleSlice.reducer;
