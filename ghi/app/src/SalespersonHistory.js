import React, { useState } from "react";

export default function SalespersonHistory({ salespeople, sales }) {
  const [salesperson, setSalesperson] = useState("");


  const handleChangeSalesperson = (event) => {
    setSalesperson(event.target.value);
  };


  return (
    <div className="row">
      <div className="offset-2 col-8">
        <div className="shadow p-4 mt-4">
          <h1>Salesperson History</h1>
          <div className="mb-3">
            <select value={salesperson} onChange={handleChangeSalesperson} required name="salesperson" id="salesperson" className="form-select">
              <option value="">Choose a salesperson</option>
              {salespeople.map((person) => (
                <option key={person.pk} value={person.pk}>
                  {person.first_name} {person.last_name}
                </option>
              ))}
            </select>
          </div>
          </div>
          {salesperson && (
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>Salesperson</th>
                  <th>Customer</th>
                  <th>VIN</th>
                  <th>Price</th>
                </tr>
              </thead>
              <tbody>
              {sales.map(sale => {
                if (String(sale.salesperson.pk) === String(salesperson)) {
              return (
                <tr key={sale.automobile.vin}>
                  <td>{sale.salesperson.first_name} {sale.salesperson.last_name}</td>
                  <td>{sale.customer.first_name} {sale.customer.last_name}</td>
                  <td>{sale.automobile.vin}</td>
                  <td>{sale.price}</td>
                </tr>
              )
                }
            })}
            </tbody>
            </table>
          )}
        </div>
    </div>
  );
}
