import React, { useEffect, useState } from "react";
import App from "./CreateSaleForm";

function AppointmentsList() {
    const [appointments, setAppointments] = useState([]);
    const fetchData = async () => {
        const url = "http://localhost:8080/api/appointments/"

        const response = await fetch(url);

        if (response.ok) {
        const data = await response.json();
        const createdAppointments = data.appointments.filter(appointment => appointment.status === "Created")
        setAppointments(createdAppointments)
        }
    };
    useEffect(() => {
        fetchData();
    }, []);

    async function cancelAppointment(id) {

        const appointmentUrl = `http://localhost:8080/api/appointments/${id}/cancel`
        const fetchConfig = { method: 'put' };

        const response = await fetch(appointmentUrl, fetchConfig);
        if (response.ok) {
        fetchData();
        }
    }

    async function finishAppointment(id) {
        const appointmentUrl = `http://localhost:8080/api/appointments/${id}/finish`
        const fetchConfig = { method: 'put' };
        const response = await fetch(appointmentUrl, fetchConfig);
        if (response.ok) {
        fetchData();
        }
    }


    return (
        <div className="my-5 container">
            <h1>Appointments</h1>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Time</th>
                        <th>Reason</th>
                        <th>VIN</th>
                        <th>Customer</th>
                        <th>Technician</th>
                    </tr>
                </thead>
                <tbody>
                    {appointments.map(appointment => {
                        return (
                        <tr key={appointment.id}>
                            <td> {appointment.vin} </td>
                            <td> {appointment.customer} </td>
                            <td> {new Date(appointment.date_time).toLocaleDateString()} </td>
                            <td> {new Date(appointment.date_time).toLocaleTimeString()} </td>
                            <td> {appointment.technician.first_name + " " + appointment.technician.last_name} </td>
                            <td> {appointment.reason} </td>
                            <td>
                                <button type="button" onClick={() => cancelAppointment(appointment.id)} className="btn btn-danger">Cancel</button>
                                <button type="button" onClick={() => finishAppointment(appointment.id)} className="btn btn-success">Finish</button>
                            </td>
                        </tr>
                    )
                })}
                </tbody>
            </table>
        </div>
    )
}

export default App;
