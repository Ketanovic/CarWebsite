import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import ListTechnician from '.ListTechnician';

function App(props) {
  return (
    <BrowserRouter>
      <Nav />

      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/" element={<ListTechnician />} />
        </Routes>
      </div>
    </BrowserRouter>
    );
  }

export default App;
