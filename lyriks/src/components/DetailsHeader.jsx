import { Link } from 'react-router-dom'
// import { useState, useEffect } from 'react'
// import ArtistDetails from './ArtistDetails';


const DetailsHeader = ({ artistId, artistData, songData }) => {

    console.log('artistid in detailsheader', artistId)
    console.log('detailsheader song data', songData)
    const songId = Object.keys(songData?.resources['shazam-songs'])[0]; // Get the first artist ID
    const songAttributes = songData?.resources['shazam-songs'][songId]?.attributes;
   

    return (
        <div className='relative w-full flex flex-col'>
            <div className='w-full bg-gradient-to-l from-transparent to-black sm:h-48 h-28'/>
            
            <div className='absolute inset-0 flex items-center'>
                <img 
                    alt='art'
                    // Fixed this: show the artist image or the song cover art. No errors but not showing artist avatar
                    src={artistId ? songAttributes?.images?.artistAvatar 
                        : artistData?.attributes?.artwork?.url
                        .replace('{w}', '500')
                        .replace('{h}', '500') 
                        }
                    className='sm:w-48 w-28 sm:h-48 h-28 rounded-full object-cover border-2 shadow-xl shadow-black'
                />

                <div className="ml-5">
                    {/* Fixed this: should be showing the artist name. If it doesn't, it should show the song title. Messed with sizing here and it still doesnt show. */}
                    <p className='font-bold sm:text-3xl text-xl text-white'>{artistId ? songAttributes.artist : artistData?.name }</p>

                    <p className='text-base text-gray-400 mt-2'>
                        {/* Fixed this: This should show the artist genre or the song genre */}
                        {artistId
                          ? songAttributes?.genres?.primary
                          : artistData?.genreNames[0]
                        }
                    </p>
                </div>
            </div>

            <div className='w-full sm:h-44 h-24'/>
        </div>
    )
};

export default DetailsHeader;
