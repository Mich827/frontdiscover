import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: [],
};

export const likedMoviesSlice = createSlice({
  name: "likedMovies",
  initialState,
  reducers: {
    addMovies: (state, action) => {
      state.value.push(action.payload);
    },
    removeMovies: (state, action) => {
      state.value = state.value.filter((movie) => movie !== action.payload);
    },
    removeAllMovies: (state) => {
      state.value = [];
    },
  },
});

export const { addMovies, removeMovies, removeAllMovies } =
  likedMoviesSlice.actions;
export default likedMoviesSlice.reducer;
