import React, { useState } from "react";
import Imag from "../imagenes/logo proyecto color.jpeg";
import { Link } from "react-router-dom";
import { FaPowerOff } from "react-icons/fa6";
import { PiGearSixFill } from "react-icons/pi";
import { FaMagnifyingGlass } from "react-icons/fa6";
import "../styles/HomeAdmiPage.css";
import ChatbotIcon from "../imagenes/img chatbot.png";

function HomeAdmiPage () {
  // Estado para controlar la visibilidad del chat
  const [isChatOpen, setIsChatOpen] = useState(false);

  // Función para abrir/cerrar el chat
  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  return (
    <div>
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
      <div>
        <nav className="menu">
          <ul>
            <li>
              <Link to="/create-incident">Soporte</Link>
            </li>
            <li>
              <Link to="/administracion">Administración</Link>
            </li>
            <li>
              <Link to="/configuracion">Configuración</Link>
            </li>
          </ul>
        </nav>

        <nav className="inicio">
          <ul>
            <li>
              <Link to="/">Inicio</Link>
            </li>
          </ul>
        </nav>
      </div>

      {/* Grupo de botones para vistas */}
      <div className="button-group">
        <button className="button">Vista Personal</button>
        <button className="button">Vista Global</button>
        <button className="button">Todo</button>
      </div>

      <div className="container">
        {/* Contenido principal */}
        <main>
          <div className="content">
            <h3>Sus requerimientos a cerrar (0 de 0)</h3>
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Autor</th>
                  <th>Descripción</th>
                </tr>
              </thead>
            </table>
          </div>

          <div className="cerrar">
            <table>
              <tbody>
                <tr>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="content">
            <h3>Requerimientos en estado pendiente (0)</h3>
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Autor</th>
                  <th>Descripción</th>
                </tr>
              </thead>
            </table>
          </div>

          <div className="cerrar">
            <table>
              <tbody>
                <tr>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
              </tbody>
            </table>
          </div>
        </main>
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
    </div>
  );
};

export default HomeAdmiPage;