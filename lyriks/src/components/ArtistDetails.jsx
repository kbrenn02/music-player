import React, { useState } from 'react'
import { useGetTopArtistsQuery } from '../redux/services/shazamCore';

const ArtistDetails = ({ artistId }) => {

    const [cachedData, setCachedData] = useState(null);
    const { data, error, isLoading } = useGetTopArtistsQuery(artistId, {
        skip: !!cachedData, // Skip query if data is cached
        onSuccess: (data) => setCachedData(data) // Cache data on success
    });
  
    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    console.log("Artist data:", data);
  
    return (
        <img 
            src={data?.attributes?.artwork?.url} 
            alt={data?.attributes?.name} 
            className="rounded-full w-full object-cover"
        />
    )
};

export default ArtistDetails