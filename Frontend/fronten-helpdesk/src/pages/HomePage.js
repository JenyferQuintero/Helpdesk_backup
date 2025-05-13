import React, { useState } from "react";
import Logo from "../imagenes/logo proyecto color.jpeg";
import Logoempresarial from "../imagenes/logo empresarial.png";
import { Link } from "react-router-dom";
import { FaMagnifyingGlass, FaPowerOff } from "react-icons/fa6";
import { FiAlignJustify } from "react-icons/fi";
import { FcHome, FcCustomerSupport, FcAnswers } from "react-icons/fc";
import ChatbotIcon from "../imagenes/img chatbot.png";
import styles from "../styles/HomePage.module.css"; // Importar como módulo

const HomePage = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isMenuExpanded, setIsMenuExpanded] = useState(false);

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };
  const nombre = localStorage.getItem("nombre");
  
  const toggleMenu = () => setIsMenuExpanded(!isMenuExpanded);
  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

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
    <div className={styles.containerPrincipal}>
      <aside className={`${styles.menuVertical} ${isMenuExpanded ? styles.expanded : ""}`} onMouseEnter={toggleMenu} onMouseLeave={toggleMenu}>
        <div className={styles.containerFluidMenu}>
          <div className={styles.logoContainer}>
            <img src={Logo} alt="Logo" />
          </div>
          <button
            className={`${styles.menuButton} ${styles.mobileMenuButton}`}
            type="button"
            onClick={toggleMobileMenu}
          >
            <FiAlignJustify className={styles.menuIcon} />
          </button>
          <div className={styles.menuVerticalDesplegable}>
            <ul className={styles.menuIconos}>
              <li className={styles.iconosMenu}>
                <Link to="/home" className={styles.linkSinSubrayado}>
                  <FcHome className={styles.menuIcon} />
                  <span className={styles.menuText}>Inicio</span>
                </Link>
              </li>
              <li className={styles.iconosMenu}>
                <Link to="/CrearCasoUse" className={styles.linkSinSubrayado}>
                  <FcCustomerSupport className={styles.menuIcon} />
                  <span className={styles.menuText}>Crear Caso</span>
                </Link>
              </li>
              <li className={styles.iconosMenu}>
                <Link to="/Tickets" className={styles.linkSinSubrayado}>
                  <FcAnswers className={styles.menuIcon} />
                  <span className={styles.menuText}>Tickets</span>
                </Link>
              </li>
            </ul>
          </div>
          <div className={styles.empresarialContainer}>
            <img src={Logoempresarial} alt="Logoempresarial" />
          </div>
        </div>
      </aside>

      <header className={styles.containerInicio} style={{ marginLeft: isMenuExpanded ? "200px" : "60px" }}>
        <div className={styles.containerInicioImg}>
          <Link to="/home" className={styles.linkSinSubrayado}>
            <FcHome className={styles.menu} />
            <span>Inicio</span>
          </Link>
        </div>
        <div className={styles.inputContainer}>
          <div className={styles.searchContainer}>
            <input className={styles.search} type="text" placeholder="Buscar" />
            <button type="submit" className={styles.buttonBuscar} title="Buscar">
              <FaMagnifyingGlass className={styles.searchIcon} />
            </button>
          </div>
          <div className={styles.userContainer}>
            <span className={styles.username}>Bienvenido, <span id="nombreusuario">{nombre}</span></span>
            <div className={styles.iconContainer}>
              <Link to="/">
                <FaPowerOff className={styles.icon} />
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className={styles.container} style={{ marginLeft: isMenuExpanded ? "200px" : "60px" }}>
        <div className={styles.sectionContainer}>
          <div className={styles.ticketContainer}>
            <li className={styles.creacion}>
              <Link to="/CrearCasoUse" className={styles.linkSinSubrayado}>
                <FcCustomerSupport className={styles.menuIcon} />
                <span className={styles.creacionDeTicket}>Crear Caso</span>
              </Link>
            </li>
          </div>
          <h2>Tickets</h2>
          <div className={styles.cardsContainer}>
            {tickets.map((ticket, index) => (
              <div key={index} className={styles.card} style={{ borderColor: ticket.color }}>
                <span className={styles.icon}>{ticket.icon}</span>
                <span className={styles.label}>{ticket.label}</span>
                <span className={styles.count}>{ticket.count}</span>
              </div>
            ))}
          </div>
        </div>
        <div className={styles.tablaContainer}>
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

      <div className={styles.chatbotContainer}>
        <img
          src={ChatbotIcon}
          alt="Chatbot"
          className={styles.chatbotIcon}
          onClick={toggleChat}
        />
        {isChatOpen && (
          <div className={styles.chatWindow}>
            <div className={styles.chatHeader}>
              <h4>Chat de Soporte</h4>
              <button onClick={toggleChat} className={styles.closeChat}>
                &times;
              </button>
            </div>
            <div className={styles.chatBody}>
              <p>Bienvenido al chat de soporte. ¿En qué podemos ayudarte?</p>
            </div>
            <div className={styles.chatInput}>
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