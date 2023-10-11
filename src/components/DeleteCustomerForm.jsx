import React from "react";
import CustomerService from "../services/customer.service";

const DeleteCustomerForm = ({customer_id, closePopup}) => {

    const handleDeletion = async () => {
        try{
            const res = await CustomerService.remove(customer_id);
            console.log(res);
            closePopup();
        }
        catch(error){
            console.log(error);
            alert("Failure to delete Customer");
        }
    }
    return(
        <div>
            <h1 className="font-medium text-lg">Are you sure you want DELETE to customer ID : {customer_id}</h1>
            <button onClick={handleDeletion} className="transparent hover:bg-green-100 border border-green-300 p-2 font-bold rounded shadow-lg mt-2">Yes</button>
        </div>
    )
}

export default DeleteCustomerForm;