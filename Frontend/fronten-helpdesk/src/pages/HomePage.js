import React, { useState, useEffect } from "react";
import axios from 'axios';
import Logo from "../imagenes/logo proyecto color.jpeg";
import Logoempresarial from "../imagenes/logo empresarial.png";
import { Link } from "react-router-dom";
import { FaMagnifyingGlass, FaPowerOff } from "react-icons/fa6";
import { FiAlignJustify } from "react-icons/fi";
import { FcHome, FcCustomerSupport, FcAnswers } from "react-icons/fc";
import ChatbotIcon from "../imagenes/img chatbot.png";
import styles from "../styles/HomePage.module.css";

const HomePage = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isMenuExpanded, setIsMenuExpanded] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // Estado añadido
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState(null);
  const [searchResults, setSearchResults] = useState([]); // Estado añadido para resultados
  const [completedSurveys, setCompletedSurveys] = useState([]);

// Función para manejar resultados de búsqueda
const onSearchResults = (results) => {
  setSearchResults(results);
};

  // Debounce: espera 500ms después del último cambio antes de buscar
  useEffect(() => {
    if (searchTerm.trim().length === 0) return;

    const debounceTimer = setTimeout(() => {
      handleSearch();
    }, 500); // Tiempo de espera (ajústalo según necesidad)

    return () => clearTimeout(debounceTimer); // Limpia el timer si el término cambia antes
  }, [searchTerm]);

  const handleSearch = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.get('http://localhost:5000/api/search', {
        params: { query: searchTerm }
      });
      onSearchResults(response.data);
    } catch (err) {
      setError('Error al buscar');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };
  const nombre = localStorage.getItem("nombre");
  const toggleMenu = () => setIsMenuExpanded(!isMenuExpanded);
  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  // Datos de ejemplo para las tablas
  const tableData = {
    nuevo: [
      { id: "2503150021", solicitante: "Julian Antonio Niño Oedoy", elementos: "General", descripcion: "ALTA MÉDICA (1 - 0)" }
    ],
    enCurso: [
      { id: "2503160088", solicitante: "HUN HUN Generico", elementos: "General", descripcion: "LLAMADO DE TIMBRES (1 - 0)" },
      { id: "2503160088", solicitante: "Wendy Johanna Alfonso Peralta", elementos: "General", descripcion: "CONFIGURAR IMPRESORA (1 - 0)" }
    ],
    enEspera: [
      { id: "2503160088", solicitante: "HUN HUN Generico", elementos: "General", descripcion: "LLAMADO DE TIMBRES (1 - 0)" },
      { id: "2503160088", solicitante: "Wendy Johanna Alfonso Peralta", elementos: "General", descripcion: "CONFIGURAR IMPRESORA (1 - 0)" }
    ],
    resueltos: [
      { id: "2503160088", solicitante: "HUN HUN Generico", elementos: "General", descripcion: "LLAMADO DE TIMBRES (1 - 0)" },
      { id: "2503160088", solicitante: "Wendy Johanna Alfonso Peralta", elementos: "General", descripcion: "CONFIGURAR IMPRESORA (1 - 0)" }
    ],
    cerrados: [
      { id: "2503160088", solicitante: "HUN HUN Generico", elementos: "General", descripcion: "LLAMADO DE TIMBRES (1 - 0)" },
      { id: "2503160088", solicitante: "Wendy Johanna Alfonso Peralta", elementos: "General", descripcion: "CONFIGURAR IMPRESORA (1 - 0)" }
    ],
    borrados: [
      { id: "2503160088", solicitante: "HUN HUN Generico", elementos: "General", descripcion: "LLAMADO DE TIMBRES (1 - 0)" },
      { id: "2503160088", solicitante: "Wendy Johanna Alfonso Peralta", elementos: "General", descripcion: "CONFIGURAR IMPRESORA (1 - 0)" }
    ],
    encuesta: [
      { id: "2503160088", solicitante: "HUN HUN Generico", elementos: "General", descripcion: "LLAMADO DE TIMBRES (1 - 0)", surveyId: "survey1"  },
      { id: "2503160088", solicitante: "Wendy Johanna Alfonso Peralta", elementos: "General", descripcion: "CONFIGURAR IMPRESORA (1 - 0)", surveyId: "survey2"  }
    ]
  };

  // Filtrar encuestas no completadas
  const pendingSurveys = tableData.encuesta.filter(
    survey => !completedSurveys.includes(survey.surveyId)
  );

  // Función para marcar encuesta como completada
  const markSurveyAsCompleted = (surveyId) => {
    setCompletedSurveys([...completedSurveys, surveyId]);
  };

  // Renderizado modificado de la tabla de encuestas
  const renderSurveyTable = (data, title) => {
    return (
      <div className={styles.tablaContainer}>
        <h2>{title.toUpperCase()}</h2>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>SOLICITANTE</th>
              <th>ELEMENTOS ASOCIADOS</th>
              <th>DESCRIPCIÓN</th>
              <th>ACCIÓN</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index}>
                <td>ID: {item.id}</td>
                <td>{item.solicitante}</td>
                <td>{item.elementos}</td>
                <td>{item.descripcion}</td>
                <td>
                  <Link 
                    to={`/EncuestaSatisfaccion/${item.surveyId}`}
                    onClick={() => markSurveyAsCompleted(item.surveyId)}
                    className={styles.surveyLink}
                  >
                    Realizar Encuesta
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };


  const tickets = [
    { label: "Nuevo", color: "green", icon: "🟢", count: tableData.nuevo.length, key: "nuevo" },
    { label: "En curso", color: "lightgreen", icon: "⭕", count: tableData.enCurso.length, key: "enCurso" },
    { label: "En espera", color: "orange", icon: "🟡", count: tableData.enEspera.length, key: "enEspera" },
    { label: "Resueltas", color: "gray", icon: "⚪", count: tableData.resueltos.length, key: "resueltos" },
    { label: "Cerrado", color: "black", icon: "⚫", count: tableData.cerrados.length, key: "cerrados" },
    { label: "Borrado", color: "red", icon: "🗑", count: tableData.borrados.length, key: "borrados" },
    { label: "Encuesta de Satisfacción", color: "purple", icon: "📅", count: pendingSurveys.length, key: "encuesta" },
  ];

  const handleTabClick = (tabKey) => {
    setActiveTab(activeTab === tabKey ? null : tabKey);
  };

  const renderTable = (data, title) => {
    return (
      <div className={styles.tablaContainer}>
        <h2>{title.toUpperCase()}</h2>
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
            {data.map((item, index) => (
              <tr key={index}>
                <td>ID: {item.id}</td>
                <td>{item.solicitante}</td>
                <td>{item.elementos}</td>
                <td>{item.descripcion}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };


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
            <input
              className={styles.search}
              type="text"
              placeholder="Buscar..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button
              className={styles.buttonBuscar}
              title="Buscar"
              disabled={isLoading || !searchTerm.trim()}
            >
              <FaMagnifyingGlass className={styles.searchIcon} />
            </button>
            {isLoading && <span className={styles.loading}>Buscando...</span>}
            {error && <div className={styles.errorMessage}>{error}</div>}
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
              <div 
                key={index} 
                className={`${styles.card} ${activeTab === ticket.key ? styles.activeCard : ''}`} 
                style={{ borderColor: ticket.color }}
                onClick={() => handleTabClick(ticket.key)}
              > 
                <span className={styles.icon}>{ticket.icon}</span>
                <span className={styles.label}>{ticket.label}</span>
                <span className={styles.count}>{ticket.count}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Mostrar la tabla correspondiente al tab activo */}
        {activeTab === 'nuevo' && renderTable(tableData.nuevo, 'Nuevo')}
        {activeTab === 'enCurso' && renderTable(tableData.enCurso, 'En Curso')}
        {activeTab === 'enEspera' && renderTable(tableData.enEspera, 'En Espera')}
        {activeTab === 'resueltos' && renderTable(tableData.resueltos, 'Resueltos')}
        {activeTab === 'cerrados' && renderTable(tableData.cerrados, 'Cerrados')}
        {activeTab === 'borrados' && renderTable(tableData.borrados, 'Borrados')}
        {activeTab === 'encuesta' && renderSurveyTable(pendingSurveys, 'Encuesta de Satisfacción pendientes')}

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