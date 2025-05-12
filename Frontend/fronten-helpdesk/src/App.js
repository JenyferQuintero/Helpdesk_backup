import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './Componentes/ProtectedRoute'; 
import { styles } from './App.css';
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import CrearCasoUse from "./pages/CrearCasoUse";
import HomeAdmiPage from "./pages/HomeAdmiPage";
import Tickets from "./pages/Tickets";
import Superadmin from "./pages/Superadmin";
import CrearCasoAdmin from "./pages/CrearCasoAdmin";
import Problemas from "./pages/Problemas";
import Estadisticas from "./pages/Estadisticas";
import Usuarios from "./pages/Usuarios";
import Entidades from "./pages/Entidades";
import Grupos from "./pages/Grupos";
import Categorias from "./pages/Categorias";
import SolucionTickets from "./pages/SolucionTickets";
import EncuestaSatisfaccion from "./pages/EncuestaSatisfaccion";
import TicketHistorial from "./pages/TicketHistorial";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route element={<ProtectedRoute allowedRoles={['administrador', 'tecnico', 'usuario']} />} />
          
          
          {/* Rutas públicas */}
          <Route path="/home" element={<HomePage />} />
          <Route path="/CrearCasoUse" element={<CrearCasoUse />} />
          
          {/* Rutas protegidas */}

          <Route path="/HomeAdmiPage" element={
            <ProtectedRoute allowedRoles={['tecnico']}>
              <HomeAdmiPage />
            </ProtectedRoute>
          } />
          
          <Route path="/Tickets" element={
            <ProtectedRoute allowedRoles={['usuario', 'tecnico', 'administrador']}>
              <Tickets />
            </ProtectedRoute>
          } />
          
          <Route path="/Superadmin" element={
            <ProtectedRoute allowedRoles={['administrador']}>
              <Superadmin />
            </ProtectedRoute>
          } />
          
          <Route path="/CrearCasoAdmin" element={
            <ProtectedRoute allowedRoles={['administrador', 'tecnico']}>
              <CrearCasoAdmin />
            </ProtectedRoute>
          } />
          
          <Route path="/Problemas" element={
            <ProtectedRoute allowedRoles={['tecnico']}>
              <Problemas />
            </ProtectedRoute>
          } />
          
          <Route path="/Estadisticas" element={
            <ProtectedRoute allowedRoles={['tecnico', 'administrador']}>
              <Estadisticas />
            </ProtectedRoute>
          } />
          
          <Route path="/Usuarios" element={
            <ProtectedRoute allowedRoles={['administrador']}>
              <Usuarios />
            </ProtectedRoute>
          } />
          
          <Route path="/Grupos" element={
            <ProtectedRoute allowedRoles={['administrador']}>
              <Grupos />
            </ProtectedRoute>
          } />
          
          <Route path="/Entidades" element={
            <ProtectedRoute allowedRoles={['administrador']}>
              <Entidades />
            </ProtectedRoute>
          } />
          
          <Route path="/Categorias" element={
            <ProtectedRoute allowedRoles={['administrador']}>
              <Categorias />
            </ProtectedRoute>
          } />
          
          <Route path="/tickets/solucion/:id" element={
            <ProtectedRoute allowedRoles={['administrador', 'tecnico']}>
              <SolucionTickets />
            </ProtectedRoute>
          } />
          
          <Route path="/EncuestaSatisfaccion/:surveyId" element={
            <ProtectedRoute allowedRoles={['usuario']}>
              <EncuestaSatisfaccion />
            </ProtectedRoute>
          } />
          
          <Route path="/tickets/:id/historial" element={
            <ProtectedRoute allowedRoles={['usuario', 'tecnico', 'administrador']}>
              <TicketHistorial />
            </ProtectedRoute>
          } />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;


