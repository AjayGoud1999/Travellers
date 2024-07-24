import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  budget: 0,
};

export const budgetSlice = createSlice({
  name: "budget",
  initialState,
  reducers: {
    addBudget: (state, action) => {
      return {
        ...state,
        budget: state.budget + Number(action.payload),
      };
    },
    clearBudget: (state, action) => {
      return {
        ...state,
        ...initialState,
      };
    },
  },
});

export const { addBudget, clearBudget } = budgetSlice.actions;

export default budgetSlice.reducer;
