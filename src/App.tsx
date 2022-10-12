import React from 'react';
import './App.css';
import { Navigate, Route, Routes } from 'react-router-dom';
import TicSaludClinicHistoryPage from './pages/tic-salud-clinic-history';
import TicSaludAccessHistoryPage from './pages/tic-salud-access-history';
import PolarisPage from './pages/polaris';

function App() {
  return (
    <Routes>
      <Route path="/" element={ <Navigate to="/polaris" /> }/>
      <Route path="polaris" element={<PolarisPage />}/>
      <Route path="tic-salud">
        <Route index element={<TicSaludClinicHistoryPage />}/>
        <Route path="historial" element={<TicSaludAccessHistoryPage />}/>
      </Route>
    </Routes>
  );
}

export default App;
