import React, { useEffect, useState } from "react";

export default function TechniciansList() {
  const [technicians, setTechnicians] = useState([]);
  const fetchData = async () => {
    const url = "http://localhost:8080/api/technicians/"

    const response = await fetch(url);

    if (response.ok) {
      const data = await response.json();
      setTechnicians(data.technicians);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="my-5 container">
      <h1>Technicians</h1>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Employee ID</th>
            <th>First Name</th>
            <th>Last Name</th>
          </tr>
        </thead>
        <tbody>
          {technicians.map(technician => {
            return (
              <tr key={technician.employee_id}>
                <td> {technician.employee_id} </td>
                <td> {technician.first_name} </td>
                <td> {technician.last_name} </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )

}
