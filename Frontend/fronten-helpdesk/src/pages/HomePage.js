import React, { useState } from "react";
import { Link } from "react-router-dom";  // Para navegación si usas react-router
import Imag from "../imagenes/logo proyecto color.jpeg";
import { FaPowerOff } from "react-icons/fa6";
import { PiGearSixFill } from "react-icons/pi";
import { FaMagnifyingGlass } from "react-icons/fa6";
import "../styles/HomePage.css";  // Usamos un archivo CSS específico para esta página
import ChatbotIcon from "../imagenes/img chatbot.png";
import { FiPlusCircle } from "react-icons/fi";


function HomePage() {
  // Estado para controlar la visibilidad del chat
  const [isChatOpen, setIsChatOpen] = useState(false);

  // Función para abrir/cerrar el chat
  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  return (
    <div className="home-page">
      {/* Encabezado */}
      <header className="encabezado">
        <img src={Imag} alt="Logo" className="proyecto" />
        <div className="input-container">
          <input type="text" placeholder="Buscar" className="search" />
          <FaMagnifyingGlass className="search-icon" />
        </div>
        <PiGearSixFill className="icon" />
        <span className="username">Nombre de Usuario</span>
        <div className="icon-container">
          <Link to="/">
            <FaPowerOff className="icon" />
          </Link>
        </div>
      </header>

      {/* Navegación */}
      <nav>
        <ul>
          <li><Link to="/">Inicio</Link></li>
          <li><Link to="/create-incident">Crear Incidencia</Link></li>
          <li><Link to="/dashboard">Incidencias</Link></li>
        </ul>
      </nav>

      <nav className="inicio">
        <ul>
          <li>
            <Link to="/">Inicio</Link>
          </li>
        </ul>
      </nav>


      {/* Contenido principal */}
      <main>
        <div className="content">
          <div className="titulo-container">
            <h2>Creación de Ticket</h2>
            <Link to="/create-incident" className="icon-link">
              <FiPlusCircle className="circulo" />
            </Link>
          </div>
          <table>
            <thead className="incidencia">
              <tr>
                <th>Incidencias</th>
                <th>Número</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>Nuevo</td><td>0</td></tr>
              <tr><td>En curso</td><td>0</td></tr>
              <tr><td>En espera</td><td>0</td></tr>
              <tr><td>Resueltas</td><td>0</td></tr>
              <tr><td>Cerrado</td><td>0</td></tr>
            </tbody>
          </table>
        </div>
      </main>

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
    </div>
  );
};
export default HomePage;
