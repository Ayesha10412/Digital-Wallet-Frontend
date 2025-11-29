import { baseApi } from "../../baseApi";

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    userInfo: builder.query({
      query: () => ({
        url: "/user/me",
        method: "GET",
      }),
      providesTags: ["USER"],
    }),
    allUsers: builder.query({
      query: () => ({
        url: "/user/all-users",
        method: "GET",
      }),
      providesTags: ["USER"],
    }),
    updateInfo: builder.mutation({
      query: (data) => ({
        url: "/user/me",
        method: "PATCH",
        data: data,
      }),
      invalidatesTags: ["USER"],
    }),
     updateUserInfo: builder.mutation({
      query: ({id,payload}) => ({
        url: `/user/${id}`,
        method: "PATCH",
        data:payload,
      }),
      invalidatesTags: ["USER"],
    }),
  }),
});
export const { useAllUsersQuery, useUserInfoQuery, useUpdateInfoMutation,useUpdateUserInfoMutation } =
  userApi;
