import React, { useState } from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import CustomerService from "../services/customer.service";

const Report = () => {

    const [store_id, setStore_id] = useState(1);

    const handleChange = (e) => {
        setStore_id(e.target.value);
    }

    const generatePDF = async () => {
        try{
            const res = await CustomerService.getAllByStoreId(store_id);

            const doc = new jsPDF();
            const header = ['customer_id', 'first_name', 'last_name', 'active']

            const data = res.data.map((customer) => [customer.customer_id, customer.first_name, customer.last_name, customer.active])

            doc.text("Customer Rental Report", 10, 10);

            autoTable(doc, {
                head: [header],
                body: data,
                startY: 20
            });

            doc.save("customer_rental_report.pdf");
        } catch(err){
            console.log(err)
        }
    }

    return (
        <div className='flex justify-between items-center h-24 max-w-[1240px] mx-auto px-4 text-black'>
            <div className="my-3">
                <label className="font-medium text-lg" for="store_id">Choose a Store:</label>

                <select className="w-10 border border-black rounded shadow-md ml-2" onChange={handleChange} name="store_id" id="store_id">
                    <option value="1">1</option>
                    <option value="2">2</option>
                </select>
                <button onClick={generatePDF} className=" block transparent hover:bg-blue-100 border border-blue-300 font-bold rounded shadow-lg p-2 mt-2">Generate Report</button>
            </div>
        </div>
    )
}

export default Report;