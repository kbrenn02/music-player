// Main file for API calls

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


export const shazamCoreApiCharts = createApi({
    reducerPath: 'shazamApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://shazam-core.p.rapidapi.com/v1',
        prepareHeaders: (headers) => {
            headers.set('x-rapidapi-key', 'c2e5faeed9msh1ed7261b6244abbp1fe90ejsnd83eff727bdf');

            return headers;
        },
    }),
    endpoints: (builder) => ({
        getTopCharts: builder.query({ query: () => '/charts/world?country_code=US' })
    }),
});

export const {
    useGetTopChartsQuery,
} = shazamCoreApiCharts;


export const shazamCoreApiArtists = createApi({
    reducerPath: 'shazamApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://shazam-core.p.rapidapi.com/v2',
        prepareHeaders: (headers) => {
            headers.set('x-rapidapi-key', 'c2e5faeed9msh1ed7261b6244abbp1fe90ejsnd83eff727bdf');

            return headers;
        },
    }),
    endpoints: (builder) => ({
        getTopArtists: builder.query({ query: () => `/artists/details?artist_id=${artistId}`})
    }),
});

export const {
    useGetTopArtistsQuery,
} = shazamCoreApiArtists;


// export const options = {
//     method: 'GET',
//     headers: {
//       'x-rapidapi-host': 'shazam-core.p.rapidapi.com',
//       'x-rapidapi-key': 'c2e5faeed9msh1ed7261b6244abbp1fe90ejsnd83eff727bdf'
//     }
//   };
  
//   fetch('https://shazam-core.p.rapidapi.com/v2/artists/details?artist_id={', options)
//     .then(response => response.json())
//     .then(response => console.log(response))
//     .catch(err => console.error(err));