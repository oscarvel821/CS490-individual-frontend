import React from "react";
import { useReactTable, getCoreRowModel, flexRender, getPaginationRowModel, getFilteredRowModel} from "@tanstack/react-table";
import { useState, useEffect } from "react";
import CustomerService from "../services/customer.service.js";
import Popup from "./Popup.jsx";
import CreateCustomerForm from "./CreateCustomerForm.jsx";


const CustomerTable = () => {

    const [data, setData] = useState([])
    const [filtering, setFiltering] = useState('');
    const [popupButton, setPopupButton] = useState(false);

    useEffect(() =>{
        const fetchCustomers = async () => {
            try{
                const res = await CustomerService.getAll();
                setData(res.data);
            } catch (err){
                console.log(err);
            }
            
        }

        fetchCustomers();
    }, [])

    const handlePopup = () => {
        setPopupButton(!popupButton);
    }

    const columns = [
        {
            header: 'ID',
            accessorKey : 'customer_id'
        },
        {
            header: 'First Name',
            accessorKey : 'first_name'
        },
        {
            header: 'Last Name',
            accessorKey : 'last_name'
        }
    ]

    const table = useReactTable({
        data, 
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel : getPaginationRowModel(),
        getFilteredRowModel : getFilteredRowModel(),
        initialState: {
            pagination: {
                pageSize: 20,
            },
        },
        state : {
            globalFilter : filtering
        },
        onGlobalFilterChange: setFiltering
    })

    return (
        <div className=" max-w-[1240px] mx-auto px-2 text-black">
            <div className="flex ml-2 mb-2">
                <div className="flex w-1/2">
                    <div className="flex items-center">
                        <h1 className="text-xl font-bold">Filter By Name</h1>
                    </div>
                    <div className="relative mx-3 w-1/2 rounded">
                        <input    
                            className="outline-none w-full p-4 rounded-full bg-gray-100"
                            type="text"
                            value={filtering} 
                            onChange={(e) => setFiltering(e.target.value)}         
                            name="name"
                            label="Name"
                            placeholder="Keyword"
                        />
                    </div>
                </div>
                <div className="flex w-1/2 justify-end items-center">
                    <div className="flex items-center">
                        <h1 className="text-xl font-bold">Create New Customer</h1>
                    </div>
                    <button onClick={handlePopup} className="bg-green-500 hover:bg-green-600 border border-gray-300 font-bold rounded shadow-lg p-2 ml-2">Add</button>
                </div>
            </div>
            <div className="bg-white px-2 pt-3 pb-4 rounded-sm border border-gray-200 flex-1">
                <h1 className="text-gray-700 text-md ml-2">Customers</h1>
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                    <table className="w-full text-sm text-left text-gray-600 mt-5">
                        <thead className="text-xs text-gray-800 uppercase bg-gray-50">
                            {table.getHeaderGroups().map(headerGroup =>(
                                <tr key={headerGroup.id}>
                                    {headerGroup.headers.map(header => (
                                        <th key={header.id} className="px-6 py-3">
                                            {flexRender(header.column.columnDef.header, header.getContext())}
                                        </th>
                                    ))}
                                </tr>
                            ))}
                        </thead>
                        <tbody>
                            {table.getRowModel().rows.map((row, index) => (
                                <tr key={row.id} className={index % 2  === 0? "bg-white border-b" : "bg-gray-50 border-b"}>
                                    {row.getVisibleCells().map(cell => (
                                        <td key={cell.id} className="px-6 py-4 font-normal">
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="flex space-x-5 justify-center">
                    <button onClick={() => table.setPageIndex(0)} className="bg-transparent hover:bg-gray-100 border border-gray-300 font-bold py-2 px-4 mt-4 rounded shadow-lg">First Page</button>
                    <button disabled={!table.getCanPreviousPage()} onClick={() => table.previousPage()} className="bg-transparent hover:bg-gray-100 border border-gray-300 font-bold py-2 px-4 mt-4 rounded shadow-lg disabled:bg-transparent">Previous Page</button>
                    <button disabled={!table.getCanNextPage()} onClick={() => table.nextPage()} className="bg-transparent hover:bg-gray-100 border border-gray-300 font-bold py-2 px-4 mt-4 rounded shadow-lg disabled:bg-transparent">Next Page</button>
                    <button onClick={() => table.setPageIndex(table.getPageCount() - 1)} className="bg-transparent hover:bg-gray-100 border border-gray-300 font-bold py-2 px-4 mt-4 rounded shadow-lg">Last Page</button>
                </div>
            </div>
            <Popup trigger={popupButton} closePopup={handlePopup} content={<CreateCustomerForm/>}/>
        </div>
    )
}

export default CustomerTable;