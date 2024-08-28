import React from 'react';
import { Link } from 'react-router-dom';

import PlayPause from './PlayPause';

const SongBar = ({ song, i, artistId, isPlaying, activeSong, handlePauseClick, handlePlayClick }) => (
    <div className={`w-full flex flex-row items-center hover:bg-[#4c426e] ${activeSong?.attributes?.name === song?.attributes?.name ? 'bg-[#4c426e]' : 'bg-transparent'} py-2 p-4 rounded-lg cursor-pointer mb-2`}>
        <h3 className="font-bold text-base text-white mr-3">{i + 1}.</h3>
        <div className="flex-1 flex flex-row justify-between items-center">
            <img
                className="w-20 h-20 rounded-lg"
                src={song?.attributes?.artwork?.url}
                alt={song?.attributes?.name}
            />
            <div className="flex-1 flex flex-col justify-center mx-3 w-full h-full">
                {!artistId ? (
                <Link to={`/songs/${song?.id}`}>
                    <p className="text-xl font-bold text-white">
                    {song?.attributes?.name}
                    </p>
                </Link>
                ) : (
                <p className="text-xl font-bold text-white">
                    {song?.attributes?.name}
                </p>
                )}
                <p className="text-xl text-gray-300 mt-1">
                {song?.attributes?.albumName}
                </p>
            </div>
        </div>
        {!artistId
        ? (
            <PlayPause
            isPlaying={isPlaying}
            activeSong={activeSong}
            song={song}
            handlePause={handlePauseClick}
            handlePlay={() => handlePlayClick(song, i)}
            />
        )
        : null}
    </div>
);

export default SongBar;