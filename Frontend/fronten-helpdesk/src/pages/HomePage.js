import React, { useState } from "react";
import Logo from "../imagenes/logo proyecto color.jpeg";
import Logoempresarial from "../imagenes/logo empresarial.png"
import { Link } from "react-router-dom";
import { FaMagnifyingGlass, FaPowerOff } from "react-icons/fa6";
import { FiAlignJustify } from "react-icons/fi";
import { FcHome, FcCustomerSupport, FcAnswers } from "react-icons/fc";
import ChatbotIcon from "../imagenes/img chatbot.png";
import "../styles/HomePage.css";

const HomePage = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

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
      {/* Menú desplegable */}
      <aside className="menu-vertical">
        <div className="container-fluid-menu">
          {/* Logo */}
          <div className="logo-container">
            <img src={Logo} alt="Logo" />
          </div>

          {/* Botón del menú */}
          <button className="menu-button" type="button">
            <FiAlignJustify className="menu-icon" />
          </button>

          {/* Menú desplegable */}
          <div className="menu-vertical-desplegable">
            <ul className="menu-iconos">
              <li className="iconos-menu">
                <Link to="/home" className="link-sin-subrayado">
                  <FcHome className="menu-icon" />
                  <span className="menu-text">Inicio</span>
                </Link>
              </li>
              <li className="iconos-menu">
                <Link to="/crearcaso" className="link-sin-subrayado">
                  <FcCustomerSupport className="menu-icon" />
                  <span className="menu-text">Crear Caso</span>
                </Link>
              </li>
              <li className="iconos-menu">
                <Link to="/tickets" className="link-sin-subrayado">
                  <FcAnswers className="menu-icon" />
                  <span className="menu-text">Tickets</span>
                </Link>
              </li>
            </ul>
          </div>
          <div className="empresarial-container">
            <img src={Logoempresarial} alt="Logoempresarial" />
          </div>
        </div>
      </aside>

      {/* Header */}
      <header className="container-inicio">
        <div className="container-inicio-img">
          <Link to="/home" className="link-sin-subrayado">
            <FcHome className="menu" />
            <span>Inicio</span>
          </Link>
        </div>

        <div className="input-container">
          <div className="search-container">
            <input type="text" placeholder="Buscar" className="search" />
            <button type="submit" className="button-buscar" title="Buscar">
              <FaMagnifyingGlass className="search-icon" />
            </button>
          </div>

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

      {/* Contenedor principal */}
      <div className="container">
        <div className="section-container">
          <div className="ticket-container">
            <li className="creacion">
              <a className="creacion-de-ticket">Creación de Ticket</a>
            </li>
          </div>

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
                <td>ALTA MÉDICA (1 - 0)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Chatbot */}
      <div className="chatbot-container">
        <img
          src={ChatbotIcon}
          alt="Chatbot"
          className="chatbot-icon"
          onClick={toggleChat}
        />

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
    </div>
  );
};

export default HomePage;