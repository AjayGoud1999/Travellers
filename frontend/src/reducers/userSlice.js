import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  username: "",
  isAdmin: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addCurrentUser: (state, action) => {
      return {
        ...state,
        username: action.payload.username,
        isAdmin: action.payload.isAdmin,
      };
    },
    setIntialState: (state, action) => {
      return {
        ...state,
        username: "",
        isAdmin: false,
      };
    },
  },
});

export const { addCurrentUser, setIntialState } = userSlice.actions;

export default userSlice.reducer;
