// src/store/index.ts
import { configureStore } from "@reduxjs/toolkit";
import restaurantsReducer from "./restaurantsSlice";

export const store = configureStore({
  reducer: {
    restaurants: restaurantsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
