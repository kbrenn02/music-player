import SongBar from './SongBar'


const RelatedSongs = ({ data, isPlaying, activeSong, handlePauseClick, handlePlayClick, artistId }) => (
    <div className='flex flex-col'>
        <h1 className='font-bold text-3xl text-white'>Related Songs:</h1>
{/* Fixed this: The related songs section fully is not showing up so I'll need to make sure data is actually being created */}
        <div className='mt-6 w-full flex flex-col'>
            {data?.map((song, i) => (
                <SongBar 
                    key={i}
                    song={song}
                    i={i}
                    artistId={artistId}
                    isPlaying={isPlaying}
                    handlePauseClick={handlePauseClick}
                    handlePlayClick={handlePlayClick}
                />
            ))}
        </div>
    </div>
);

export default RelatedSongs;
