import { useParams } from "react-router-dom"; // this gives access to the URL bar
import { useSelector } from 'react-redux';
import { DetailsHeader, Error, Loader, RelatedSongs } from '../components';


import { useGetArtistDetailsQuery } from "../redux/services/shazamCore";

const ArtistDetails = () => {
    const dispatch = useDispatch();
    const { songid } = useParams();
    const { activeSong, isPlaying } = useSelector((state) => state.player);
    const { data: songData, isFetching: isFetchingSongDetails } = useGetSongDetailsQuery(songid)
    const { data, isFetching: isFetchingRelatedSongs, error } = useGetSongRelatedQuery(songid)

    const handlePauseClick = () => {
        dispatch(playPause(false));
    }

    const handlePlayClick = (song, i) => {
        dispatch(setActiveSong({ song, data, i}));
        dispatch(playPause(true));
    }

    // const lyricsData = songData.resources.lyrics
    // const lyricsKeys = Object.keys(lyricsData);
    // const dynamicKey = lyricsKeys[0]; // Assuming there's only one key, or modify to handle multiple keys
    
    // const attributes = lyricsData[dynamicKey].attributes;
    // const lyricsText = attributes.text;
    // console.log(lyricsText)
    console.log('chosen song', songid)
    console.log('chosen song data', songData?.resources)
    // Fix this: looks like the getsongrelatedquery is showing the same data as the getsongdetailsquery
    console.log("related songs data: ", data)

    if(isFetchingSongDetails || isFetchingRelatedSongs) return <Loader title='Searching song details' />;

    if (error) return <Error />

    return (
        <div className="flex flex-col">
            <DetailsHeader artistId='' songData={songData}/>

            <div className="mb-10">
                <h2 className="text-white text-3xl font-bold">Lyrics:</h2>

                <div className="mt-5">
                    {/* {songData?.resources?.lyrics[0]?.type === 'lyrics' */}
                    { true
                    // Fix this: show the lyrics for a song. Any song
                        ? songData?.resources?.lyrics[34769645]?.attributes?.text.map((line, i) => (
                            <p key={i} className="text-gray-400 text-base my-1">{line}</p>
                        )) :<p className="text-gray-400 text-base my-1">Sorry, no lyrics found</p>}
                </div>
            </div>

            {/* <RelatedSongs 
                data={data}
                isPlaying={isPlaying}
                activeSong={activeSong}
                handlePauseClick={handlePauseClick}
                handlePlayClick={handlePlayClick}
            /> */}
        </div>
    )
};

export default ArtistDetails;
