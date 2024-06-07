import { apiSlice } from "../app/api/apiSlice";
import { API } from "../constants/api.constants";

export const reportsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getMasterSalesReport: builder.mutation({
      query: (pagination) => ({
        url: API.REPORTS.MASTER_SALES_REPORT,
        method: "GET",
        params: { ...pagination },
      }),
    }),
    getMasterTravelReport: builder.mutation({
      query: (pagination) => ({
        url: API.REPORTS.MASTER_TRAVEL_REPORT,
        method: "GET",
        params: { ...pagination },
      }),
    }),
  }),
});

export const {
  useGetMasterSalesReportMutation,
  useGetMasterTravelReportMutation,
} = reportsApiSlice;
