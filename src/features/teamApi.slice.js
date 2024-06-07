import { apiSlice } from "../app/api/apiSlice";
import { API } from "../constants/api.constants";

export const teamSliceApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getSalesSupportList: builder.mutation({
      query: (pagination) => ({
        url: API.TEAM.SALES_SUPPORTS,
        method: "GET",
        params: { ...pagination },
      }),
    }),
  }),
});

export const { useGetSalesSupportListMutation } = teamSliceApi;
