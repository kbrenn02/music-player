import React from 'react'
import { useGetTopArtistsQuery } from '../redux/services/shazamCore';

const ArtistDetails = ({ artistId }) => {
    const { data, error, isLoading } = useGetArtistDetailsQuery(artistId);
  
    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;
  
    return {data}
  };

export default ArtistDetails