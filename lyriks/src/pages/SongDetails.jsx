import { useParams } from "react-router-dom"; // this gives access to the URL bar
import { useSelector, useDispatch } from 'react-redux';
import { DetailsHeader, Error, Loader, RelatedSongs } from '../components';
import { useEffect, useState } from "react";

import { setActiveSong, playPause } from "../redux/features/playerSlice";
import { useGetSongDetailsQuery, useGetSongRelatedQuery } from "../redux/services/shazamCore";
 
const SongDetails = () => {
    const dispatch = useDispatch();
    const { songid } = useParams();
    const { activeSong, isPlaying } = useSelector((state) => state.player);
    const { data: songData, isFetching: isFetchingSongDetails } = useGetSongDetailsQuery(songid)
    const { data, isFetching: isFetchingRelatedSongs, error } = useGetSongRelatedQuery(songid)
    const [artistId, setArtistId] = useState(null);
    const [titleId, setTitleId] = useState(null);
    const [lyrics, setLyrics] = useState([]);
    const [type, setType] = useState('')

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
    // console.log('artist: ', artistId)
    console.log('chosen song data', songData)
    // Fixed this: looks like the getsongrelatedquery is showing the same data as the getsongdetailsquery
    console.log("related songs data: ", data)

    useEffect(() => {

        console.log('useEffect triggered');
  
        if (isFetchingSongDetails) {
            console.log('Still fetching song details...');
        } else {
            console.log('Fetching complete, songData:', songData);}

        // console.log(songData.resources)

        if (songData && songData.resources.artists) {
            const artistId = Object.keys(songData?.resources?.artists)[0]; // Get the first artist ID
            const artistData = songData?.resources?.artists[artistId];
            const titleId = Object.keys(songData?.resources['shazam-songs'])[0];
            const title = songData?.resources['shazam-songs'][titleId];
            
            if (artistData) {
              console.log('artist data:', artistData);  // Use artistData safely
              console.log('title:', title);
              setArtistId(artistId);    // Set artistId in state if valid
              setTitleId(title)
            } else {
              console.warn('Artist data is undefined or null');
            }
        }

        if (songData && songData.resources.lyrics) {
            const lyricId = Object.keys(songData?.resources?.lyrics)[0];
            const lyricAttributes = songData?.resources?.lyrics[lyricId]?.attributes;
            const lyricData = songData?.resources?.lyrics[lyricId];

            if (lyricAttributes){
                console.log('lyric attributes', lyricAttributes);
                setLyrics(lyricAttributes.text);
                setType(lyricData.type);
                console.log(lyrics)
            } else {
                console.warn('There is no lyric data')
            }
        }
    }, [isFetchingSongDetails, songData]);


    if(isFetchingSongDetails || isFetchingRelatedSongs) return <Loader title='Searching song details' />;
    
    if (error) return <Error />

    return (
        <div className="flex flex-col">
            <DetailsHeader artistId={artistId} songData={songData}/>

            <h1 className="text-white text-3xl font-bold mb-4">{titleId?.attributes?.title}</h1>

            <div className="mb-10">
                <h2 className="text-white text-2xl font-bold">Lyrics:</h2>

                <div className="mt-5">
                    {type === 'lyrics'
                    // Fixed this: show the lyrics for a song. Any song
                        ? lyrics.map((line, i) => (
                            <p key={i} className="text-gray-400 text-base my-1">{line}</p>
                        )) :<p className="text-gray-400 text-base my-1">Sorry, no lyrics found</p>}
                </div>
            </div>
        </div>
    )
};

export default SongDetails;
