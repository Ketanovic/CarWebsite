import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import SalespersonForm from './CreateSalesPersonForm';
import CustomerForm from './CreateCustomerForm';
import CustomerList from './ListCustomers';
import SaleForm from "./CreateSaleForm";
import SalesList from "./ListSales";
import SalespeopleList from "./ListSalespeople";
import AddAppointment from "./AddAppointment";
import TechnicianForm from "./AddTechnician";
import AppointmentsList from "./ListAppointment";
import TechniciansList from "./ListTechnician";
import Manufacturer from "./ListManufacturers";
import ManufacturerForm from "./CreateManufacturerForm";
import AutomobilesList from "./AutomobileList";
import AutomobilesForm from './CreateAutomobileForm';
import ModelForm from './CreateModelsForm';
import ModelsList from './ModelsList';
import SalespersonHistory from "./SalespersonHistory";

function App() {
  const [models, setModels] = useState([]);
  const [automobiles, setAutomobiles] = useState([]);
  const [salespeople, setSalespeople] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [sales, setSales] = useState([]);

  async function getSales() {
    const salesUrl = 'http://localhost:8090/api/sales/'
    const response = await fetch(salesUrl)
    if (response.ok) {
      const data = await response.json();
      setSales(data.sales)
    }
  }

  async function getModels() {
    const modelUrl = 'http://localhost:8100/api/models/'
    const response = await fetch(modelUrl)
    if (response.ok) {
      const data = await response.json();
      setModels(data.models)
    }
  }

  async function getAutomobiles() {
    const modelUrl = 'http://localhost:8100/api/automobiles/'
    const response = await fetch(modelUrl)
    if (response.ok) {
      const data = await response.json();
      setAutomobiles(data.automobiles)
    }
  }

  async function getSalespeople() {
    const salespeopleUrl = 'http://localhost:8090/api/salespeople/'
    const response = await fetch(salespeopleUrl)
    if (response.ok) {
      const data = await response.json();
      setSalespeople(data.salespeople)
    }
  }

  async function getCustomers() {
    const customerUrl = 'http://localhost:8090/api/customers/'
    const response = await fetch(customerUrl)
    if (response.ok) {
      const data = await response.json();
      setCustomers(data.customers)
    }
  }


  useEffect(() => {
    getModels();
    getSales();
    getAutomobiles();
    getSalespeople();
    getCustomers();
  }, [])

  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/salespeople" element={<SalespeopleList salespeople={salespeople} />} />
          <Route path="/add-salesperson" element={<SalespersonForm getSalespeople={getSalespeople} />} />
          <Route path="/salesperson-history" element={<SalespersonHistory salespeople={salespeople} sales={sales} />} />
          <Route path="/customers" element={<CustomerList customers={customers} />} />
          <Route path="/add-customer" element={<CustomerForm getCustomers={getCustomers} />} />
          <Route path="/sales-history" element={<SalesList sales={sales} />} />
          <Route path="record-sale" element={<SaleForm automobiles={automobiles} salespeople={salespeople} customers={customers} getSales={getSales} />} />
          <Route path="/technicians" element={<TechniciansList />} />
          <Route path="/add-technician" element={<TechnicianForm />} />
          <Route path="/appointments" element={<AppointmentsList />} />
          <Route path="/create-appointment" element={<AddAppointment />} />
          <Route path="/manufacturers" element={<Manufacturer />} />
          <Route path="/create-manufacturer" element={<ManufacturerForm />} />
          <Route path="/vehicle-models" element={<ModelsList models={models} />} />
          <Route path="/create-vehicle-model" element={<ModelForm getModels={getModels} />} />
          <Route path="/inventory" element={<AutomobilesList automobiles={automobiles} />} />
          <Route path="/create-automobile" element={<AutomobilesForm getAutomobiles={getAutomobiles} />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
