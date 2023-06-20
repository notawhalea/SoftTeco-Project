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
    baseUrl: "https://coinranking1.p.rapidapi.com",
    prepareHeaders: (header) => {
      header.set("X-RapidAPI-Host", "coinranking1.p.rapidapi.com");
      header.set(
        "X-RapidAPI-Key",
        "7d453acff4msh6276223c5675ac2p10c93ejsn2ead53f34641"
      );
      // header.set(
      //   "x-access-token",
      //   "coinranking21292cbb5e73cd72f912fab5b762129de649b0013c285868"
      // );
      return header;
    },
  }),
  endpoints: (builder) => {
    getCryptos: builder.query({
      query: () => "/reference-currencies?limit=10",
    });
  },
});

export const { useGetCryptosQuery } = cryptoApi;
