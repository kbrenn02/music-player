import React from 'react'
import { useGetTopArtistsQuery } from '../redux/services/shazamCore';

const ArtistDetails = ({ artistId }) => {
    const { data, error, isLoading } = useGetTopArtistsQuery(artistId);
  
    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    console.log("Top artist data", data)
  
    return (
        <div>
          <img src={data?.attributes?.artwork?.url} alt={data?.attributes?.name} className="rounded-full w-full object-cover" />
          <h3>{data?.attributes?.name}</h3>
        </div>
      );
  };

export default ArtistDetails