import React, { useState } from "react";
import { Link, useNavigate }  from "react-router-dom";
import Logo from "../imagenes/logo proyecto color.jpeg";
import Logoempresarial from "../imagenes/logo empresarial.png";
import { FaMagnifyingGlass, FaPowerOff } from "react-icons/fa6";
import { FiAlignJustify } from "react-icons/fi";
import { FcHome, FcCustomerSupport, FcAnswers } from "react-icons/fc";
import ChatbotIcon from "../imagenes/img chatbot.png";
import styles from "../styles/CrearCasoUse.module.css";

const CrearCasoUse = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const navigate = useNavigate();
  const [isMenuExpanded, setIsMenuExpanded] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [formData, setFormData] = useState({
    tipo: "",
    origen: "",
    prioridad: "",
    categoria: "",
    titulo: "",
    descripcion: "",
    archivo: null
  });
  
  const nombre = localStorage.getItem("nombre");
  
  const toggleChat = () => setIsChatOpen(!isChatOpen);
  const toggleMenu = () => setIsMenuExpanded(!isMenuExpanded);
  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: files ? files[0] : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
   console.log("Formulario enviado:", formData);
    navigate("/Tickets");
  };

  return (
       <div className={styles.containerPrincipal}>
      {/* Menú Vertical */}
      <aside 
        className={`${styles.menuVertical} ${isMenuExpanded ? styles.expanded : ""}`} 
        onMouseEnter={toggleMenu} 
        onMouseLeave={toggleMenu}
      >
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
          <div className={`${styles.menuVerticalDesplegable} ${isMobileMenuOpen ? styles.mobileMenuOpen : ''}`}>
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

      {/* Header */}
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

      {/* Contenido Principal */}
      <div className={styles.containercaso} style={{ marginLeft: isMenuExpanded ? "200px" : "60px" }}>
        <div className={styles.sectionContainer}>
          <div className={styles.ticketContainer}>
            <ul className={styles.creacion}>
              <li>
                <Link to="/CrearCasoUse" className={styles.linkSinSubrayado}>
                  <FcCustomerSupport className={styles.menuIcon} />
                  <span className={styles.creacionDeTicket}>Describa el caso a reportar</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Formulario */}
        <div className={styles.formContainerCaso}>
            <form onSubmit={handleSubmit}>
              <div className={styles.formGroupCaso}>
                <label className={styles.casoLabel}>Tipo</label>
                <select 
                  className={styles.casoSelect} 
                  name="tipo" 
                  value={formData.tipo} 
                  onChange={handleChange}
                >
                  <option value="">Seleccione...</option>
                  <option value="incidencia">Incidencia</option>
                  <option value="requerimiento">Requerimiento</option>
                </select>
              </div>

              <div className={styles.formGroupCaso}>
                <label className={styles.casoLabel}>Origen</label>
                <select 
                  className={styles.casoSelect} 
                  name="origen" 
                  value={formData.origen} 
                  onChange={handleChange}
                >
                  <option value="">Seleccione...</option>
                  <option value="departamento1">Departamento 1</option>
                  <option value="departamento2">Departamento 2</option>
                  <option value="departamento3">Departamento 3</option>
                </select>
              </div>

              <div className={styles.formGroupCaso}>
                <label className={styles.casoLabel}>Prioridad</label>
                <select 
                  className={styles.casoSelect} 
                  name="prioridad" 
                  value={formData.prioridad} 
                  onChange={handleChange}
                >
                  <option value="">Seleccione...</option>
                  <option value="alta">Alta</option>
                  <option value="mediana">Mediana</option>
                  <option value="baja">Baja</option>
                </select>
              </div>

              <div className={styles.formGroupCaso}>
                <label className={styles.casoLabel}>Categoría</label>
                <select 
                  className={styles.casoSelect} 
                  name="categoria" 
                  value={formData.categoria} 
                  onChange={handleChange}
                >
                  <option value="">Seleccione...</option>
                  <option value="falla1">Falla 1</option>
                  <option value="falla2">Falla 2</option>
                  <option value="falla3">Falla 3</option>
                </select>
              </div>

              <div className={styles.formGroupCaso}>
                <label className={styles.casoLabel}>Título</label>
                <input
                  className={styles.casoInput}
                  type="text"
                  name="titulo"
                  value={formData.titulo}
                  onChange={handleChange}
                />
              </div>

              <div className={styles.formGroupCaso}>
                <label className={styles.casoLabel}>Descripción</label>
                <textarea
                  className={styles.casoTextarea}
                  name="descripcion"
                  value={formData.descripcion}
                  onChange={handleChange}
                  rows="5"
                />
              </div>

              <div className={styles.formGroupCaso}>
                <label className={styles.casoLabel}>Adjuntar archivo</label>
                <input
                  className={styles.casoFile}
                  type="file"
                  name="archivo"
                  onChange={handleChange}
                />
              </div>

              <button type="submit" className={styles.submitButton}>Enviar</button>
            </form>
          </div>
      </div>

      {/* Chatbot */}
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

export default CrearCasoUse;