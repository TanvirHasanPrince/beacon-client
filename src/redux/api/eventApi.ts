import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";

const EVENT_URL = "/event";

export const eventApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    addEvent: build.mutation({
      query: (data) => ({
        url: `${EVENT_URL}/create-event`,
        method: "POST",
        data: data,
      }),
      invalidatesTags: [tagTypes.member],
    }),
    events: build.query({
      query: (arg: Record<string, any>) => ({
        url: `${EVENT_URL}`,
        method: "GET",
        params: arg,
      }),
      transformResponse: (response) => {
        return {
          events: response,
        };
      },
      providesTags: [tagTypes.event],
    }),
    event: build.query({
      query: (id) => ({
        url: `${EVENT_URL}/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.event],
    }),
    updateEvent: build.mutation({
      query: (data) => ({
        url: `${EVENT_URL}/${data.id}`,
        method: "PATCH",
        data: data.body,
      }),
      invalidatesTags: [tagTypes.event],
    }),
    deleteEvent: build.mutation({
      query: (id) => ({
        url: `${EVENT_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.event],
    }),
  }),
});

export const {
  useAddEventMutation,
  useEventsQuery,
  useEventQuery,
  useUpdateEventMutation,
  useDeleteEventMutation,
} = eventApi;
