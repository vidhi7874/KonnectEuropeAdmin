import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setCredentials, logOut } from "../../features/auth/authSlice";
import { localStorageService } from "../../services/localStorge.service";

const baseQuery = fetchBaseQuery({
  // baseUrl: "http://13.234.172.231/",
  baseUrl: "http://192.168.0.124:8000/",
  // baseUrl: "http://192.168.0.53:8000/",

  // baseUrl: process.env.REACT_APP_API_BASE_URL_LOCAL,
  // credentials: "include",
  mode: "cors",

  prepareHeaders: (headers, { getState }) => {
    // const token = getState().auth.token;
    const token = localStorageService.get("KE_ADMIN")?.token;

    //  const token = localStorageService.get("KE_ADMIN").token;
    console.log("api main slice log ---> ", token);
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result?.error?.originalStatus === 403) {
    console.log("sending refresh token");
    // send refresh token to get new access token
    const refreshResult = await baseQuery("/refresh", api, extraOptions);
    console.log(refreshResult);
    if (refreshResult?.data) {
      const user = api.getState().auth.user;
      // store the new token
      api.dispatch(setCredentials({ ...refreshResult.data, user }));
      // retry the original query with new access token
      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(logOut());
    }
  }

  return result;
};

export const apiSlice = createApi({
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({}),
});
