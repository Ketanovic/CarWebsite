import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import SalespersonForm from './CreateSalesPersonForm';
import CustomerForm from './CreateCustomerForm';
import ListCustomers from './ListCustomers';
import SalesForm from "./CreateSaleForm";
import ListSalespeople from "./ListSalespeople";
import AddAppointment from "./AddAppointment";
import AddTechnician from "./AddTechnician";
import AppointmentsList from "./ListAppointment";
import ListTechnician from "./ListTechnician";


function App() {
  const [salespeople, setSalespeople] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [sales, setSales]= useState([]);

  async function fetchSalespeople() {
    const salespeopleUrl = 'http://localhost:8090/api/salespeople/';
    const response = await fetch(salespeopleUrl);
    if (response.ok) {
      const data = await response.json();
      setSalespeople(data.salespeople);
    }
  }

  async function fetchCustomers() {
    const customersUrl = 'http://localhost:8090/api/customers/';
    const response = await fetch(customersUrl);
    if (response.ok) {
      const data = await response.json();
      setCustomers(data.customers);
    }
  }

  async function fetchSales() {
    const salesUrl = 'http://localhost:8090/api/sales';
    const response = await fetch(salesUrl);
    if (response.ok) {
      const data = await response.json();
      setSales(data.sales);
    }
  }

  useEffect(() => {
    fetchSalespeople();
    fetchCustomers();
    fetchSales();
  }, []);



  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/salespeople" element={<ListSalespeople />} />
          <Route path="/add-salesperson" element={<SalespersonForm />} />
          <Route path="/customers" element={<ListCustomers />} />
          <Route path="/add-customer" element={<CustomerForm />} />
          <Route path="record-sale" element={<SalesForm />} />
          <Route path="/technicians" element={<ListTechnician />} />
          <Route path="/add-technician" element={<AddTechnician />} />
          <Route path="/appointments" element={<AppointmentsList />} />
          <Route path="/create-appointment" element={<AddAppointment />} />

        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
