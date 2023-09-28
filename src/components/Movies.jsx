import React, {useEffect, useState} from "react";
import {AiOutlineSearch} from "react-icons/ai"
import MovieList from "./MovieList";
import Popup from "./Popup";
import FilmDetails from "./FilmDetails";
import FilmService from "../services/film.service";

const initialValues = {
    film_name : "",
    actor_name : "", 
    genre : ""
};

const Movies = () => {

    const [values, setValues] = useState(initialValues);
    const [searchBy, setSearchBy] = useState(null);
    const [data, setData] = useState([]);
    const [id, setId] = useState(null);
    const [popupButton, setPopupButton] = useState(false);
    const [filmDetails, setFilmDetails] = useState([]);

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

        fetchFilmDetails();
    }, [id])

    const handlePopup = (id) => {
        setPopupButton(true);
        setId(id);
    }

    const closePopup = () => {
        setPopupButton(false);
    }

    const handleInputChange = (e) =>{
        const {name, value} = e.target;

        setValues({
            ...values,
            [name] : value
        });
    };

    const handleFilmSearch = async () => {
        try{
            const res = await FilmService.findByTitle(values.film_name);
            setSearchBy(values.film_name);
            setValues(initialValues);
            setData(res.data);
        }
        catch(err){
            console.log(err);
        }
    }

    const handleActorSearch = async () => {
        try{
            const res = await FilmService.findByActor(values.actor_name);
            setSearchBy(values.actor_name);
            setValues(initialValues);
            setData(res.data);
        } catch (err) {
            console.log(err);
        }
    }


    const handleGenreSearch = async () => {
        try{
            const res = await FilmService.findByGenre(values.genre);
            setSearchBy(values.genre);
            setValues(initialValues);
            setData(res.data);
        } catch (err) {
            console.log(err);
        }
    }

    return(
        <div>
            <div className='flex justify-between items-center h-24 max-w-[1240px] mx-auto px-4 text-black'>
                <h1 className="w-1/3 text-2xl font-bold">Search Film</h1>
                {searchBy ? <h1 className="text-xl font-bold">Search By : {searchBy}</h1> : <></>}
                <div className="flex w-2/3">
                    <div className="relative mx-3 w-1/3 rounded">
                        <input    
                            className="outline-none w-full p-4 rounded-full bg-gray-100"
                            type="text"             
                            value={values.film_name}
                            onChange={handleInputChange}
                            name="film_name"
                            label="Film Name"
                            placeholder="Film Name"
                        />
                        <button className="absolute right-1 top-1/2 -translate-y-1/2 p-4 rounded-full bg-gray-300" onClick={handleFilmSearch}>
                            <AiOutlineSearch/>
                        </button>
                    </div>
                    <div className="relative mx-3 w-1/3 rounded">
                        <input    
                            className="outline-none w-full p-4 rounded-full bg-gray-100"
                            type="text"             
                            value={values.actor_name}
                            onChange={handleInputChange}
                            name="actor_name"
                            label="Actor Name"
                            placeholder="Actor Name"
                        />
                        <button className="absolute right-1 top-1/2 -translate-y-1/2 p-4 rounded-full bg-gray-300" onClick={handleActorSearch}>
                            <AiOutlineSearch/>
                        </button>
                    </div>
                    <div className="relative mx-3 w-1/3 rounded">
                        <input    
                            className="outline-none w-full p-4 rounded-full bg-gray-100"
                            type="text"             
                            value={values.genre}
                            onChange={handleInputChange}
                            name="genre"
                            label="Genre"
                            placeholder="Genre"
                        />
                        <button className="absolute right-1 top-1/2 -translate-y-1/2 p-4 rounded-full bg-gray-300" onClick={handleGenreSearch}>
                            <AiOutlineSearch/>
                        </button>
                    </div>
                </div>
            </div>
            <div className="flex flex-row max-w-[1240px] mx-auto px-2 text-black">
                <MovieList data={data} handlePopup={handlePopup}/>
            </div>
            <Popup trigger={popupButton} closePopup={closePopup} content={<FilmDetails data={filmDetails}/>}/>
        </div>
    )
}

export default Movies;