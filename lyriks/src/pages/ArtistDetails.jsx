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
    console.log('Artist data: ', artistData?.data[0]?.views['top-songs']?.data)//[0]?.attributes?.name)
    

    if(isFetchingArtistDetails) return <Loader title='Loading artist details' />;

    if (error) return <Error />;
    console.log(error)

    return (
        <div className="flex flex-col">
            <DetailsHeader artistId={artistId} artistData={artistData}/>

            <RelatedSongs 
                // data={Object.values(artistData?.songs)}
                artistId={artistId}
                isPlaying={isPlaying}
                activeSong={activeSong}
            />
        </div>
    )
};

export default ArtistDetails;
