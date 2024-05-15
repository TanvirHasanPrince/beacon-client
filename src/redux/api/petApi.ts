import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";

const PET_URL = "/pet";

export const petApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    addPet: build.mutation({
      query: (data) => ({
        url: `${PET_URL}/create-pet`,
        method: "POST",
        data: data,
      }),
      invalidatesTags: [tagTypes.member],
    }),
    pets: build.query({
      query: (arg: Record<string, any>) => ({
        url: `${PET_URL}`,
        method: "GET",
        params: arg,
      }),
      transformResponse: (response) => {
        return {
          pets: response,
        };
      },
      providesTags: [tagTypes.pet],
    }),
    pet: build.query({
      query: (id) => ({
        url: `${PET_URL}/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.pet],
    }),
    updatePet: build.mutation({
      query: (data) => ({
        url: `${PET_URL}/${data.id}`,
        method: "PATCH",
        data: data.body,
      }),
      invalidatesTags: [tagTypes.pet],
    }),
    deletePet: build.mutation({
      query: (id) => ({
        url: `${PET_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.pet],
    }),
  }),
});

export const {
  useAddPetMutation,
  usePetsQuery,
  usePetQuery,
  useUpdatePetMutation,
  useDeletePetMutation,
} = petApi;
