import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import SalespeopleForm from './CreateSalespersonForm';
import SalespeopleList from './SalespeopleList';
import ManufacturersList from './ManufacturersList';
import ManufacturerForm from './ManufacturerForm';
import ListTechnician from './ListTechnician';
import AddTechnician from './AddTechnician';
import ModelForm from './CreateModelForm';
import ModelsList from './ModelsList';
import AutomobilesList from './AutomobilesList';
import AutomobileForm from './CreateAutomobileForm';
import ListAppointment from './ListAppointment';
import AddAppointment from './AddAppointment.js';
import Nav from './Nav';
import React, { useEffect, useState } from "react";

function App() {
  const [models, setModels] = useState([]);
  const [automobiles, setAutomobiles] = useState([]);

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


  useEffect(() => {
    getModels();
    getAutomobiles();
  }, [])

  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
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
        </Routes>
      </div>
    </BrowserRouter>
  );
}
