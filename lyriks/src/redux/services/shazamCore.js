// Main file for API calls

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


export const shazamCoreApi = createApi({
    reducerPath: 'shazamCoreApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://shazam-core.p.rapidapi.com',
        prepareHeaders: (headers) => {
            headers.set('x-rapidapi-key', 'c2e5faeed9msh1ed7261b6244abbp1fe90ejsnd83eff727bdf');

            return headers;
        },
    }),
    endpoints: (builder) => ({
        getTopCharts: builder.query({ query: () => '/v1/charts/world?country_code=US' }),
        getSongsByGenre: builder.query({ query: (genre) => `/v1/charts/genre-world?genre_code=${genre}&country_code=US`}),
        getSongDetails: builder.query({ query: (songid) => `/v2/tracks/details?track_id=${songid}` }),
        getArtistDetails: builder.query({ query: (artistId) => `/v2/artists/details?artist_id=${artistId}` }),
        getSongRelated: builder.query({ query: (songid) => `/v2/tracks/details?track_id=${songid}` }),
        getSongsByCountry: builder.query({ query: (countryCode) => `/v1/charts/country?country_code=${countryCode}` }),
        getSongsBySearch: builder.query({ query: (searchTerm) => `/v1/search/multi?query=${searchTerm}&search_type=SONGS_ARTISTS&offset=0`} ),
    }),
});


export const { 
    useGetTopChartsQuery,
    useGetSongsByGenreQuery,
    useGetSongDetailsQuery, 
    useGetArtistDetailsQuery,
    useGetSongRelatedQuery,
    useGetSongsByCountryQuery,
    useGetSongsBySearchQuery,
} = shazamCoreApi;