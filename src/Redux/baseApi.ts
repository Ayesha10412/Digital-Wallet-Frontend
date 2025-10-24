// Need to use the React-specific entry point to import createApi
import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "./axiosbaseQuery";

// Define a service using a base URL and expected endpoints
export const baseApi = createApi({
  reducerPath: "pokemonApi",
  baseQuery: axiosBaseQuery(),
  tagTypes: ["USER","WALLET"],
  endpoints: () => ({}),
});
