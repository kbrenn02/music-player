import { useParams } from "react-router-dom"; // this gives access to the URL bar
import { useSelector, useDispatch } from 'react-redux';
import { Error, Loader, RelatedSongs } from '../components';
import { setActiveSong, playPause } from "../redux/features/playerSlice";


import { useGetArtistDetailsQuery } from "../redux/services/shazamCore";

const ArtistDetails = () => {
    const dispatch = useDispatch();
    const { id: artistId } = useParams();
    const { activeSong, isPlaying } = useSelector((state) => state.player);
    const { data: artistData, isFetching: isFetchingArtistDetails, error } = useGetArtistDetailsQuery(artistId)

    // Fix this: this, up to ?.data without specifying an object in the array, gets to the artists top 10 songs. need to pass
    // it to RelatedSongs correctly
    console.log('Full Artist Data: ', artistData?.data[0]);
    console.log('Artist data: ', artistData?.data[0]?.views['top-songs']?.data)
    const related = artistData?.data[0]?.views['top-songs']?.data

    const handlePauseClick = () => {
        dispatch(playPause(false));
    }

    const handlePlayClick = (song, i) => {
        dispatch(setActiveSong({ song, artistData, i}));
        dispatch(playPause(true));
    }
    

    if(isFetchingArtistDetails) return <Loader title='Loading artist details' />;

    if (error) return <Error />;
    console.log(error)

    return (
        <div className="flex flex-col">
            
        <div className='relative w-full flex flex-col'>
            <div className='w-full bg-gradient-to-l from-transparent to-black sm:h-48 h-28'/>
            
            <div className='absolute inset-0 flex items-center'>
                <img 
                    alt='art'
                    // Fixed this: show the artist image
                    // Artist image
                    src={artistId ? artistData?.data[0]?.avatar 
                        : "No Avatar"
                        .replace('{w}', '500')
                        .replace('{h}', '500') 
                        }
                    className='sm:w-48 w-28 sm:h-48 h-28 rounded-full object-cover border-2 shadow-xl shadow-black'
                />

                <div className="ml-5">
                    {/* Fixed this: should be showing the artist name. */}
                    <p className='font-bold sm:text-3xl text-xl text-white'>{artistId ? artistData?.data[0]?.attributes?.name : "No Name" }</p>

                    <p className='text-base text-gray-400 mt-2'>
                        {/* Fixed this: This should show the artist genre */}
                        {artistId
                          ? artistData?.data[0]?.attributes?.genreNames[0]
                          : "No genre"
                        }
                    </p>
                </div>
            </div>

            <div className='w-full sm:h-44 h-24'/>
        </div>

        <RelatedSongs 
                data={related}
                isPlaying={isPlaying}
                activeSong={activeSong}
                handlePauseClick={handlePauseClick}
                handlePlayClick={handlePlayClick}
        />
    
        </div>
    )
};

export default ArtistDetails;
