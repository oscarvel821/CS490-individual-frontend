import React, { useState, useEffect } from "react";
import { useReactTable, getCoreRowModel, flexRender, getPaginationRowModel} from "@tanstack/react-table";
import CustomerService from "../services/customer.service";

const CustomerRentals = ({customer_id}) => {
    const [data, setData] = useState([]);

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

    const columns = [
        {
            header: "Rental ID",
            accessorKey : "rental_id"
        },
        {
            header: 'Film',
            accessorKey : 'rented_movie'
        },
        {
            header: 'Return Status',
            accessorKey : 'return_status',
            cell : ({cell}) => (
                <h1>{cell.getValue() ? "Returned" : "Not Returned"}</h1>
            )
        },
    ]

    const table = useReactTable({
        data, 
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel : getPaginationRowModel(),
        // getFilteredRowModel : getFilteredRowModel(),
        initialState: {
            pagination: {
                pageSize: 10,
            },
        },
        // state : {
        //     globalFilter : filtering
        // },
        // onGlobalFilterChange: setFiltering
    })

    return (
        <div className=" max-w-[1240px] mx-auto px-2 text-black">
            <div className="bg-white px-2 pt-3 pb-4 rounded-sm border border-gray-200 flex-1">
                <h1 className="text-gray-700 text-md ml-2">Rentals For Customer ID : {customer_id}</h1>
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
        </div>
    )
}

export default CustomerRentals;