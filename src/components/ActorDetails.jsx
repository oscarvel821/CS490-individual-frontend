import React from "react";

const ActorDetails = (props) => {
    return (
        <div>
            {(typeof props.data[0] === 'undefined' || props.data[0] === null) ? (
                        <h1 className="mb-2 text-xl font-medium leading-tight text-neutral-900">Loading...</h1>
                    ) : (
                        <>
                            <h1 className="mb-2 text-xl font-medium leading-tight text-neutral-900">{props.data[0].first_name} {props.data[0].last_name}</h1>
                            <h2 className="mb-2 text-lg border-b border-b-gray-200">Top Films</h2>
                            <ul className="list-disc">
                                {props.data.map((item, index) => {
                                    return <li key={index} className="mx-5 my-5">{item.film_title}</li>
                                })}
                            </ul>
                        </>
                    )}
        </div>
    )
}

export default ActorDetails;