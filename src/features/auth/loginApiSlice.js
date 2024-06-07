import { apiSlice } from "../../app/api/apiSlice";
import { API } from "../../constants/api.constants";

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: API.LOGIN,
        method: "POST",
        body: credentials ,
      }),
    }),
  }),
});

export const { useLoginMutation } = authApiSlice;
