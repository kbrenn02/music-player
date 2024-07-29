import React, { useState, useEffect } from 'react'
// import { useGetTopArtistsQuery } from '../redux/services/shazamCore';

const ArtistDetails = ({ artistId, i }) => {

    const [retry, setRetry] = useState(0);
    const [loadedImages, setLoadedImages] = useState([]);

    // const { data, error, isLoading } = useGetTopArtistsQuery(artistId);

    // Retry fetching data every 3 seconds if there is an error
    useEffect(() => {
        if (error) {
        const timer = setTimeout(() => {
            setRetry((prevRetry) => prevRetry + 1);
        }, 3000);

        // Cleanup timer on component unmount
        return () => clearTimeout(timer);
        }
    }, [error, retry]);

    // Handle image loading success
    const handleImageLoad = (index) => {
        setLoadedImages((prevLoadedImages) => {
        const newLoadedImages = [...prevLoadedImages];
        newLoadedImages[index] = true;
        return newLoadedImages;
        });
    };

    // Initialize loadedImages state based on the number of artists
    useEffect(() => {
        if (data && data.data) {
        setLoadedImages(new Array(data.data.length).fill(false));
        }
    }, [data]);

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Loading....</div>;

    console.log("Artist data:", data);
    console.log("let's see what this does: ", data.data[0])
  
    return (
        <img 
            src={data?.data[0]?.avatar}
            alt={data?.data[0]?.name || "Artist Image"}
            className="rounded-full w-full object-cover"
            onLoad={() => handleImageLoad(i)}
            onError={() => handleImageLoad(i)}
        />
    )
};

export default ArtistDetails