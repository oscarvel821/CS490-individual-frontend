import React from "react";
import CustomerTable from "./CustomerTable";

const Customers = () => {
    return(
        <div>
            <div className='flex justify-between items-center h-24 max-w-[1240px] mx-auto px-4 text-black'>
                <h1 className="w-1/3 text-2xl font-bold">Customers</h1>
            </div>
            <CustomerTable/>
        </div>
    )
}

export default Customers;