// Main file for API calls

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const options = {
    method: 'GET',
    headers: {
      'x-rapidapi-key': 'c2e5faeed9msh1ed7261b6244abbp1fe90ejsnd83eff727bdf',
      'x-rapidapi-host': 'shazam.p.rapidapi.com'
    }
};
  
fetch('https://shazam.p.rapidapi.com/charts/list', options)
    .then(response => response.json())
    .then(response => console.log(response))
    .catch(err => console.error(err));

export const shazamApi = createApi({
    reducerPath: 'shazamApi',
})