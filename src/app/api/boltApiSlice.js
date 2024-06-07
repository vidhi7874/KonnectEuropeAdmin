// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// import { setCredentials, logOut } from "../../features/auth/authSlice";
// import { localStorageService } from "../../services/localStorge.service";

// const baseQuery = fetchBaseQuery({
//   baseUrl: process.env.REACT_APP_BOLT_API_BASE_URL,
//   // credentials: "include",
//   mode: "cors",

//   prepareHeaders: (headers, { getState }) => {
//     //   https://bookings.revos.in/company/pricing/all
//     // const token = getState().auth.token;

//     // const token = localStorageService.get("bolt_token");

//     const token_d =
//       "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MzM1MmVjNTc5YzAzZGE5ZjMyYTRlNzUiLCJpYXQiOjE2NzM1OTQ2ODQsImV4cCI6MTY3NjE4NjY4NH0.dJ7ea31WtBUK5dmF6uIbFaAk6U2Fruy-N0tpWL0kjCk";

//     const token = "c84187e90bc5a8";
//     const auth_token =
//       "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MzM1MmVjNTc5YzAzZGE5ZjMyYTRlNzUiLCJpYXQiOjE2NzM1ODk1OTgsImV4cCI6MTY3NjE4MTU5OH0.RBnNJrKDuNUuY5oHAtNT_pBXGdaC1TUEoElUJkoebrU";

//     console.log("api main slice log ---> ", token);
//     if (auth_token && token) {
//       headers.set("authorization", `Bearer ${auth_token}`);
//       headers.set("authorization", `Bearer ${token_d}`);

//       headers.set("token", `${token}`);
//     }

//     return headers;
//   },
// });

// const baseQueryWithReauth = async (args, api, extraOptions) => {
//   let result = await baseQuery(args, api, extraOptions);
//   console.log("baseQueryWithReauth bolt --> ", result);

//   if (result?.error?.originalStatus === 403) {
//     console.log("sending refresh token");
//     // send refresh token to get new access token
//     const refreshResult = await baseQuery("/refresh", api, extraOptions);
//     console.log(refreshResult);
//     if (refreshResult?.data) {
//       const user = api.getState().auth.user;
//       // store the new token
//       api.dispatch(setCredentials({ ...refreshResult.data, user }));
//       // retry the original query with new access token
//       result = await baseQuery(args, api, extraOptions);
//     } else {
//       api.dispatch(logOut());
//     }
//   }

//   return result;
// };

// export const boltApiSlice = createApi({
//   baseQuery: baseQueryWithReauth,
//   endpoints: (builder) => ({}),
// });

import axios from "axios";
import { localStorageService } from "../../services/localStorge.service";

const Axios = axios.create({
  baseURL: process.env.REACT_APP_BOLT_API_BASE_URL,
});

// if (
//   typeof window !== "undefined" &&
//   localStorageService.get("userDetails")?.user_details
// ) {
//   var { token } = localStorageService.get("userDetails")?.user_details;
// }

console.log(
  "process.env.REACT_APP_BOLT_API_BASE_URL",
  process.env.REACT_APP_BOLT_API_BASE_URL
);

const token_d =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MzM1MmVjNTc5YzAzZGE5ZjMyYTRlNzUiLCJpYXQiOjE2NzM1OTQ2ODQsImV4cCI6MTY3NjE4NjY4NH0.dJ7ea31WtBUK5dmF6uIbFaAk6U2Fruy-N0tpWL0kjCk";

const token = "c84187e90bc5a8";
const auth_token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MzM1MmVjNTc5YzAzZGE5ZjMyYTRlNzUiLCJpYXQiOjE2NzM1ODk1OTgsImV4cCI6MTY3NjE4MTU5OH0.RBnNJrKDuNUuY5oHAtNT_pBXGdaC1TUEoElUJkoebrU";

if (token) {
  console.log("index alerte in intersepter");
  Axios.interceptors.request.use((value) => {
    value.headers = {
      authorization: `Bearer ${auth_token}`,
      authorization: `Bearer ${token_d}`,
      token: `${token}`,
    };
    return value;
  });
}

export default Axios;
