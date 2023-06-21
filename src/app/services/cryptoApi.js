// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
//
// // const cryptoApiHeaders = {
// //   "X-RapidAPI-Key": "eb71184572msh8f332283060f7cbp1f341fjsnc4685458b6c2",
// //   "X-RapidAPI-Host": "https://coinranking1.p.rapidapi.com",
// // };
//
// // const baseUrl = "https://api.coinranking.com/v2";
//
// // const createRequest = (url) => ({ url, headers: cryptoApiHeaders });
// process.env.REACT_APP_CRYPTO_URL = "https://coinranking1.p.rapidapi.com";
// process.env.REACT_APP_CRYPTO_KEY =
//   "eb71184572msh8f332283060f7cbp1f341fjsnc4685458b6c2";
// process.env.REACT_APP_CRYPTO_HOST = "coinranking1.p.rapidapi.com";
//
// export const cryptoApi = createApi({
//   reducerPath: "cryptoApi",
//   baseQuery: fetchBaseQuery({
//     baseUrl: process.env.REACT_APP_CRYPTO_URL,
//     prepareHeaders: (headers) => {
//       headers.set("X-RapidAPI-Key", process.env.REACT_APP_CRYPTO_KEY);
//       headers.set("X-RapidAPI-Host", process.env.REACT_APP_CRYPTO_HOST);
//       // header.set(
//       //   "x-access-token",
//       //   "coinranking21292cbb5e73cd72f912fab5b762129de649b0013c285868"
//       // );
//       return headers;
//     },
//   }),
//   endpoints: (builder) => {
//     getCryptos: builder.query({
//       query: () => "/reference-currencies?limit=10",
//     });
//   },
// });
//
// export const { useGetCryptosQuery } = cryptoApi;
