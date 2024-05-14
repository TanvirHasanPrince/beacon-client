import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";

const MEMBER_URL = "/member";

export const memberApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    addMember: build.mutation({
      query: (data) => ({
        url: `${MEMBER_URL}/create-member`,
        method: "POST",
        data: data,
      }),

      invalidatesTags: [tagTypes.member],
    }),
    members: build.query({
      query: (arg: Record<string, any>) => ({
        url: `${MEMBER_URL}`,
        method: "GET",
        params: arg,
      }),
      transformResponse: (response) => {
        return {
          members: response,
        };
      },
      providesTags: [tagTypes.member],
    }),
    member: build.query({
      query: (id) => ({
        url: `${MEMBER_URL}/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.member],
    }),
    updateMember: build.mutation({
      query: (data) => ({
        url: `${MEMBER_URL}/${data.id}`,
        method: "PATCH",
        data: data.body,
      }),
      invalidatesTags: [tagTypes.member],
    }),
    deleteMember: build.mutation({
      query: (id) => ({
        url: `${MEMBER_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.member],
    }),
  }),
});

export const {
  useAddMemberMutation,
  useMembersQuery,
  useMemberQuery,
  useUpdateMemberMutation,
  useDeleteMemberMutation,
} = memberApi;
