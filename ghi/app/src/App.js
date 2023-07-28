import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import SalespersonForm from './CreateSalespersonForm';
import Salespeople from './ListSalespeople';

function App() {
  const [salespeople, setSalespeople] = useState([]);

  async function fetchSalespeople() {
    const salespeopleUrl = 'http://localhost:8090/api/salespeople/';
    const response = await fetch(salespeopleUrl);
    if (response.ok) {
      const data = await response.json();
      setSalespeople(data.salespeople);
    }
  }

  useEffect(() => {
    fetchSalespeople();
  }, []);

  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/add-salesperson" element={<SalespersonForm />} />
          <Route path="/salespeople" element={<Salespeople />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
