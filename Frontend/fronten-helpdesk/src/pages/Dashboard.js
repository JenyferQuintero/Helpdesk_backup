import React from "react";
import axios from "axios";  
import { Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <div>
      <h1>Panel de control</h1>

      
      <Link to="/">Volver al inicio</Link>
    </div>
  );
};

export default Dashboard;
