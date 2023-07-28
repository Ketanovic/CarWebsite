import React, { useEffect, useState } from "react";

export default function AppointmentsList() {
  const [appointments, setAppointments] = useState([]);
  const fetchData = async () => {
    const url = "http://localhost:8080/api/appointments/"

    const response = await fetch(url);

    if (response.ok) {
      const data = await response.json();
      console.log({ "data": data })
      setAppointments(data.appointments)
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="my-5 container">
      <h1>Appointments</h1>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>VIN</th>
            <th>Is VIP?</th>
            <th>Customer</th>
            <th>Date</th>
            <th>Time</th>
            <th>Technician</th>
            <th>Reason</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map(appointment => {
            return (
              <tr key={appointment.vin}>
                <td> {appointment.vin} </td>
                <td> {appointment.is_vip ? "Yes" : "No" } </td>
                <td> {appointment.customer} </td>
                <td> { new Date (appointment.date_time).toLocaleDateString() } </td>
                <td> { new Date (appointment.date_time).toLocaleTimeString() } </td>
                <td> {appointment.technician.first_name + " " + appointment.technician.last_name} </td>
                <td> {appointment.reason} </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
