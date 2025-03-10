import React from "react";
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
