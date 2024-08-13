import { Link } from 'react-router-dom'
// import { useState, useEffect } from 'react'
// import ArtistDetails from './ArtistDetails';


const DetailsHeader = ({ artistId, artistData, songData }) => {

    console.log('artistid in detailsheader', artistId)
    // console.log('songid in detailsheader', songId)
    console.log('detailsheader song data', songData)
    const songId = Object.keys(songData?.resources['shazam-songs'])[0]; // Get the first artist ID
    const songAttributes = songData?.resources['shazam-songs'][songId]?.attributes;
    console.log('attributes', songAttributes)
   

    return (
        <div className='relative w-full flex flex-col'>
            <div className='w-full bg-gradient-to-l from-transparent to-black sm:h-48 h-28'/>
            
            <div className='absolute inset-0 flex items-center'>
                <img 
                    alt='art'
                    // Fix this: show the artist image or the song cover art. No errors but not showing artist avatar
                    src={artistId ? artistData?.attributes?.artwork?.url
                        .replace('{w}', '500')
                        .replace('{h}', '500') 
                        : songAttributes?.images?.artistAvatar}
                    className='sm:w-48 w-28 sm:h-48 h-28 rounded-full object-cover border-2 shadow-xl shadow-black'
                />

                <div className="ml-5 w-full h-full">
                    {/* Fix this: should be showing the artist name. If it doesn't, it should show the song title. Messed with sizing here and it still doesnt show. */}
                    <p className='font-bold h-full sm:text-3xl text-xl text-white'>{artistId ? artistData?.name : songAttributes?.artist}</p>
                    {!artistId && (
                        <Link to={`/artists/${artistId}`}>
                            {/* Fix this: This should show the artist name */}
                            <p className='text-base text-gray-400 mt-2'>{songAttributes?.artist}</p>
                        </Link>
                    )}

                    <p className='text-base text-gray-400 mt-2'>
                        {/* Fix this: This should show the artist genre or the song genre */}
                        {artistId
                          ? artistData?.genreNames[0]
                          : songAttributes?.genres?.primary}
                    </p>
                </div>
            </div>

            <div className='w-full sm:h-44 h-24'/>
        </div>
    )
};

export default DetailsHeader;
