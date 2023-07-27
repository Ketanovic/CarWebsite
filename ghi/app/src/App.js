import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import ListTechnician from '.ListTechnician';
import React, { useEffect, useState } from "react";

function App() {
  const [models, setModels] = useState([]);

  async function getModels() {
    const modelUrl = 'http://localhost:8100/api/models/'
    const response = await fetch(modelUrl)
    if (response.ok) {
      const data = await response.json();
      setModels(data.models)
    }
  }

  useEffect(() => {
    getModels();
  }, [])

  return (
    <BrowserRouter>
      <Nav />

      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/technicians" element={<ListTechnician />} />
          <Route path="/add-technician" element={<AddTechnician />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
