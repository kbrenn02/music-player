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

    console.log(songid)

    return (
        <div className="flex flex-col">
            {/* <DetailsHeader artistId={artistId} songData={songData}/> */}

            <div className="mb-10">
                <h2 className="text-white text-3xl font-bold">Lyrics:</h2>

                <div className="mt-5">
                    {songData?.resources?.lyrics[0]?.type === 'lyrics'
                        ? songData?.resources?.lyrics?.attributes?.text.map((line, i) => (
                            <p key={i} className="text-gray-400 text-base my-1">{line}</p>
                        )) :<p className="text-gray-400 text-base my-1">Sorry, no lyrics found</p>}
                </div>
            </div>
        </div>
    )
};

export default SongDetails;
