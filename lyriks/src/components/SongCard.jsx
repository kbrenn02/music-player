import { Link } from "react-router-dom"
import { useDispatch } from "react-redux";
import PlayPause from "./PlayPause";
import { playPause, setActiveSong } from "../redux/features/playerSlice";


const SongCard = ({ song, i }) => {

    const activeSong = 'Test'

    // the tutorial isn't wholly accurate to the attributes I have available. I had to adjust the "activeSong"
    // mention and the img src to work with the attributes available

    return (
        <div className="flex flex-col w-[250px] p-4 bg-white/5 bg-opacity-80 
        backdrop-blur-sm animate-slideup rounded-lg cursor-pointer">
            <div className="relative w-full h-56 group">
                <div className={`absolute inset-0 justify-center items-center bg-black bg-opacity-50 
                group-hover:flex ${activeSong?.title === song.attributes.name ? 'flex bg-black bg-opacity-70' : 'hidden'}
                `}>
                    <PlayPause />
                </div>
                <img alt="song_img" src={song.attributes.artwork.url} />
            </div>

{/* Will have to adjust where the links send the user after we demonstrate it in the video */}

            <div className="mt-4 flex flex-col">
                <p className="font-semibold text-lg text-white truncate">
                    <Link to={`/songs/${song?.key}`}>
                        {song.attributes.name}
                    </Link>
                </p>
                <p className="text-sm truncate text-gray-300 mt-1">
                    <Link to={song.attributes.artistName ? `/artists/${song?.artistName?.adamid}` : '/top-artists'}>
                        {song.attributes.artistName}
                    </Link>
                </p>
            </div>
        </div>
    )
};

export default SongCard;


{/* <SongCard 
                        key={song.key}
                        song={song}
                        i={i}
                    /> */}