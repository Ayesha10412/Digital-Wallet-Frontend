import { baseApi } from "@/Redux/baseApi";

const transactionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllTransaction: builder.query({
      query: (params) => ({
        url: "/transaction/all",
        method: "GET",
        params,
      }),
      providesTags: ["TRANSACTION"],
    }),
    getAllStatistics: builder.query({
      query: () => ({
        url: "/transaction/statistics",
        method: "GET",
      }),
      providesTags: ["TRANSACTION"],
    }),
  }),
});
export const { useGetAllTransactionQuery, useGetAllStatisticsQuery } =
  transactionApi;
