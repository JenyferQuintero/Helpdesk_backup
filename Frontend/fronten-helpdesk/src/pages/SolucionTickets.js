import React, { useState, useEffect } from "react";
import { Outlet, Link, useParams, useNavigate } from "react-router-dom";
// Iconos
import { FaMagnifyingGlass, FaPowerOff } from "react-icons/fa6";
import { FiAlignJustify } from "react-icons/fi";
import { FcHome, FcAssistant, FcBusinessman, FcAutomatic, FcAnswers, FcCustomerSupport, FcExpired, FcGenealogy, FcBullish, FcConferenceCall, FcPortraitMode, FcOrganization } from "react-icons/fc";
import { FaRegClock, FaCheckCircle } from 'react-icons/fa';
// Estilos
import styles from "../styles/SolucionTickets.module.css";
// Imágenes
import Logo from "../imagenes/logo proyecto color.jpeg";
import Logoempresarial from "../imagenes/logo empresarial.png";
import ChatbotIcon from "../imagenes/img chatbot.png";

const SolucionTickets = () => {

  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isMenuExpanded, setIsMenuExpanded] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSupportOpen, setIsSupportOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isConfigOpen, setIsConfigOpen] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const [solucion, setSolucion] = useState('');
  const [accion, setAccion] = useState('seguimiento');
  const [ticket, setTicket] = useState(null);

  useEffect(() => {
    // Aquí podrías hacer una llamada API para obtener los datos del ticket específico
    // Por ahora usaremos datos de ejemplo
    const ticketEjemplo = {
      id: id,
      titulo: `CREACION DE USUARIOS - PARALELO ACADEMICO ${id.slice(-3)}`,
      solicitante: 'Jenyfer Quintero Calixto',
      descripcion: 'ALIMENTAR EL EXCEL DE DELOGIN',
      fechaApertura: '2025-03-29 03:19',
      ultimaActualizacion: '2025-03-29 03:40',
      prioridad: 'Mediana',
      estado: 'Abierto',
      tecnico: 'Técnico Asignado',
      grupo: 'EDQ B',
      categoria: 'CREACION DE USUARIO'
    };
    setTicket(ticketEjemplo);
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!solucion.trim()) {
      alert('Por favor ingrese la solución');
      return;
    }

    // Aquí iría la lógica para guardar la solución en tu backend
    console.log({
      ticketId: id,
      solucion,
      accion,
      fecha: new Date().toISOString()
    });

    if (accion === 'solucion') {
      alert('Solución guardada. El ticket se ha cerrado y se enviará una encuesta de satisfacción.');
      // Redirigir a encuesta de satisfacción
     navigate(`/EncuestaSatisfaccion/${id}`);
    } else {
      alert('Seguimiento guardado. El ticket permanece abierto.');
    }

    navigate('/Tickets'); // Redirige de vuelta a la lista de tickets
  };

  if (!ticket) return <div className={styles.loading}>Cargando ticket...</div>;


  // Handlers

  const nombre = localStorage.getItem("nombre");
  
  const toggleChat = () => setIsChatOpen(!isChatOpen);
  const toggleMenu = () => setIsMenuExpanded(!isMenuExpanded);
  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  const toggleSupport = () => {
    setIsSupportOpen(!isSupportOpen);
    setIsAdminOpen(false);
    setIsConfigOpen(false);
  };

  const toggleAdmin = () => {
    setIsAdminOpen(!isAdminOpen);
    setIsSupportOpen(false);
    setIsConfigOpen(false);
  };

  const toggleConfig = () => {
    setIsConfigOpen(!isConfigOpen);
    setIsSupportOpen(false);
    setIsAdminOpen(false);
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
                <Link to="/HomeAdmiPage" className={styles.linkSinSubrayado}>
                  <FcHome className={styles.menuIcon} />
                  <span className={styles.menuText}>Inicio</span>
                </Link>
              </li>

              {/* Menú Soporte */}
              <li className={styles.iconosMenu}>
                <div className={styles.linkSinSubrayado} onClick={toggleSupport}>
                  <FcAssistant className={styles.menuIcon} />
                  <span className={styles.menuText}> Soporte</span>
                </div>

                <ul className={`${styles.submenu} ${isSupportOpen ? styles.showSubmenu : ''}`}>
                  <li>
                    <Link to="/Tickets" className={styles.submenuLink}>
                      <FcAnswers className={styles.menuIcon} />
                      <span className={styles.menuText}>Tickets</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/CrearCasoAdmin" className={styles.submenuLink}>
                      <FcCustomerSupport className={styles.menuIcon} />
                      <span className={styles.menuText}>Crear Caso</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/Problemas" className={styles.submenuLink}>
                      <FcExpired className={styles.menuIcon} />
                      <span className={styles.menuText}>Problemas</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/Estadisticas" className={styles.submenuLink}>
                      <FcBullish className={styles.menuIcon} />
                      <span className={styles.menuText}>Estadísticas</span>
                    </Link>
                  </li>
                </ul>
              </li>

              {/* Menú Administración */}
              <li className={styles.iconosMenu}>
                <div className={styles.linkSinSubrayado} onClick={toggleAdmin}>
                  <FcBusinessman className={styles.menuIcon} />
                  <span className={styles.menuText}> Administración</span>
                </div>
                <ul className={`${styles.submenu} ${isAdminOpen ? styles.showSubmenu : ''}`}>
                  <li>
                    <Link to="/Usuarios" className={styles.submenuLink}>
                      <FcPortraitMode className={styles.menuIcon} />
                      <span className={styles.menuText}> Usuarios</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/Grupos" className={styles.submenuLink}>
                      <FcConferenceCall className={styles.menuIcon} />
                      <span className={styles.menuText}> Grupos</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/Entidades" className={styles.submenuLink}>
                      <FcOrganization className={styles.menuIcon} />
                      <span className={styles.menuText}> Entidades</span>
                    </Link>
                  </li>
                </ul>
              </li>

              {/* Menú Configuración */}
              <li className={styles.iconosMenu}>
                <div className={styles.linkSinSubrayado} onClick={toggleConfig}>
                  <FcAutomatic className={styles.menuIcon} />
                  <span className={styles.menuText}> Configuración</span>
                </div>
                <ul className={`${styles.submenu} ${isConfigOpen ? styles.showSubmenu : ''}`}>
                  <li>
                    <Link to="/Categorias" className={styles.submenuLink}>
                      <FcGenealogy className={styles.menuIcon} />
                      <span className={styles.menuText}>Categorias</span>
                    </Link>
                  </li>
                </ul>
              </li>
            </ul>
          </div>

          <div className={styles.empresarialContainer}>
            <img src={Logoempresarial} alt="Logoempresarial" />
          </div>
        </div>
      </aside>

      {/* Contenido principal */}
      <div style={{ marginLeft: isMenuExpanded ? "200px" : "60px", transition: "margin-left 0.3s ease" }}>
        <Outlet />
      </div>
      {/* Header */}
      <header className={styles.containerInicio} style={{ marginLeft: isMenuExpanded ? "200px" : "60px" }}>
        <div className={styles.containerInicioImg}>
          <Link to="/HomeAdmiPage" className={styles.linkSinSubrayado}>
            <FcHome className={styles.menuIcon} />
            <span>Inicio</span>
          </Link>
        </div>
        <div className={styles.inputContainer}>
          <div className={styles.searchContainer}>
            <input
              type="text"
              placeholder="Buscar"
              className={styles.search}
            />
            <button
              type="submit"
              className={styles.buttonBuscar}
              title="Buscar"
            >
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

        <div className={styles.containersolucion}>
          <h1 className={styles.title}>Solución del Ticket #{ticket.id}</h1>

          {/* Container con la descripción del ticket (globo) */}
          <div className={styles.ticketInfo}>
            <div className={styles.ticketHeader}>
              <span className={styles.ticketTitle}>{ticket.titulo}</span>
              <span className={styles.ticketPriority} data-priority={ticket.prioridad.toLowerCase()}>
                {ticket.prioridad}
              </span>
            </div>

            <div className={styles.ticketDescription}>
              <p>{ticket.descripcion}</p>
            </div>

            <div className={styles.ticketMeta}>
              <div>
                <strong>Solicitante:</strong> {ticket.solicitante}
              </div>
              <div>
                <strong>Fecha apertura:</strong> {ticket.fechaApertura}
              </div>
              <div>
                <strong>Última actualización:</strong> {ticket.ultimaActualizacion}
              </div>
              <div>
                <strong>Categoría:</strong> {ticket.categoria}
              </div>
            </div>
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Acción a realizar:</label>
            <div className={styles.buttonRadioGroup}>
              <button
                type="button"
                className={`${styles.actionButton} ${accion === 'seguimiento' ? styles.active : ''}`}
                onClick={() => setAccion('seguimiento')}
              >
                <div className={styles.buttonContent}>
                  <FaRegClock className={styles.buttonIcon} />
                  <div>
                    <div className={styles.buttonTitle}>Seguimiento</div>
                    <div className={styles.buttonSubtitle}>El ticket permanece abierto</div>
                  </div>
                </div>
              </button>

              <button
                type="button"
                className={`${styles.actionButton} ${accion === 'solucion' ? styles.active : ''}`}
                onClick={() => setAccion('solucion')}
              >
                <div className={styles.buttonContent}>
                  <FaCheckCircle className={styles.buttonIcon} />
                  <div>
                    <div className={styles.buttonTitle}>Solución</div>
                    <div className={styles.buttonSubtitle}>Cierra el ticket y envía encuesta</div>
                  </div>
                </div>
              </button>
            </div>
          </div>

          {/* Container para la solución */}
          <form onSubmit={handleSubmit} className={styles.solutionForm}>
            <h2 className={styles.solutionTitle}>Proporcionar Solución</h2>

            <div className={styles.formGroup}>
              <label htmlFor="solucion" className={styles.label}>
                Detalle de la solución o seguimiento:
              </label>
              <textarea
                id="solucion"
                value={solucion}
                onChange={(e) => setSolucion(e.target.value)}
                required
                className={styles.textarea}
                placeholder="Describa la solución aplicada o los pasos realizados..."
              />
            </div>



            <div className={styles.buttonGroup}>
              <button type="submit" className={styles.submitButton}>
                {accion === 'solucion' ? 'Cerrar Ticket con Solución' : 'Guardar Seguimiento'}
              </button>
              <button
                type="button"
                onClick={() => navigate('/Tickets')}
                className={styles.cancelButton}
              >
                Cancelar
              </button>
            </div>
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

export default SolucionTickets;