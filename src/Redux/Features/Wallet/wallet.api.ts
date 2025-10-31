import { baseApi } from "@/Redux/baseApi";

const walletApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    cashIn: builder.mutation({
      query: (data) => ({
        url: "/wallet/cash-in",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["WALLET"],
    }),
    addMoney: builder.mutation({
      query: (data) => ({
        url: "/wallet/deposit",
        method: "POST",
        data,
      }),
      invalidatesTags: ["WALLET"],
    }),
    cashOut: builder.mutation({
      query: (data) => ({
        url: "/wallet/cash-out",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["WALLET"],
    }),
  }),
});
export const { useCashInMutation, useCashOutMutation, useAddMoneyMutation } =
  walletApi;
