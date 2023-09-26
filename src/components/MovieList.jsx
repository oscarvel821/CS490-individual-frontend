import React from "react";

// const truncateString = (str, endpoint) => {
//     return (str.length > endpoint) ? 
//     str.slice(0,endpoint - 1) + "..." : str;
// }

const MovieList = ({data, handlePopup}) => {
    return(
        <div className="bg-white px-2 pt-3 pb-4 rounded-sm border border-gray-200 flex-1">
            <strong className="text-gray-700 text-md ml-2">Films</strong>
            
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left text-gray-600 mt-5">
                    <thead className="text-xs text-gray-800 uppercase bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Title
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Description
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Release Year
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Rental Rate
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Rating
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Special Features
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item,index) => {
                            return <tr className={index % 2  === 0? "bg-white border-b" : "bg-gray-50 border-b"}>
                                    <th scope="row" className="px-6 py-4 font-medium text-blue-600 dark:text-blue-500 hover:underline hover:cursor-pointer whitespace-nowrap" onClick={() => handlePopup(item.film_id)}>
                                        {item.title}
                                    </th>
                                    <th scope="row" className="px-6 py-4 font-normal">
                                        {item.description}
                                    </th>
                                    <th scope="row" className="px-6 py-4 font-normal">
                                        {item.release_year}
                                    </th>
                                    <th scope="row" className="px-6 py-4 font-normal">
                                        ${item.rental_rate}
                                    </th>
                                    <th scope="row" className="px-6 py-4 font-normal">
                                        {item.rating}
                                    </th>
                                    <th scope="row" className="px-6 py-4 font-normal">
                                        {item.special_features.replaceAll(",", ", ")}
                                    </th>
                                </tr>
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default MovieList;