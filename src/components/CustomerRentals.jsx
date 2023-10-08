import React, { useState, useEffect } from "react";
import CustomerService from "../services/customer.service";

const CustomerRentals = ({customer_id}) => {
    const [data, setData] = useState(null);

    useEffect(() => {
        const fetchRentals = async () => {
        try{
            const res = await CustomerService.getAllRentals(customer_id);
            setData(res.data);
        }
        catch(err){
            console.log(err);
        }
        }

        fetchRentals();
    }, [])

    return (
        <div>
            <h1>Customer's Rentals for customer id : {customer_id}</h1>
            {data === null ? (
                <h1 className="mb-2 text-xl font-medium leading-tight text-neutral-900">Loading...</h1>
            ) : (
                <>
                    {data.map((rental) => (
                        <div className="flex space-x-3">
                            <h1>{rental.rented_movie}</h1>
                            {rental.return_status === null ? (
                                <p>Not Returned</p>
                            ) : (
                                <p>Returned</p>
                            )}
                        </div>

                    ))}
                </>
            )}
        </div>
    )
}

export default CustomerRentals;