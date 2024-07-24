import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

export const favSlice = createSlice({
  name: "fav",
  initialState,
  reducers: {
    addToFavList: (state, action) => {
      return [...state, action.payload];
    },
  },
});

export const { addToFavList } = favSlice.actions;

export default favSlice.reducer;
