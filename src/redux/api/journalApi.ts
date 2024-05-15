import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";

const JOURNAL_URL = "/journal";

export const journalApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    addJournalEntry: build.mutation({
      query: (data) => ({
        url: `${JOURNAL_URL}/create-journal`,
        method: "POST",
        data: data,
      }),
      invalidatesTags: [tagTypes.member],
    }),
    journalEntries: build.query({
      query: (arg: Record<string, any>) => ({
        url: `${JOURNAL_URL}`,
        method: "GET",
        params: arg,
      }),
      transformResponse: (response) => {
        return {
          journalEntries: response,
        };
      },
      providesTags: [tagTypes.journal],
    }),
    journalEntry: build.query({
      query: (id) => ({
        url: `${JOURNAL_URL}/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.journal],
    }),
    updateJournalEntry: build.mutation({
      query: (data) => ({
        url: `${JOURNAL_URL}/${data.id}`,
        method: "PATCH",
        data: data.body,
      }),
      invalidatesTags: [tagTypes.journal],
    }),
    deleteJournalEntry: build.mutation({
      query: (id) => ({
        url: `${JOURNAL_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.journal],
    }),
  }),
});

export const {
  useAddJournalEntryMutation,
  useJournalEntriesQuery,
  useJournalEntryQuery,
  useUpdateJournalEntryMutation,
  useDeleteJournalEntryMutation,
} = journalApi;
