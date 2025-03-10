import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div>
      <h1>Bienvenido a la página de inicio</h1>
      <Link to="/dashboard">Ir al Dashboard</Link>
    </div>
  );
};

export default HomePage;
