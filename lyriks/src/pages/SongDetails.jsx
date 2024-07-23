import { useParams } from "react-router-dom"; // this gives access to the URL bar

const SongDetails = () => {
    const { songId } = useParams();

    console.log(songId)

    return <div>SongDetails</div>
};

export default SongDetails;
