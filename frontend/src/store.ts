import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./userSlice/authSlice";
import { apiSlice } from "./userSlice/apiSlice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        [apiSlice.reducerPath]: apiSlice.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: true,
})