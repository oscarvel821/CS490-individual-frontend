import React, { useEffect, useState } from "react";
import FilmService from "../services/film.service";
import RankingCard from "./RankingCard";
import {AiOutlineClose} from 'react-icons/ai'
import FilmDetails from "./FilmDetails";
import ActorService from "../services/actor.service";
import ActorDetails from "./ActorDetails";


const Ranking = ({cards, icon, descript, category}) => {

    const [details, setDetails] = useState(false);
    const [id, setId] = useState(null);
    const [filmDetails, setFilmDetails] = useState([]);
    const [actorDetails, setActorDetails] = useState([]);

    const handleDetails = (id) => {
        setDetails(true);
        setId(id);
    }

    const closeDetails = () => {
        setDetails(false);
    }

    useEffect(() => {
        const fetchFilmDetails = async () => {
        try{
            const res = await FilmService.get(id);
            setFilmDetails(res.data);
        }
        catch(err){
            console.log(err);
        }
        }

        const fetchActorDetails = async () => {
            try {
                const res = await ActorService.getDetails(id);
                setActorDetails(res.data);
            } catch(err){
                console.log(err);
            }
        }

        if(category === "film"){
            fetchFilmDetails();
        }
        else if(category === "actor" ){
            fetchActorDetails();
        }
    }, [id])

    return(
        <div className="w-full h-300 py-16 px-4">
            <div className="max-w-[1240px] mx-auto grid md:grid-cols-2">
                <div className='grid md:grid-cols-2 gap-6 pt-4'>
                    {(typeof cards === 'undefined' || cards === null) ? (
                        <p>Loading...</p>
                    ) : (
                        <>
                            {cards.map((card, index) => (
                                <RankingCard key={index} id={card.id} title={card.title} descript={`${descript} ${card.descript}`} icon={icon} handleDetails={handleDetails}/>
                            ))}
                        </>
                    )}
                </div>
                <div className='relative m-4'>
                    {details ? (
                        <>
                            <div onClick={closeDetails} className='absolute top-0 right-0 hover:cursor-pointer'>
                                <AiOutlineClose/>
                            </div>

                            {category === 'film' ? (
                                <FilmDetails data={filmDetails}/>
                            ) : (
                                <ActorDetails data={actorDetails}/>
                            )}

                        </>
                    ) : (
                        <></>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Ranking;
