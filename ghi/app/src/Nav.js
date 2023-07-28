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
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink className="nav-link" to="/">Home</NavLink>
            </li>
            <li className="nav-item dropdown">
              <NavLink className="nav-link dropdown-toggle" to="#" id="inventoryDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Inventory
              </NavLink>
              <ul className="dropdown-menu" aria-labelledby="inventoryDropdown">
                <li><NavLink className="dropdown-item" to="/inventory">List Automobiles</NavLink></li>
                <li><NavLink className="dropdown-item" to="/create-automobile">Create Automobile</NavLink></li>
              </ul>
            </li>
            <li className="nav-item dropdown">
              <NavLink className="nav-link dropdown-toggle" to="#" id="manufacturersDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Manufacturers
              </NavLink>
              <ul className="dropdown-menu" aria-labelledby="manufacturersDropdown">
                <li><NavLink className="dropdown-item" to="/manufacturers">List Manufacturers</NavLink></li>
                <li><NavLink className="dropdown-item" to="/create-manufacturer">Create Manufacturer</NavLink></li>
              </ul>
            </li>
            <li className="nav-item dropdown">
              <NavLink className="nav-link dropdown-toggle" to="#" id="modelsDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Models
              </NavLink>
              <ul className="dropdown-menu" aria-labelledby="modelsDropdown">
                <li><NavLink className="dropdown-item" to="/vehicle-models">List Vehicle Models</NavLink></li>
                <li><NavLink className="dropdown-item" to="/create-vehicle-model">Create Vehicle Model</NavLink></li>
              </ul>
            </li>
            <li className="nav-item dropdown">
              <NavLink className="nav-link dropdown-toggle" to="#" id="techniciansDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Technicians
              </NavLink>
              <ul className="dropdown-menu" aria-labelledby="techniciansDropdown">
                <li><NavLink className="dropdown-item" to="/add-technician">Add a Technician</NavLink></li>
                <li><NavLink className="dropdown-item" to="/technicians">List all Technicians</NavLink></li>
              </ul>
            </li>
            <li className="nav-item dropdown">
              <NavLink className="nav-link dropdown-toggle" to="#" id="appointmentsDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Appointments
              </NavLink>
              <ul className="dropdown-menu" aria-labelledby="appointmentsDropdown">
                <li><NavLink className="dropdown-item" to="/create-appointment">Create Service Appointment</NavLink></li>
                <li><NavLink className="dropdown-item" to="/appointments">List all Service Appointments</NavLink></li>
                <li><NavLink className="dropdown-item" to="/service-history">Service History</NavLink></li>
              </ul>
            </li>
            <li className="nav-item dropdown">
              <NavLink className="nav-link dropdown-toggle" to="#" id="salesDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Sales
              </NavLink>
              <ul className="dropdown-menu" aria-labelledby="salesDropdown">
                <li><NavLink className="dropdown-item" to="/record-sale">Record a New Sale</NavLink></li>
                <li><NavLink className="dropdown-item" to="/sales-history">Show all Sales</NavLink></li>
                <li><NavLink className="dropdown-item" to="/salesperson-history">Salesperson History</NavLink></li>
              </ul>
            </li>
            <li className="nav-item dropdown">
              <NavLink className="nav-link dropdown-toggle" to="#" id="peopleDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                People
              </NavLink>
              <ul className="dropdown-menu" aria-labelledby="peopleDropdown">
                <li><NavLink className="dropdown-item" to="/add-salesperson">Add a Salesperson</NavLink></li>
                <li><NavLink className="dropdown-item" to="/salespeople">List all Salespeople</NavLink></li>
                <li><NavLink className="dropdown-item" to="/add-customer">Add a Customer</NavLink></li>
                <li><NavLink className="dropdown-item" to="/customers">List all Customers</NavLink></li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Nav;
