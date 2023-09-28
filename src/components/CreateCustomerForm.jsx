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
            const res = await CustomerService.create(data);
            setFormData({
                first_name : "", 
                last_name : "",
                email : "", 
            });
            console.log(res)
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div>
          <h2>Create Customer</h2>
          <div>
            <div>
              <label htmlFor="first_name">First Name:</label>
              <input
                className="border border-black"
                type="text"
                id="first_name"
                name="first_name"
                value={formData.first_name}
                onChange={handleInputChange}
                autoComplete="off"
                required
              />
            </div>
            <div>
              <label htmlFor="last_name">Last Name:</label>
              <input
                className="border border-black"
                type="text"
                id="last_name"
                name="last_name"
                value={formData.last_name}
                onChange={handleInputChange}
                autoComplete="off"
                required
              />
            </div>
            <div>
              <label htmlFor="email">Email:</label>
              <input
                className="border border-black"
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                autoComplete="off"
                required
              />
            </div>
            <div>
              <button onClick={postCustomer} className="border border-black" >Create</button>
            </div>
          </div>
        </div>
      );
}

export default CreateCustomerForm;