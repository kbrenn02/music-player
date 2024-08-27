import { useParams } from "react-router-dom"; // this gives access to the URL bar
import { useSelector } from 'react-redux';
import { DetailsHeader, Error, Loader, RelatedSongs } from '../components';


import { useGetArtistDetailsQuery } from "../redux/services/shazamCore";

const ArtistDetails = () => {
    const { id: artistId } = useParams();
    const { activeSong, isPlaying } = useSelector((state) => state.player);
    const { data: artistData, isFetching: isFetchingArtistDetails, error } = useGetArtistDetailsQuery(artistId)

    // const lyricsData = songData.resources.lyrics
    // const lyricsKeys = Object.keys(lyricsData);
    // const dynamicKey = lyricsKeys[0]; // Assuming there's only one key, or modify to handle multiple keys
    
    // const attributes = lyricsData[dynamicKey].attributes;
    // const lyricsText = attributes.text;
    // console.log(lyricsText)
    // console.log('chosen song', songid)
    // console.log('chosen song data', songData?.resources)
    // Fix this: looks like the getsongrelatedquery is showing the same data as the getsongdetailsquery
    // console.log("related songs data: ", data)
    // Fix this: this, up to ?.data without specifying an object in the array, gets to the artists top 10 songs. need to pass
    // it to RelatedSongs correctly
    console.log('Full Artist Data: ', artistData);
    console.log('Artist data: ', artistData?.data[0]?.views['top-songs']?.data)//[0]?.attributes?.name)
    

    if(isFetchingArtistDetails) return <Loader title='Loading artist details' />;

    if (error) return <Error />;
    console.log(error)

    return (
        <div className="flex flex-col">
            
        {/* <div className='relative w-full flex flex-col'>
            <div className='w-full bg-gradient-to-l from-transparent to-black sm:h-48 h-28'/>
            
            <div className='absolute inset-0 flex items-center'>
                <img 
                    alt='art'
                    // Fixed this: show the artist image or the song cover art. No errors but not showing artist avatar
                    // Artist image
                    src={artistId ? songAttributes?.images?.artistAvatar 
                        : artistData?.attributes?.artwork?.url
                        .replace('{w}', '500')
                        .replace('{h}', '500') 
                        }
                    className='sm:w-48 w-28 sm:h-48 h-28 rounded-full object-cover border-2 shadow-xl shadow-black'
                />

                <div className="ml-5">
                    {/* Fixed this: should be showing the artist name. If it doesn't, it should show the song title. Messed with sizing here and it still doesnt show. *
                    <p className='font-bold sm:text-3xl text-xl text-white'>{artistId ? songAttributes.artist : artistData?.name }</p>

                    <p className='text-base text-gray-400 mt-2'>
                        {/* Fixed this: This should show the artist genre or the song genre *
                        {artistId
                          ? songAttributes?.genres?.primary
                          : artistData?.genreNames[0]
                        }
                    </p>
                </div>
            </div>

            <div className='w-full sm:h-44 h-24'/>
        </div> */}
    
        </div>
    )
};

export default ArtistDetails;
