import React, { useState } from "react";

export default function SalespersonForm({getSalespeople}) {
    const [first_name, setFirstName] = useState('');
    const [last_name, setLastName] = useState('');
    const [employee_id, setEmployeeID] = useState('');

    async function handleSubmit(event) {
        event.preventDefault();
        const data  = {
            first_name: first_name,
            last_name: last_name,
            employee_id: employee_id,
        };

        const salespeopleUrl = 'http://localhost:8090/api/salespeople/'
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
              },
        };
        const response = await fetch(salespeopleUrl, fetchConfig)
        if (response.ok) {
            setFirstName('');
            setLastName('');
            setEmployeeID('');

            getSalespeople();
            window.location.href = 'http://localhost:3000/salespeople/';
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
    function handleChangeEmployeeID(event) {
        const {value} = event.target;
        setEmployeeID(value);
    }

    return (
        <div className="row">
            <div className="offset-3 col-6">
                <div className="shadow p-4 mt-4">
                <h1>Create a Salesperson </h1>
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
                        <input value={employee_id} onChange={handleChangeEmployeeID} placeholder="employee_id" required type="text" name="employee_id" id="employee_id" className="form-control" />
                        <label htmlFor="employee_id">Employee ID</label>
                    </div>
                    <button className="btn btn-primary">Create</button>
                </form>
                </div>
            </div>
        </div>

    );

    }
