import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";

const CONSULTATION_URL = "/consultation";

export const consultationApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    addConsultation: build.mutation({
      query: (data) => ({
        url: `${CONSULTATION_URL}/create-consultation`,
        method: "POST",
        data: data,
      }),
      invalidatesTags: [
        tagTypes.member,
        tagTypes.doctor,
        tagTypes.consultation,
      ],
    }),
    consultations: build.query({
      query: (arg: Record<string, any>) => ({
        url: `${CONSULTATION_URL}`,
        method: "GET",
        params: arg,
      }),
      transformResponse: (response) => {
        return { consultations: response };
      },
      providesTags: [tagTypes.consultation],
    }),
    consultation: build.query({
      query: (id) => ({
        url: `${CONSULTATION_URL}/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.consultation],
    }),
    updateConsultation: build.mutation({
      query: (data) => ({
        url: `${CONSULTATION_URL}/${data.id}`,
        method: "PATCH",
        data: data.body,
      }),
      invalidatesTags: [tagTypes.consultation],
    }),
    deleteConsultation: build.mutation({
      query: (id) => ({
        url: `${CONSULTATION_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.consultation],
    }),
  }),
});

export const {
  useAddConsultationMutation,
  useConsultationsQuery,
  useConsultationQuery,
  useUpdateConsultationMutation,
  useDeleteConsultationMutation,
} = consultationApi;
