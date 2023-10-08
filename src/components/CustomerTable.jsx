import React from "react";
import { useReactTable, getCoreRowModel, flexRender, getPaginationRowModel, getFilteredRowModel} from "@tanstack/react-table";
import { useState, useEffect } from "react";
import CustomerService from "../services/customer.service.js";
import Popup from "./Popup.jsx";
import CreateCustomerForm from "./CreateCustomerForm.jsx";
import EditCustomerForm from "./EditCustomerForm.jsx";
import DeleteCustomerForm from "./DeleteCustomerForm.jsx";
import CustomerRentals from "./CustomerRentals.jsx";


const CustomerTable = () => {

    const [data, setData] = useState([])
    const [id, setId] = useState("");
    const [filtering, setFiltering] = useState('');
    const [createPopupButton, setCreatePopupButton] = useState(false);
    const [editPopupButton, setEditPopupButton] = useState(false);
    const [deletePopupButton, setDeletePopupButton] = useState(false);
    const [moreInfoPopupButton, setMoreInfoPopupButton] = useState(false);

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

    const handleCreatePopup = () => {
        setCreatePopupButton(!createPopupButton)
    }
    
    const closedMoreInfoPopup = () => {
        setMoreInfoPopupButton(false);
    }

    const closeEditPopup = () => {
        setEditPopupButton(false);
    }

    const closeDeletePopup = () => {
        setDeletePopupButton(false);
    }

    const handleMoreInfoClick = (id) => {
        setMoreInfoPopupButton(true);
        setId(id);
    }

    const handleEditClick = (id) => {
        setEditPopupButton(true);
        setId(id);
    }

    const handleDeleteClick = (id) => {
        setDeletePopupButton(true);
        setId(id);
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
        },
        {
            header : "", 
            accessorKey : 'customer_id',
            cell : ({cell}) => (
                <button
                onClick={() => handleMoreInfoClick(cell.getValue())}
                className="transparent hover:bg-gray-100 border border-gray-300 p-2 font-bold rounded shadow-lg"
              >
                More Info
              </button>
            )
        },
        {
            header: "",
            accessorKey: 'customer_id',
            cell: ({cell}) => (
                <button
                onClick={() => handleEditClick(cell.getValue())}
                className="transparent hover:bg-blue-100 border border-blue-300 p-2 font-bold rounded shadow-lg"
              >
                Edit
              </button>
            ),
        },
        {
            header: '', 
            accessorKey: 'customer_id',
            cell: ({cell}) => (
              <button
                onClick={() => handleDeleteClick(cell.getValue())}
                className="transparent hover:bg-red-100 border border-red-300 p-2 font-bold rounded shadow-lg"
              >
                Delete
              </button>
            ),
          },
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
                    <button onClick={handleCreatePopup} className="transparent hover:bg-green-100 border border-green-300 font-bold rounded shadow-lg p-2 ml-2">Add</button>
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
            <Popup trigger={createPopupButton} closePopup={handleCreatePopup} content={<CreateCustomerForm/>}/>
            <Popup trigger={editPopupButton}  closePopup={closeEditPopup} content={<EditCustomerForm customer_id={id} closePopup={closeEditPopup}/>} />
            <Popup trigger={deletePopupButton} closePopup={closeDeletePopup} content={<DeleteCustomerForm customer_id={id} closePopup={closeDeletePopup} />} />
            <Popup trigger={moreInfoPopupButton} closePopup={closedMoreInfoPopup} content={<CustomerRentals customer_id={id}/>} /> 
        </div>
    )
}

export default CustomerTable;