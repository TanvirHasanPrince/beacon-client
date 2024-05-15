import { baseApi } from "../api/baseApi";
import { tagTypes } from "../tag-types";

const AUTH_URL = "/auth";

export const authApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    userLogin: build.mutation({
      query: (loginData) => ({
        url: `${AUTH_URL}/signin`,
        method: "POST",
        data: loginData,
      }),
      invalidatesTags: [tagTypes.member],
    }),
  }),
});

export const { useUserLoginMutation } = authApi; 
