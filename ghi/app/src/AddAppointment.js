import React, { useState, useEffect } from "react";

export default function AddAppointment() {
    const [technicians, setTechnicians] = useState([])

    useEffect(() => {
        const fetchData = async () => {
        const techUrl = "http://localhost:8080/api/technicians/"

        const response = await fetch(techUrl);

        if (response.ok) {
            const data = await response.json();
            setTechnicians(data.technicians)
        }
        };
        fetchData();
    }, []);

    const [datetime, setDateTime] = useState("")
    const [reason, setReason] = useState("")
    const [vin, setVin] = useState("")
    const [customer, setCustomer] = useState("")
    const [technician, setTechnician] = useState("")

    function handleDateTimeChange(event) {
        const value = event.target.value;
        setDateTime(value);
    }

    function handleReasonChange(event) {
        const value = event.target.value;
        setReason(value);
    }

    function handleVinChange(event) {
        const value = event.target.value;
        setVin(value);
    }

    function handleCustomerChange(event) {
        const value = event.target.value;
        setCustomer(value);
    }

    function handleTechnicianChange(event) {
        const value = event.target.value;
        setTechnician(value);
    }


    async function handleSubmit(event) {
        event.preventDefault();

        const data = {}
        data.date_time = datetime
        data.reason = reason
        data.vin = vin
        data.customer = customer
        data.technician = technician

        const appointmentUrl = "http://localhost:8080/api/appointments/"
        const fetchConfig = {
        method: 'post',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application.json'
        },
        };

        const response = await fetch(appointmentUrl, fetchConfig);
        if (response.ok) {
        window.location.href = 'http://localhost:3000/appointments/';


        setVin("");
        setCustomer("");
        setDateTime("");
        setTechnician("");
        setReason("");
        }
    }
    return (
        <div className="row">
        <div className="offset-3 col-6">
            <div className="shadow p-4 mt-4">
            <h1>Create a Service Appointment</h1>
            <form onSubmit={handleSubmit} id="create-appointment-form">

                <div className="form-floating mb-3">
                <input onChange={handleVinChange} placeholder="VIN" required type="text"
                    name="vin" id="vin" className="form-control" value={vin}
                />
                <label htmlFor="vin">Automobile VIN</label>
                </div>
                <div className="form-floating mb-3">
                <input onChange={handleCustomerChange} placeholder="Customer" required type="text"
                    name="customer" id="customer" className="form-control" value={customer}
                />
                <label htmlFor="customer">Customer</label>
                </div>
                <div className="form-floating mb-3">
                <input onChange={handleDateTimeChange} placeholder="Date Time" required type="datetime-local"
                    name='datetime' id="datetime" className="form-control" value={datetime}
                />
                <label htmlFor="datetime">Date Time</label>
                </div>
                <div className="mb-3">
                <select value={technician} onChange={handleTechnicianChange} required
                    name="technician" id="technician" className="form-select"
                >
                    <option value="">Choose a Technician</option>
                    {technicians.map(technician => {
                    const fullName = `${technician.first_name} ${technician.last_name}`
                    return (
                        <option value={technician.id} key={technician.id}>
                        {fullName}
                        </option>
                    )
                    })}
                </select>
                </div>

                <div className="form-floating mb-3">
                <input onChange={handleReasonChange} placeholder="Reason" required type="text"
                    name="reason" id="reason" className="form-control" value={reason}
                />
                <label htmlFor="reason">Reason</label>
                </div>
                <button className="btn btn-primary">Create</button>
            </form>
            </div>
        </div>
        </div>
    )


}
