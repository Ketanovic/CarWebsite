import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import ListTechnician from './ListTechnician';
import AddTechnician from './AddTechnician'

function App() {
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
