// Main file for API calls

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


export const shazamCoreApiCharts = createApi({
    reducerPath: 'shazamCoreApiCharts',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://shazam-core.p.rapidapi.com/v1',
        prepareHeaders: (headers) => {
            headers.set('x-rapidapi-key', 'c2e5faeed9msh1ed7261b6244abbp1fe90ejsnd83eff727bdf');

            return headers;
        },
    }),
    endpoints: (builder) => ({
        getTopCharts: builder.query({ query: () => '/charts/world?country_code=US' }),
        getSongDetails: builder.query({ query: ({ songid }) => `/tracks/details?track_id=${songid}` }),
    }),
});

export const shazamCoreApiArtists = createApi({
    reducerPath: 'shazamCoreApiArtists',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://shazam-core.p.rapidapi.com/v2',
        prepareHeaders: (headers) => {
            headers.set('x-rapidapi-key', 'c2e5faeed9msh1ed7261b6244abbp1fe90ejsnd83eff727bdf');

            return headers;
        },
    }),
    endpoints: (builder) => ({
        getTopArtists: builder.query({ query: (artistId) => `/artists/details?artist_id=${artistId}`})
    }),
});



export const { useGetTopChartsQuery, useGetSongDetailsQuery } = shazamCoreApiCharts;
export const { useGetTopArtistsQuery } = shazamCoreApiArtists;