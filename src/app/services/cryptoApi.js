import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// const cryptoApiHeaders = {
//   "X-RapidAPI-Key": "eb71184572msh8f332283060f7cbp1f341fjsnc4685458b6c2",
//   "X-RapidAPI-Host": "https://coinranking1.p.rapidapi.com",
// };

// const baseUrl = "https://api.coinranking.com/v2";

// const createRequest = (url) => ({ url, headers: cryptoApiHeaders });

export const cryptoApi = createApi({
  reducerPath: "cryptoApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://moviesdatabase.p.rapidapi.com",
    prepareHeaders: (header) => {
      header.set("X-RapidAPI-Host", "moviesdatabase.p.rapidapi.com");
      header.set(
        "X-RapidAPI-Key",
        "eb71184572msh8f332283060f7cbp1f341fjsnc4685458b6c2"
      );
      return header;
    },
  }),
  endpoints: (builder) => {
    getCryptos: builder.query({
      query: () => `/actors/random`,
    });
  },
});

export const { useGetCryptosQuery } = cryptoApi;
