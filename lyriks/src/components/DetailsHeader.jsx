import { Link } from 'react-router-dom'
// import { useState, useEffect } from 'react'
// import ArtistDetails from './ArtistDetails';


const DetailsHeader = ({ artistId, artistData, songData }) => {

    console.log('artistid in detailsheader', artistId)
    console.log('detailsheader song data', songData)
   

    return (
        <div className='relative w-full flex flex-col'>
            <div className='w-full bg-gradient-to-l from-transparent to-black sm:h-48 h-28'/>
            
            <div className='absolute inset-0 flex items-center'>
                <img 
                    alt='art'
                    // Fix this: show the artist image or the song cover art
                    src={artistId ? artistData?.attributes?.artwork?.url
                        .replace('{w}', '500')
                        .replace('{h}', '500') 
                        : songData?.attributes?.artwork?.url}
                    className='sm:w-48 w-28 sm:h-48 h-28 rounded-full object-cover border-2 shadow-xl shadow-black'
                />

                {/* <div className="ml-5">
                    {/* Fix this: should be showing the artist name. If it doesn't, it should show the song title *
                    <p className='font-bold sm:text-3xl text-xl text-white'>{artistId ? artist?.name : songData?.title}</p>
                    {!artistId && (
                        <Link to={`/artists/${songData?.relationships?.artists?.data[0].id}`}>
                            {/* Fix this: This should show the artist name *
                            <p className='text-base text-gray-400 mt-2'>{songData?.attributes?.artistName}</p>
                        </Link>
                    )}

                    <p className='text-base text-gray-400 mt-2'>
                        {/* Fix this: This should show the artist genre or the song genre *
                        {artistId
                          ? artist?.genreNames[0]
                          : songData?.genres?.primary}
                    </p>
                </div> */}
            </div>

            <div className='w-full sm:h-44 h-24'/>
        </div>
    )
};

export default DetailsHeader;
