// src/store/index.ts
import { configureStore } from "@reduxjs/toolkit";
import restaurantsReducer from "./restaurantsSlice";
import usersReducer from "./usersSlice";

export const store = configureStore({
  reducer: {
    restaurants: restaurantsReducer,
    users: usersReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
