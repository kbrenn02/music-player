// Main file for API calls

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


export const shazamCoreApi = createApi({
    reducerPath: 'shazamCoreApiCharts',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://shazam-core.p.rapidapi.com',
        prepareHeaders: (headers) => {
            headers.set('x-rapidapi-key', 'c2e5faeed9msh1ed7261b6244abbp1fe90ejsnd83eff727bdf');

            return headers;
        },
    }),
    endpoints: (builder) => ({
        getTopCharts: builder.query({ query: () => '/v1/charts/world?country_code=US' }),
        getSongDetails: builder.query({ query: (songid) => `/v2/tracks/details?track_id=${songid}` }),
        getTopArtists: builder.query({ query: (artistId) => `v2/artists/details?artist_id=${artistId}`}),
    }),
});

// export const shazamCoreApiArtists = createApi({
//     reducerPath: 'shazamCoreApiArtists',
//     baseQuery: fetchBaseQuery({
//         baseUrl: 'https://shazam-core.p.rapidapi.com/v2',
//         prepareHeaders: (headers) => {
//             headers.set('x-rapidapi-key', 'c2e5faeed9msh1ed7261b6244abbp1fe90ejsnd83eff727bdf');

//             return headers;
//         },
//     }),
//     endpoints: (builder) => ({
        
//     }),
// });


export const { useGetTopChartsQuery, useGetSongDetailsQuery, useGetTopArtistsQuery } = shazamCoreApiCharts;
// export const { useGetTopArtistsQuery } = shazamCoreApiArtists;