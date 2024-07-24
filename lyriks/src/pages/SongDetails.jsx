import { useParams } from "react-router-dom"; // this gives access to the URL bar
import { useSelector, useDispatch } from 'react-redux';
import { DetailsHeader, Error, Loader, RelatedSongs } from '../components';

import { setActiveSong, playPause } from "../redux/features/playerSlice";
import { useGetSongDetailsQuery } from "../redux/services/shazamCore";

const SongDetails = () => {
    const dispatch = useDispatch();
    const { songid } = useParams();
    const { activeSong, isPlaying } = useSelector((state) => state.player);
    const { data: songData, isFetching: isFetchingSongDetails } = useGetSongDetailsQuery(songid)

    // const lyricsData = songData.resources.lyrics
    // const lyricsKeys = Object.keys(lyricsData);
    // const dynamicKey = lyricsKeys[0]; // Assuming there's only one key, or modify to handle multiple keys
    
    // const attributes = lyricsData[dynamicKey].attributes;
    // const lyricsText = attributes.text;
    // console.log(lyricsText)
    console.log('chosen song', songid)
    console.log('chosen song data', songData?.resources)

    return (
        <div className="flex flex-col">
            <DetailsHeader artistId='' songData={songData}/>

            <div className="mb-10">
                <h2 className="text-white text-3xl font-bold">Lyrics:</h2>

                <div className="mt-5">
                    {/* {songData?.resources?.lyrics[0]?.type === 'lyrics' */}
                    { true
                        ? songData?.resources?.lyrics[34769645]?.attributes?.text.map((line, i) => (
                            <p key={i} className="text-gray-400 text-base my-1">{line}</p>
                        )) :<p className="text-gray-400 text-base my-1">Sorry, no lyrics found</p>}
                </div>
            </div>
        </div>
    )
};

export default SongDetails;
