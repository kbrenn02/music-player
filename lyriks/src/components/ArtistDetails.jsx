import React, { useState, useEffect } from 'react'
import { useGetTopArtistsQuery } from '../redux/services/shazamCore';

const ArtistDetails = ({ artistId }) => {

    // const [cachedData, setCachedData] = useState(null);
    const { data, error, isLoading } = useGetTopArtistsQuery(artistId)//, {
    //     skip: !!cachedData, // Skip query if data is cached
    //     onSuccess: (data) => setCachedData(data) // Cache data on success
    // });

    const [artistData, setArtistData] = useState([]);
  const [errors, setErrors] = useState(null);

  // Function to fetch artist data
  const fetchArtistData = async (artistId) => {
    const url = `https://shazam-core.p.rapidapi.com/v2/artists/details?artist_id=${artistId}`;
  
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'X-RapidAPI-Host': 'shazam-core.p.rapidapi.com',
          'X-RapidAPI-Key': 'c2e5faeed9msh1ed7261b6244abbp1fe90ejsnd83eff727bdf'
        }
      });
  
      if (!response.ok) {
        if (response.status === 429) {
          // Rate limit exceeded, wait before retrying
          console.log('Rate limit exceeded. Retrying in 1 minute...');
          await new Promise(resolve => setTimeout(resolve, 60000)); // wait 1 minute
          return fetchArtistData(artistId); // retry the request
        }
        throw new Error('Network response was not ok');
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching artist data:', error);
    }
  };
  
    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    console.log("Artist data:", data);
    console.log("let's see what this does: ", data[0])

    // const artistData = data?.[0];
  
    return (
        // <img 
        //     // src={artistData?.avatar}
        //     src='https://is1-ssl.mzstatic.com/image/thumb/AMCArtistImages116/v4/40/4f/a3/404fa300-aa60-4df4-93e9-2185ad908e3e/2e085c82-3d10-4317-8624-881ae65d1de7_ami-identity-c7be1fdfd0cd01469ee18105c08f520c-2023-12-08T14-12-23.810Z_cropped.png/440x440bb.jpg' 
        //     alt={artistData?.name || "Artist Image"}
        //     className="bg-red-500"
        //     //rounded-full w-full object-cover
        // />
        <div>
      {error && <p>Error: {error}</p>}
      {artistData.length === 0 && !error && <p>Loading...</p>}
      {artistData.length > 0 && (
        <div>
          <h1>Artist Details</h1>
          <img
            src={artistData[0].attributes.artwork.url}
            alt={artistData[0].attributes.name}
            style={{ width: '200px', height: '200px' }}
          />
          <p>{artistData[0].attributes.name}</p>
        </div>
      )}
    </div>
    )
};

export default ArtistDetails