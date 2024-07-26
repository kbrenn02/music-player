import { Link } from 'react-router-dom'
import ArtistDetails from './ArtistDetails';


const DetailsHeader = ({ artistId, artistData, songData }) => (
    <div className='relative w-full flex flex-col'>
        <div className='w-full bg-gradient-to-l from-transparent to-black sm:h-48 h-28'/>
        
        <div className='absolute inset-0 flex items-center'>
            <img 
                alt='art'
                // Fix this: show the artist image or the song cover art
                src={artistId ? <ArtistDetails artistId={artistId} /> : songData?.attributes?.artwork?.url}
                className='sm:w-48 w-28 sm:h-48 h-28 rounded-full object-cover'
            />
        </div>
    </div>
);

export default DetailsHeader;
