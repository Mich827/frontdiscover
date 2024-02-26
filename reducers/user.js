import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {
    token: null,
    username: null,
    email: null,
    addHasAlreadyOpenApp: false,
  },
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUserToStore: (state, action) => {
      state.value.token = action.payload.token;
      state.value.username = action.payload.username;
      state.value.email = action.payload.email;
    },
    removeUserToStore: (state, action) => {
      state.value.token = null;
      state.value.username = null;
      state.value.email = null;
    },
    //meteo
    addWeatherToStore: (state, action) => {
      state.value.cityName = action.payload.cityName;
      state.value.description = action.payload.description;
      state.value.temp = action.payload.temp;
      state.value.tempMax = action.payload.tempMax;
      state.value.tempMin = action.payload.tempMin;
    },
    removeWeatherToStore: (state, action) => {
      state.value.cityName = null;
      state.value.description = null;
      state.value.temp = null;
      state.value.tempMax = null;
      state.value.tempMin = null;
    },
    addHasAlreadyOpenApp: (state, action) => {
      state.value.addHasAlreadyOpenApp = true;
    },
  },
});

export const {
  addUserToStore,
  removeUserToStore,
  addWeatherToStore,
  removeWeatherToStore,
  addHasAlreadyOpenApp,
} = userSlice.actions;
export default userSlice.reducer;
