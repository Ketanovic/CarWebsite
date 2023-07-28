import React, { useState } from "react";

export default function CustomerForm({getCustomers}) {
    const [first_name, setFirstName] = useState('');
    const [last_name, setLastName] = useState('');
    const [address, setAddress] = useState('');
    const [phone_number, setPhoneNumber] = useState('');

    async function handleSubmit(event) {
        event.preventDefault();
        const data  = {
            first_name: first_name,
            last_name: last_name,
            address: address,
            phone_number: phone_number,
        };

        const customersUrl = 'http://localhost:8090/api/customers/'
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
              },
        };
        const response = await fetch(customersUrl, fetchConfig)
        if (response.ok) {
            setFirstName('');
            setLastName('');
            setAddress('');
            setPhoneNumber('');

            getCustomers();
            window.location.href = 'http://localhost:3000/customers/';
        }
    }

    function handleChangeFirstName(event) {
        const { value } = event.target;
        setFirstName(value);
      }

    function handleChangeLastName(event) {
        const {value} = event.target;
        setLastName(value);
    }
    function handleChangeAddress(event) {
        const {value} = event.target;
        setAddress(value);
    }
    function handleChangePhoneNumber(event) {
        const {value} = event.target;
        setPhoneNumber(value);
    }

    return (
        <div className="row">
            <div className="offset-3 col-6">
                <div className="shadow p-4 mt-4">
                <h1>Create a Customer </h1>
                <form onSubmit={handleSubmit} id="create-automobile-form">
                    <div className="form-floating mb-3">
                        <input value={first_name} onChange={handleChangeFirstName} placeholder="First Name" required type="text" name="first_name" id="first_name" className="form-control" />
                        <label htmlFor="first_name">First Name</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input value={last_name} onChange={handleChangeLastName} placeholder="Last Name" required type="text" name="last_name" id="last_name" className="form-control" />
                        <label htmlFor="last_name">Last Name</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input value={address} onChange={handleChangeAddress} placeholder="address" required type="text" name="address" id="address" className="form-control" />
                        <label htmlFor="address">Address</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input value={phone_number} onChange={handleChangePhoneNumber} placeholder="phone_number" required type="text" name="phone_number" id="phone_number" className="form-control" />
                        <label htmlFor="phone_number">Phone Number</label>
                    </div>
                    <button className="btn btn-primary">Create</button>
                </form>
                </div>
            </div>
        </div>

    );

    }
