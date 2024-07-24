import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducers/userSlice.js";
import favReducer from "./reducers/favSlice.js";
import budgetReducer from "./reducers/budgetSlice.js";

export const store = configureStore({
  reducer: {
    user: userReducer,
    fav: favReducer,
    budget: budgetReducer,
  },
});
