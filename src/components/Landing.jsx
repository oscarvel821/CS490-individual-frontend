import React, {useState, useEffect} from "react";
import FilmService from '../services/film.service';
import ActorService from '../services/actor.service';
import Ranking from './Ranking';
import {BiCameraMovie} from 'react-icons/bi';
import {BsFillPersonFill} from 'react-icons/bs';

const Landing = () => {
    const [top5movies, setTop5movies] = useState(null);
    const [top5actors, setTop5actors] = useState(null);

    useEffect(() => {
        const fetchtop5movies = async () => {
        try{
            const res = await FilmService.getTop5();
            setTop5movies(res.data);
        }
        catch(err){
            console.log(err);
        }
        }
        const fetchtop5actor = async () => {
        try{
            const res = await ActorService.getTop5();
            setTop5actors(res.data);
        }
        catch(err){
            console.log(err);
        }
        }

        fetchtop5movies();
        fetchtop5actor();
    }, [])

    return (
        <div>
            <div className='max-w-[1240px] mx-auto px-4 text-black'>
                <h1 className='w-full text-3xl font-bold'>Top 5 Movies Rented</h1>
            </div>
            <Ranking cards={top5movies} icon={<BiCameraMovie size={35}/>} descript="Rental Count : " category='film'/>
            <div className='max-w-[1240px] mx-auto px-4 text-black'>
                <h1 className='w-full text-3xl font-bold'>Top 5 Actors</h1>
            </div>
            <Ranking cards={top5actors} icon={<BsFillPersonFill size={35}/>} descript="Movie Count: " category='actor'/>
        </div>
    )
}

export default Landing;