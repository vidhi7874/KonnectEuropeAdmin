import { apiSlice } from "../app/api/apiSlice";
import { API } from "../constants/api.constants";

export const holidayPackageApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    allHolidayPackage: builder.mutation({
      query: (params) => ({
        url: API.HOLIDAY_PACKAGE_LIST.GET,
        method: "GET",
        params: { ...params },
      }),
    }),
    getHolidayPackageById: builder.mutation({
      query: (id) => ({
        url: `${API.HOLIDAY_PACKAGE_LIST.GET}${id}`,
        method: "GET",
      }),
    }),
    uploadImage: builder.mutation({
      query: (data) => ({
        url: API.HOLIDAY_PACKAGE_LIST.IMG_UPLOAD,
        method: "POST",
        body: data,
      }),
    }),
    createHolidayPackage: builder.mutation({
      query: (data) => ({
        url: API.HOLIDAY_PACKAGE_LIST.CREATE_PACKAGE,
        method: "POST",
        body: data,
      }),
    }),
    getAllCountries: builder.mutation({
      query: () => ({
        url: API.GET_COUNTRY,
        method: "GET",
      }),
    }),
    getAllCites: builder.mutation({
      query: (params) => ({
        url: API.GET_CITY,
        method: "GET",
        params: { ...params },
      }),
    }),

    // /package/admin_packages/{id}/
  }),
});

export const {
  useAllHolidayPackageMutation,
  useUploadImageMutation,
  useCreateHolidayPackageMutation,
  useGetAllCountriesMutation,
  useGetAllCitesMutation,
  useGetHolidayPackageByIdMutation,
} = holidayPackageApiSlice;
