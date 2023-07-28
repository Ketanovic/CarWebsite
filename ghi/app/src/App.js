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
          <Route path="/add-salesperson" element={<SalespersonForm />} />
          <Route path="/salespeople" element={<Salespeople />} />
          <Route path="/add-customer" element={<CustomerForm />} />
          <Route path="/customers" element={<Customers />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
