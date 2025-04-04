import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import CrearCasoUse from "./pages/CrearCasoUse";
import HomeAdmiPage from "./pages/HomeAdmiPage";
import Tickets from "./pages/Tickets";
import Superadmin from "./pages/Superadmin";
import SuperadminLayout from "./pages/SuperadminLayout";
import CrearCasoAdmin from "./pages/CrearCasoAdmin";
import Problemas from "./pages/Problemas";
import Estadisticas from "./pages/Estadisticas";
import Usuarios from "./pages/Usuarios";
import Entidades from "./pages/Entidades";
import Grupos from "./pages/Grupos";
import Categorias from "./pages/Categorias";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/CrearCasoUse" element={<CrearCasoUse />} />
        <Route path="/HomeAdmiPage" element={<HomeAdmiPage />} />
        <Route path="/Tickets" element={<Tickets />} />
        <Route path="/Superadmin" element={<Superadmin />} />
        <Route path="/CrearCasoAdmin" element={<CrearCasoAdmin />} />
        <Route path="/Problemas" element={<Problemas />} />
        <Route path="/Estadisticas" element={<Estadisticas />} />
        <Route path="/Usuarios" element={<Usuarios />} />
        <Route path="/Grupos" element={<Grupos />} />
        <Route path="/Entidades" element={<Entidades />} />
        <Route path="/Categorias" element={<Categorias />} /> 
      
    
      </Routes>
    </Router>
  );
}

export default App;


