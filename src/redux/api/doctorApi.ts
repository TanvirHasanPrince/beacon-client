import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";

const DOCTOR_URL = "/doctor";

export const doctorApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    addDoctor: build.mutation({
      query: (data) => ({
        url: `${DOCTOR_URL}/create-doctor`,
        method: "POST",
        data: data,
      }),
      invalidatesTags: [tagTypes.doctor],
    }),
    doctors: build.query({
      query: (arg: Record<string, any>) => ({
        url: `${DOCTOR_URL}`,
        method: "GET",
        params: arg,
      }),
      // transformResponse: (response) => {
      //   return {
      //     doctors: response,
      //   };
      // },
      providesTags: [tagTypes.doctor],
    }),
    doctor: build.query({
      query: (id) => ({
        url: `${DOCTOR_URL}/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.doctor],
    }),
    updateDoctor: build.mutation({
      query: (data) => ({
        url: `${DOCTOR_URL}/${data.id}`,
        method: "PATCH",
        data: data.body,
      }),
      invalidatesTags: [tagTypes.doctor],
    }),
    deleteDoctor: build.mutation({
      query: (id) => ({
        url: `${DOCTOR_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.doctor],
    }),
  }),
});

export const {
  useAddDoctorMutation,
  useDoctorsQuery,
  useDoctorQuery,
  useUpdateDoctorMutation,
  useDeleteDoctorMutation,
} = doctorApi;
