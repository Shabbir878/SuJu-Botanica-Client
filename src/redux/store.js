import { configureStore } from "@reduxjs/toolkit";
import { baseApi } from "./api/api";

export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Disable serializable check
    }).concat(baseApi.middleware),
});
