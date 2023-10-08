import React, { useState, useEffect } from "react";
import CustomerService from "../services/customer.service";


const EditCustomerForm = ({customer_id, closePopup}) => {

    const [formData, setFormData] = useState({
        first_name : "", 
        last_name : "",
        email : "", 
        active : ""
    })

    useEffect(() => {
        const fetchCustomer = async () => {
        try{
            const res = await CustomerService.get(customer_id);
            console.log(res)
            setFormData({
                first_name: res.data[0].first_name || "",
                last_name: res.data[0].last_name || "",
                email: res.data[0].email || "",
                active: res.data[0].active || ""
              });

        }
        catch(err){
            console.log(err);
        }
        }

        fetchCustomer();
    }, [])

    const handleInputChange = (e) => {
        const {name, value} = e.target;

        setFormData({ ...formData, [name]: value });

        console.log(formData);
    }

    const sumbitEdit = async () => {
        try{
            const data = {
                first_name : formData.first_name,
                last_name : formData.last_name,
                email : formData.email,
                active : formData.active
            }

            const res = await CustomerService.update(customer_id, data);
            console.log(res);
            closePopup();
        } catch(err){
            console.log(err);
            alert("Failure to Edit Customer");
        }
    }
    

    return (
        <div>
          <h2>Edit Customer</h2>
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
            <label htmlFor="active">Active:</label>
              <input
                className="border border-black"
                type="text"
                id="active"
                name="active"
                value={formData.active}
                onChange={handleInputChange}
                autoComplete="off"
                required
              />
            </div>
            <div>
            <button onClick={sumbitEdit} className="transparent hover:bg-yellow-100 border border-yellow-300 p-2 font-bold rounded shadow-lg">Update</button>
            </div>
          </div>
        </div>
      );
}

export default EditCustomerForm;