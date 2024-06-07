import { apiSlice } from "../app/api/apiSlice";
import { API } from "../constants/api.constants";

export const travelAgentSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    allAgents: builder.mutation({
      query: (params) => ({
        url: API.TRAVEL_AGENT_LIST.GET,
        method: "GET",
        params: { ...params },
      }),
    }),
    addAgent: builder.mutation({
      query: (data) => ({
        url: API.TRAVEL_AGENT_LIST.POST,
        method: "POST",
        body: data,
      }),
    }),
    getAgentById: builder.mutation({
      query: (id) => ({
        url: `${API.TRAVEL_AGENT_LIST.GET}${id}/`,
        method: "GET",
      }),
    }),
    editAgent: builder.mutation({
      query: (data) => {
        console.log("editAgent !!!!!!!!!!!!!!!! --> ", data);
        return {
          url: `${API.TRAVEL_AGENT_LIST.PUT}${data.id}/`,
          method: "PUT",
          body: data.formData,
        };
      },
    }),
  }),
});

export const {
  useAllAgentsMutation,
  useAddAgentMutation,
  useEditAgentMutation,
  useGetAgentByIdMutation,
} = travelAgentSlice;
