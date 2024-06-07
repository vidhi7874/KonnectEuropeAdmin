import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./api/apiSlice";
//import { boltApiSlice } from "./api/boltApiSlice";
import authReducer from "../features/auth/authSlice";
import attractionPackageSlice from "../features/attractionPackage.slice";

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    //   [boltApiSlice.reducerPath]: boltApiSlice.reducer,
    auth: authReducer,
    attractionPackageReducer: attractionPackageSlice,
  },
  middleware: (getDefaultMiddleware) => {
    const midd = getDefaultMiddleware().concat(apiSlice?.middleware);
    console.log("middleware form store.js -->", midd);
    return midd;
  },
  devTools: true,
  // devTools: process.env.NODE_ENV !== "production",
});

// middleware: (getDefaultMiddleware) =>
// getDefaultMiddleware({
//   thunk: {
//     extraArgument: myCustomApiService,
//   },
//   serializableCheck: false,
// }),
