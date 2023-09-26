import React from "react";


const FilmDetails = (props) => {

    return(
        <div>
            {(typeof props.data[0] === 'undefined' || props.data[0] === null) ? (
                        <h1 className="mb-2 text-xl font-medium leading-tight text-neutral-900">Loading...</h1>
                    ) : (
                        <>
                            <h1 className="mb-2 text-xl font-medium leading-tight text-neutral-900">{props.data[0].title}</h1>
                            <h2 className="mb-2 text-lg border-b border-b-gray-200 shadow-sm">Description : {props.data[0].description}</h2>
                            <h2 className="mb-2 text-lg border-b border-b-gray-200 shadow-sm">Year Release : {props.data[0].release_year}</h2>
                            <h2 className="mb-2 text-lg border-b border-b-gray-200 shadow-sm">Rental Rate : ${props.data[0].rental_rate}</h2>
                            <h2 className="mb-2 text-lg border-b border-b-gray-200 shadow-sm">Rating : {props.data[0].rating}</h2>
                            <h2 className="mb-2 text-lg border-b border-b-gray-200 shadow-sm">Special Features : {props.data[0].special_features.replaceAll(",", ", ")}</h2>
                        </>
                    )}
        </div>
    )
}

export default FilmDetails;