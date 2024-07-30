import { useState, useEffect } from "react";
import axios from 'axios';
import { useSelector } from "react-redux";

import { Error, Loader, SongCard } from '../components'



const AroundYou = () => {

    const [country, setCountry] = useState('');
    const [loading, setLoading] = useState(true);
    const { activeSong, isPlaying } = useSelector((state) => state.player);

    console.log(country)

    useEffect(() => {
        // at_iXpZiYZxgyWzsmuv12OV1z3vsAC3N
        axios.get(`https://geo.ipify.org/api/v2/country?apiKey=at_iXpZiYZxgyWzsmuv12OV1z3vsAC3N`)
            .then((res) => setCountry(res?.data?.location?.country))
            .catch((err) => console.log('country error:', err))
            .finally(() => setLoading(false))
    }, [country]);

    return (
        <div>

        </div>
    )

}

export default AroundYou;
