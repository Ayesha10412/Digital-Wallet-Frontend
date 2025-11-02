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
    withdrawMoney: builder.mutation({
      query: (data) => ({
        url: "/wallet/withdraw",
        method: "POST",
        data,
      }),
      invalidatesTags: ["WALLET"],
    }),
    sendMoney: builder.mutation({
      query: (data) => ({
        url: "/wallet/send",
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
    recipients: builder.query({
      query: () => ({
        url: "/wallet/recipients",
        method: "GET",
      }),
      providesTags: ["WALLET"],
    }),
  }),
});
export const {
  useCashInMutation,
  useCashOutMutation,
  useAddMoneyMutation,
  useWithdrawMoneyMutation,
  useSendMoneyMutation,
  useRecipientsQuery,
} = walletApi;
