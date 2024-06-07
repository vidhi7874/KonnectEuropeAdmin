import { apiSlice } from "../app/api/apiSlice";
import { API } from "../constants/api.constants";
// credentials

export const adminUserSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    allUsers: builder.mutation({
      query: (params) => ({
        url: API.ADMIN_USER.GET_ALL_USERS,
        method: "GET",
        params: { ...params },
      }),
    }),
    setUserPermission: builder.mutation({
      query: (credentials) => ({
        url: API.ADMIN_USER.GET_USER_PERMISSION,
        method: "POST",
        body: { ...credentials },
      }),
    }),
  }),
});

export const { useAllUsersMutation, useSetUserPermissionMutation } =
  adminUserSlice;
