import React from 'react';
import { NavLink } from 'react-router-dom';

function Nav() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-success">
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/">CarCar</NavLink>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0 justify-content-center">
            <li className="nav-item">
              <NavLink className="nav-link active" aria-current="page" to="/">Home</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/sales">Sales</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/sales/new">Create Sale</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/create">Create shoe</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/create-manufacturer">Create Manufacturer</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/manufacturers">List Manufacturers</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/create-manufacturer">Create Manufacturer</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/vehicle-models">List Vehicle Models</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/create-vehicle-model">Create Vehicle Model</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/inventory">List Automobiles in Inventory</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/create-automobile">Create Automobile in Inventory</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/add-technician">Add a Technician</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/technicians">List all Technicians</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/create-appointment">Create Service Appointment</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/appointments">List all Service Appointments</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/service-history">Service History</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/add-salesperson">Add a Salesperson</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/salespeople">List all Salespeople</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/add-customer">Add a Customer</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/customers">List all Customers</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/record-sale">Record a New Sale</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/sales-history">Show all Sales</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/salesperson-history">Salesperson History</NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Nav;
