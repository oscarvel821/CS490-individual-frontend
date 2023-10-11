import React, { useState } from "react";
import CustomerService from "../services/customer.service";


const CreateCustomerForm = () => {

    const [formData, setFormData] = useState({
        first_name : "", 
        last_name : "",
        email : "", 
    })

    const handleInputChange = (e) => {
        const {name, value} = e.target;

        setFormData({ ...formData, [name]: value });

        console.log(formData);
    }
    

    const postCustomer = async () => {
        try{
            const now = new Date();

            // Get the date components
            const year = now.getFullYear();
            const month = String(now.getMonth() + 1).padStart(2, '0'); // Month is zero-based, so add 1 and pad with '0' if necessary
            const day = String(now.getDate()).padStart(2, '0');
            const hours = String(now.getHours()).padStart(2, '0');
            const minutes = String(now.getMinutes()).padStart(2, '0');
            const seconds = String(now.getSeconds()).padStart(2, '0');

            // Format the date and time string
            const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

            const data = {
                store_id : 1,
                first_name : formData.first_name,
                last_name : formData.last_name,
                email : formData.email,
                address_id : 8,
                active : 1,
                create_date : formattedDate
            }
            if (!data.first_name || !data.last_name || !data.email){
              throw {kind : "One of the inputs in empty"}
            }
            const res = await CustomerService.create(data);
            setFormData({
                first_name : "", 
                last_name : "",
                email : "", 
            });
            console.log(res)
        } catch (err) {
            console.log(err);
            alert("Failure to create Customer");
        }
    }

    return (
        <div>
          <h2 className="font-medium text-2xl">Create Customer</h2>
          <div className="w-1/3 mt-2">
            <div className="my-3">
              <label className="font-medium text-lg" htmlFor="first_name">First Name</label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                id="first_name"
                name="first_name"
                placeholder="First Name"
                value={formData.first_name}
                onChange={handleInputChange}
                autoComplete="off"
                required
              />
            </div>
            <div className="my-3">
              <label className="font-medium text-lg" htmlFor="last_name">Last Name</label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                id="last_name"
                name="last_name"
                placeholder="Last Name"
                value={formData.last_name}
                onChange={handleInputChange}
                autoComplete="off"
                required
              />
            </div>
            <div className="my-3">
              <label className="font-medium text-lg" htmlFor="email">Email</label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="email"
                id="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleInputChange}
                autoComplete="off"
                required
              />
            </div>
            <div className="mt-4">
              <button onClick={postCustomer} className="transparent hover:bg-green-100 border border-green-300 p-2 font-bold rounded shadow-lg" >Create</button>
            </div>
          </div>
        </div>
      );
}

export default CreateCustomerForm;