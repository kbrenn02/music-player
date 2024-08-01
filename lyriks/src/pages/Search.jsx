import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Error, Loader, SongCard } from '../components';
import { useGetSongsBySearchQuery } from "../redux/services/shazamCore";


const Search = () => {

    const { searchTerm } = useParams();
    const { activeSong, isPlaying } = useSelector((state) => state.player);
    const { data, isFetching, error } = useGetSongsBySearchQuery(searchTerm);

    
    const songs = data?.tracks?.hits?.map((song) => song.track);
    console.log('songs: ', songs)

    if(isFetching) return <Loader title="Loading top charts" />

    if(error) return <Error />

    return (
        <div className="flex flex-col">
            <h2 className="font-bold text-3xl text-white text-left mt-4 mb-10">
                Showing results for <span className="font-black">{searchTerm}</span>
            </h2>

            <div className="flex flex-wrap sm:justify-start justify-center gap-8">
                {/* {songs?.map((song, i) => i < 50 && (
                    <SongCard 
                        key={i}
                        song={song}
                        isPlaying={isPlaying}
                        activeSong={activeSong}
                        data={songs}
                        i={i}
                    />
                ))} */}
            </div>
        </div>
    )

}

export default Search;
