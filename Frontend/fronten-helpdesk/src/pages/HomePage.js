import React, { useState } from "react";
import Imag from "../imagenes/logo proyecto color.jpeg";
import { Link } from "react-router-dom";
import { FaDisplay, FaPowerOff } from "react-icons/fa6";
import { PiGearSixFill } from "react-icons/pi";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { FaHouseMedicalCircleCheck, FaInfoCircle, FaExclamationTriangle } from "react-icons/fa";
import "../styles/HomePage.css";
import ChatbotIcon from "../imagenes/img chatbot.png";

const HomePage = () => {
  // Estado para controlar la visibilidad del chat
  const [isChatOpen, setIsChatOpen] = useState(false);

  // Estado para controlar la vista activa
  const [activeView, setActiveView] = useState("personal"); // "personal", "global" o "todo"

  // Función para abrir/cerrar el chat
  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };



  // Datos de tickets
  const tickets = [
    { label: "Nuevo", color: "green", icon: "🟢", count: 0 },
    { label: "En curso (asignada)", color: "lightgreen", icon: "⭕", count: 0 },
    { label: "En curso (planificada)", color: "#4169E1", icon: "📅", count: 0 },
    { label: "En espera", color: "orange", icon: "🟡", count: 0 },
    { label: "Resueltas", color: "gray", icon: "⚪", count: 0 },
    { label: "Cerrado", color: "black", icon: "⚫", count: 0 },
    { label: "Borrado", color: "red", icon: "🗑", count: 0 },
  ];



  return (
    <div>
      {/* Encabezado */}
      <header className="container-inicio">
        {/* Botón de Inicio */}
        <div className="container-inicio-img">
          <li className="inicio">
            <Link to="/home" className="link-sin-subrayado">Inicio</Link>
          </li>
        </div>

        {/* Contenedor para el input, nombre de usuario y el ícono */}
        <div className="input-container">
          {/* Input de búsqueda */}
          <div className="search-container">
            <input
              type="text"
              placeholder="Buscar"
              className="search"
            />
            <button
              type="submit"
              className="button-buscar"
              title="Buscar"
            >
              <FaMagnifyingGlass className="search-icon" />
            </button>
          </div>

          {/* Nombre de usuario y ícono de cerrar sesión */}
          <div className="user-container">
            <span className="username">Bienvenido, <span id="nombreusuario"></span></span>
            <div className="icon-container">
              <Link to="/">
                <FaPowerOff className="icon" />
              </Link>
            </div>
          </div>
        </div>
      </header>
      <div className="container">

        {/* Contenedor de Tickets */}
        <div className="section-container">
          <h2>Tickets</h2>
          <div className="cards-container">
            {tickets.map((ticket, index) => (
              <div key={index} className="card" style={{ borderColor: ticket.color }}>
                <span className="icon">{ticket.icon}</span>
                <span className="label">{ticket.label}</span>
                <span className="count">{ticket.count}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Tabla de encuesta de satisfacción */}
        <div className="tabla-container">
          <h2>ENCUESTA DE SATISFACCIÓN</h2>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>SOLICITANTE</th>
                <th>ELEMENTOS ASOCIADOS</th>
                <th>DESCRIPCIÓN</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>ID: 2503150021</td>
                <td>Julian Antonio Niño Oedoy</td>
                <td>General</td>
                <td>ALTA MEDICA (1 - 0)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>


      {/* Chatbot */}
      <div className="chatbot-container">
        {/* Imagen del chatbot */}
        <img
          src={ChatbotIcon}
          alt="Chatbot"
          className="chatbot-icon"
          onClick={toggleChat}
        />

        {/* Chat (se muestra solo si isChatOpen es true) */}
        {isChatOpen && (
          <div className="chat-window">
            <div className="chat-header">
              <h4>Chat de Soporte</h4>
              <button onClick={toggleChat} className="close-chat">
                &times;
              </button>
            </div>
            <div className="chat-body">
              <p>Bienvenido al chat de soporte. ¿En qué podemos ayudarte?</p>
            </div>
            <div className="chat-input">
              <input type="text" placeholder="Escribe un mensaje..." />
              <button>Enviar</button>
            </div>
          </div>
        )}
      </div>
    </div >
  );
};

export default HomePage;