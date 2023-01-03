import React from 'react';
import './App.css';
import { Navigate, Route, Routes } from 'react-router-dom';
import TicSaludClinicHistoryPage from './pages/tic-salud-clinic-history';
import TicSaludAccessHistoryPage from './pages/tic-salud-access-history';
import PolarisPage from './pages/polaris';
import StatementPage from './pages/statement';
import CustomPage from './pages/custom';

function App() {
  return (
    <Routes>
      <Route path="/" element={ <Navigate to="/polaris" /> }/>
      <Route path="polaris" element={<PolarisPage />}/>
      <Route path="tic-salud">
        <Route index element={<TicSaludClinicHistoryPage />}/>
        <Route path="historial" element={<TicSaludAccessHistoryPage />}/>
      </Route>
      <Route path="statement" element={<StatementPage />}/>
      <Route path="custom" element={<CustomPage />}/>
    </Routes>
  );
}

export default App;
