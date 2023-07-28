import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import SalespersonForm from './CreateSalespersonForm';
import Salespeople from './ListSalespeople';
import CustomerForm from './CreateCustomerForm';
import Customers from './ListCustomers';

function App() {
  const [salespeople, setSalespeople] = useState([]);
  const [customers, setCustomers] = useState([]);

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

  useEffect(() => {
    fetchSalespeople();
    fetchCustomers();
  }, []);

  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
<<<<<<< HEAD
          <Route path="/add-salesperson" element={<SalespersonForm />} />
          <Route path="/salespeople" element={<Salespeople />} />
=======
          <Route path="/salespeople" element={<SalespeopleList salespeople={salespeople} />} />
          <Route path="/salespeople/create" element={<SalespersonForm getSalespeople={getSalespeople} />} />
          <Route path="/manufacturers" element={<ManufacturersList />} />
          <Route path="/manufacturers/create" element={<ManufacturerForm />} />
          <Route path="/technicians" element={<ListTechnician />} />
          <Route path="/technicians/create" element={<AddTechnician />} />
          <Route path="/models" element={<ModelsList />} />
          <Route path="/models/create" element={<ModelForm getModels={getModels} />} />
          <Route path="/automobiles" element={<AutomobilesList getAutomobiles={getAutomobiles} />} />
          <Route path="/automobiles/create" element={<AutomobileForm getAutomobiles={getAutomobiles} />} />
          <Route path="/appointments" element={<AppointmentsList />} />
          <Route path="/appointments/create" element={<AppointmentForm />} />
>>>>>>> a83c001945c862beffb591cd8ab4de82ab7187bf
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
