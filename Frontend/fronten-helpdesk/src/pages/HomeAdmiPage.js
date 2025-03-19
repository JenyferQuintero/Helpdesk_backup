import React, { useState } from "react";
import Logo from "../imagenes/logo proyecto color.jpeg";
import Logoempresarial from "../imagenes/logo empresarial.png";
import { Link } from "react-router-dom";
import { FaMagnifyingGlass, FaPowerOff } from "react-icons/fa6";
import { FiAlignJustify } from "react-icons/fi";
import { FcHome, FcAssistant, FcBusinessman, FcAutomatic } from "react-icons/fc";
import "../styles/HomeAdmiPage.css";
import ChatbotIcon from "../imagenes/img chatbot.png";

const HomeAdmiPage = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [activeView, setActiveView] = useState("personal");
  const [isSupportOpen, setIsSupportOpen] = useState(false); // Estado para el submenú de Soporte
  const [isAdminOpen, setIsAdminOpen] = useState(false); // Estado para el submenú de Administración
  const [isConfigOpen, setIsConfigOpen] = useState(false); // Estado para el submenú de Configuración

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  const toggleSupport = () => {
    setIsSupportOpen(!isSupportOpen);
    setIsAdminOpen(false); // Cerrar otros submenús
    setIsConfigOpen(false);
  };

  const toggleAdmin = () => {
    setIsAdminOpen(!isAdminOpen);
    setIsSupportOpen(false); // Cerrar otros submenús
    setIsConfigOpen(false);
  };

  const toggleConfig = () => {
    setIsConfigOpen(!isConfigOpen);
    setIsSupportOpen(false); // Cerrar otros submenús
    setIsAdminOpen(false);
  };

  const handleSelectChange = (event) => {
    const value = event.target.value;
    setActiveView(value === "0" ? "personal" : value === "1" ? "global" : "todo");
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

  const problems = [
    { label: "Nuevo", color: "green", icon: "🟢", count: 0 },
    { label: "Aceptado", color: "#008000", icon: "✔", count: 0 },
    { label: "En curso (asignada)", color: "lightgreen", icon: "⭕", count: 0 },
    { label: "En curso (planificada)", color: "#4169E1", icon: "📅", count: 0 },
    { label: "En espera", color: "orange", icon: "🟡", count: 0 },
    { label: "Resueltas", color: "gray", icon: "⚪", count: 0 },
    { label: "Bajo observación", color: "black", icon: "👁", count: 0 },
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

              {/* Ícono de Soporte */}
              <li className="iconos-menu">
                <div className="link-sin-subrayado" onClick={toggleSupport}>
                  <FcAssistant className="menu-icon" />
                  <span className="menu-text">Soporte</span>
                </div>
                {isSupportOpen && (
                  <ul className="submenu">
                    <li>
                      <Link to="/tickets" className="submenu-link">
                        Tickets
                      </Link>
                    </li>
                    <li>
                      <Link to="/crearcaso" className="submenu-link">
                        Crear Caso
                      </Link>
                    </li>
                    <li>
                      <Link to="/problemas" className="submenu-link">
                        Problemas
                      </Link>
                    </li>
                    <li>
                      <Link to="/estadisticas" className="submenu-link">
                        Estadísticas
                      </Link>
                    </li>
                  </ul>
                )}
              </li>

              {/* Ícono de Administración */}
              <li className="iconos-menu">
                <div className="link-sin-subrayado" onClick={toggleAdmin}>
                  <FcBusinessman className="menu-icon" />
                  <span className="menu-text">Administración</span>
                </div>
                {isAdminOpen && (
                  <ul className="submenu">
                    <li>
                      <Link to="/usuarios" className="submenu-link">
                        Usuarios
                      </Link>
                    </li>
                    <li>
                      <Link to="/grupos" className="submenu-link">
                        Grupos
                      </Link>
                    </li>
                    <li>
                      <Link to="/entidades" className="submenu-link">
                        Entidades
                      </Link>
                    </li>
                  </ul>
                )}
              </li>

              {/* Ícono de Configuración */}
              <li className="iconos-menu">
                <div className="link-sin-subrayado" onClick={toggleConfig}>
                  <FcAutomatic className="menu-icon" />
                  <span className="menu-text">Configuración</span>
                </div>
                {isConfigOpen && (
                  <ul className="submenu">
                    <li>
                      <Link to="/categorias" className="submenu-link">
                        Categorías
                      </Link>
                    </li>
                  </ul>
                )}
              </li>
            </ul>
          </div>

          {/* Logo empresarial */}
          <div className="empresarial-container">
            <img src={Logoempresarial} alt="Logoempresarial" />
          </div>
        </div>
      </aside>

      {/* Encabezado */}
      <header className="container-inicio">
        {/* Botón de Inicio */}
        <div className="container-inicio-img">
          <li className="inicio">
            <Link to="/HomeAdmiPage" className="link-sin-subrayado">Inicio</Link>
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

      {/* Container de vistas */}
      <div className="container">
        <div>
          <main>
            <div className="flex-columna">
              <div className="row">
                <div className="col">
                  <div className="flex-column-horizontal">
                    {/* Lista de opciones */}
                    <ul className="nav-tabla-vistas">
                      <li className="nav-item" onClick={() => setActiveView("personal")}>
                        <a className="vista-personal">Vista Personal</a>
                      </li>
                      <li className="nav-item" onClick={() => setActiveView("global")}>
                        <a className="vista-global">Vista Global</a>
                      </li>
                      <li className="nav-item" onClick={() => setActiveView("todo")}>
                        <a className="todo">Todo</a>
                      </li>
                    </ul>
                    {/* Select para pantallas pequeñas */}
                    <select className="form-select" onChange={handleSelectChange}>
                      <option value={0}>Vista Personal</option>
                      <option value={1}>Vista Global</option>
                      <option value={2}>Todo</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>

        {/* Container de tablas */}
        <div className="app-container">
          {/* Mostrar secciones de "Vista Personal" si activeView es "personal" o "todo" */}
          {(activeView === "personal" || activeView === "todo") && (
            <>
              {/* Tabla de casos a cerrar */}
              <div className="tabla-container">
                <h2>SUS CASOS A CERRAR</h2>
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
                      <td>ID: 2503160091</td>
                      <td>Santiago Caricena Corredor</td>
                      <td>General</td>
                      <td>NO LE PERMITE REALIZA NINGUNA ACCIÓN - USUARIO TEMPORAL (1 - 0)</td>
                    </tr>
                    <tr>
                      <td>ID: 2503160090</td>
                      <td>Santiago Caricena Corredor</td>
                      <td>General</td>
                      <td>CONFIGURAR IMPRESORA (1 - 0)</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Tabla de casos en curso */}
              <div className="tabla-container">
                <h2>SUS CASOS EN CURSO</h2>
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
                      <td>ID: 2503160088</td>
                      <td>HUN HUN Generico</td>
                      <td>General</td>
                      <td>LLAMOO DE TIMBRES (1 - 0)</td>
                    </tr>
                    <tr>
                      <td>ID: 2503160088</td>
                      <td>Wendy Johanna Alfonso Peralta</td>
                      <td>General</td>
                      <td>CONFIGURAR IMPRESORA (1 - 0)</td>
                    </tr>
                  </tbody>
                </table>
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
            </>
          )}

          {/* Mostrar secciones de "Vista Global" si activeView es "global" o "todo" */}
          {(activeView === "global" || activeView === "todo") && (
            <>
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

              {/* Contenedor de Problemas */}
              <div className="section-container">
                <h2>Problemas</h2>
                <div className="cards-container">
                  {problems.map((problem, index) => (
                    <div key={index} className="card" style={{ borderColor: problem.color }}>
                      <span className="icon">{problem.icon}</span>
                      <span className="label">{problem.label}</span>
                      <span className="count">{problem.count}</span>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
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
    </div>
  );
};

export default HomeAdmiPage;