import { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode } from 'swiper';

import PlayPause from "./PlayPause";
import { playPause, setActiveSong } from "../redux/features/playerSlice";
import { useGetTopChartsQuery, useGetSongDetailsQuery } from "../redux/services/shazamCore";

import 'swiper/css';
import 'swiper/css/free-mode'

const TopChartCard = ({ song, i, isPlaying, activeSong, handlePauseClick, handlePlayClick }) => (
    
    <div className="w-full flex flex-row items-center hover:bg-[#4c426e] py-2 p-4 rounded-lg cursor-pointer mb-2">
        <h3 className="font-bold text-base text-white mr-3">{i + 1}</h3>
        <div className="flex-1 flex flex-row justify-between items-center">
            <img 
            className="w-20 h-20 rounded-lg"
            src={song.attributes.artwork.url} alt={song.attributes.name} 
            />
            <div className="flex-1 flex flex-col justify-center mx-3">
                <Link to={`/songs/${song.id}`}>
                    <p className="text-xl font-bold text-white">{song?.attributes.name}</p>
                </Link>
                    <p className="text-base text-gray-300 mt-1">{song?.attributes?.artistName}</p>
            </div>
        </div>
        <PlayPause 
            isPlaying={isPlaying}
            activeSong={activeSong}
            song={song}
            handlePause={handlePauseClick}
            handlePlay={handlePlayClick}
        />
    </div>
) 


const TopPlay = () => {
    const dispatch = useDispatch();
    const { activeSong, isPlaying } = useSelector((state) => state.player);
    const { data, isFetching } = useGetTopChartsQuery();
    // const { data: songData, isFetching: isFetchingSongDetails } = useGetSongDetailsQuery(songid)
    const divRef = useRef(null);

    useEffect(() => {
        divRef.current.scrollIntoView({ behavior: 'smooth' })
    });

    const topPlays = data?.slice(0, 5);
    const artistIds = topPlays?.map((song) => song?.relationships?.artists?.data[0].id);
    // const songIds = topPlays?.map((song) => song?.id)
    console.log("topPlays", topPlays)
    console.log('artistIDs', artistIds)
    console.log('songIds:', songIds)
    const [songIds, setSongIds] = useState(null);
    const [artistImages, setArtistImages] = useState([]);

    useEffect(() => {
        if (!isFetching && data) {
            const songIds = topPlays.map((song) => song?.id);
            console.log(songIds);
        
            // If you need to fetch song details using the song IDs:
            const artistImg = songIds.map((id) => useGetSongDetailsQuery(id));
            console.log(artistImg);
          }
        }, [isFetching, data]);



    // useEffect(({ songIds }) => {

    //     console.log('useEffect triggered');

    //     const fetchedDetails = []

    //     const fetchDetails = async () => {
    //         for (let i = 0; i < songIds.length; i++) {
    //             // You need to call your hook once per songId and handle the result
    //             const { data } = useGetSongDetailsQuery(songIds[i]);
    //             if (data) {
    //                 fetchedDetails.push(data);
    //             }
    //         }
    //         // After fetching all details, set them in the state
    //         setArtistImages(fetchedDetails);
    //     };

    //     fetchDetails();
    // }, [songIds]);
  
        // if (isFetchingSongDetails) {
        //     console.log('Still fetching song details...');
        // } else {
        //     console.log('Fetching complete, songData:', songData);}

        // console.log(songData.resources)

    //     if (songData && songData.resources.artists) {
    //         const artistId = Object.keys(songData?.resources?.artists)[0]; // Get the first artist ID
    //         const artistData = songData?.resources?.artists[artistId];
            
    //         if (artistData) {
    //           console.log('artist data:', artistData);  // Use artistData safely
    //           setArtistId(artistId);    // Set artistId in state if valid
    //         } else {
    //           console.warn('Artist data is undefined or null');
    //         }
    //     }

    //     if (songData && songData.resources.lyrics) {
    //         const lyricId = Object.keys(songData?.resources?.lyrics)[0];
    //         const lyricAttributes = songData?.resources?.lyrics[lyricId]?.attributes;
    //         const lyricData = songData?.resources?.lyrics[lyricId];

    //         if (lyricAttributes){
    //             console.log('lyric attributes', lyricAttributes);
    //             setLyrics(lyricAttributes.text);
    //             setType(lyricData.type);
    //             console.log(lyrics)
    //         } else {
    //             console.warn('There is no lyric data')
    //         }
    //     }
    //   }, [isFetchingSongDetails, songData]);
    // })

    // const artistImages = artistIds?.map(id => (
    //     <ArtistDetails key={id} artistId={id} />
    // ));

    const handlePauseClick = () => {
        dispatch(playPause(false));
    };

    const handlePlayClick = (song, i) => {
        dispatch(setActiveSong({ song, data, i}));
        dispatch(playPause(true));
    };

    return (
        <div ref={divRef} className="xl:ml-6 ml-0 xl:mb-0 mb-6 flex-1 xl:max-w-[500px] max-w-full flex flex-col">
            <div className="w-full flex flex-col">
                <div className="flex flex-row justify-between items-center">
                    <h2 className="text-white font-bold text-2xl">Top Charts</h2>
                    <Link to='/top-charts'>
                        <p className="text-gray-300 text-base cursor-pointer">See More</p>
                    </Link>
                </div>

                <div className="mt-4 flex flex-col gap-1">
                    {topPlays?.map((song, i) => (
                        <TopChartCard 
                            key={i}
                            song={song}
                            i={i}
                            isPlaying={isPlaying}
                            activeSong={activeSong}
                            handlePauseClick={handlePauseClick}
                            handlePlayClick={() => handlePlayClick(song, i)}
                        />
                    ))}
                </div>
            </div>

            <div className="w-full flex flex-col mt-8">
                <div className="flex flex-row justify-between items-center">
                    <h2 className="text-white font-bold text-2xl">Top Artists</h2>
                    <Link to='/top-artists'>
                        <p className="text-gray-300 text-base cursor-pointer">See More</p>
                    </Link>
                </div> 
                <Swiper
                    slidesPerView='auto'
                    spaceBetween={15}
                    freeMode
                    centeredSlides
                    centeredSlidesBounds
                    modules={[FreeMode]}
                    className="mt-4"
                >
                    {topPlays?.map((song, i) => (
                        <SwiperSlide
                            key={i}
                            style={{ width: '25%', height: 'auto'}}
                            className="shadow-lg rounded-full animate-slideright"
                        >
                            <Link to={`/artists/${song?.relationships?.artists?.data[0].id}`}>
                                {/* Fix this: show the artist image for the top 5 artists without loading */}
                                {/* {artistImages[i]} */}
                                Blah
                            </Link>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
            
        </div>
    )
}

export default TopPlay;
