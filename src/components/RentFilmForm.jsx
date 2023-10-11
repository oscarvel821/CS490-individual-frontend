import React, { useState } from "react";
import FilmDetails from "./FilmDetails";
import RentalService from "../services/rental.service";

const RentFilmForm = ({filmDetails}) => {

    const [customerId, setCustomerId] = useState("");

    const handleCustomerId = (e) => {
        const { value} = e.target;
        setCustomerId(value);
        console.log(customerId);
    }

    const postRental = async () => {
        try{
            const data = {
                customer_id : customerId,
                film_id : filmDetails[0].film_id,
                return_data : null,
                staff_id : 1
            }
            const res = await RentalService.create(data);
            setCustomerId("")
            console.log(res)
        } catch (err) {
            console.log(err);
            alert("Failure to Rent film out")
        }
    }

    return (
        <div>
            <FilmDetails data={filmDetails}/>
             <input className="border border-black py-2 mr-2 rounded shadow-lg"
                    type="text"
                    id="customer_id"
                    name="customer_id"
                    value={customerId}
                    onChange={handleCustomerId}
                    placeholder="Customer ID"
                    required
             />
            <button onClick={postRental} className="bg-transparent hover:bg-blue-100 border border-blue-300 font-bold py-2 px-4 mt-4 rounded shadow-lg">Rent</button>
        </div>
    )
};

export default RentFilmForm;