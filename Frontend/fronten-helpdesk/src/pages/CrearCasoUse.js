import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Link, useNavigate, useLocation, useParams } from "react-router-dom";
import Logo from "../imagenes/logo proyecto color.jpeg";
import Logoempresarial from "../imagenes/logo empresarial.png";
import { FaMagnifyingGlass, FaPowerOff } from "react-icons/fa6";
import { FiAlignJustify } from "react-icons/fi";
import { FcHome, FcCustomerSupport, FcAnswers } from "react-icons/fc";
import ChatbotIcon from "../imagenes/img chatbot.png";
import styles from "../styles/CrearCasoUse.module.css";

const CrearCasoUse = () => {
  // Estados
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isMenuExpanded, setIsMenuExpanded] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [usuarios, setUsuarios] = useState([]);
  const [departamentos, setDepartamentos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const { id } = useParams();

  const toggleChat = () => setIsChatOpen(!isChatOpen);
  const toggleMenu = () => setIsMenuExpanded(!isMenuExpanded);
  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  const navigate = useNavigate();
  const location = useLocation();
  const nombre = localStorage.getItem("nombre");

  // Estado del formulario
  const [formData, setFormData] = useState({
    id: '',
    tipo: "",
    origen: "",
    prioridad: "",
    categoria: "",
    titulo: "",
    descripcion: "",
    archivo: null,
    solicitante: nombre || '',
    elementos: ""
  });

  // Obtener datos iniciales al cargar el componente
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        // Obtener usuarios
        const usuariosResponse = await axios.get('http://localhost:5000/api/usuarios');
        setUsuarios(usuariosResponse.data);

        // Obtener departamentos
        const deptosResponse = await axios.get('http://localhost:5000/api/departamentos');
        setDepartamentos(deptosResponse.data);

        // Obtener categorías
        const catsResponse = await axios.get('http://localhost:5000/api/categorias');
        setCategorias(catsResponse.data);
        

        // Cargar datos del ticket si estamos en modo edición
        if (location.state?.ticketData) {
          setFormData(prev => ({
            ...prev,
            ...location.state.ticketData
          }));
        }
      } catch (error) {
        console.error("Error al obtener datos iniciales:", error);
        setError("Error al cargar datos iniciales");
      }
    };

    fetchInitialData();
  }, [location.state]);

  


  // Manejo de cambios en el formulario
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    
    setFormData(prev => ({
      ...prev,
      [name]: files ? files[0] : value
    }));
  };

  // Envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const formDataToSend = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (value !== null && value !== undefined) {
          formDataToSend.append(key, value);
        }
      });

      if (location.state?.mode === 'edit') {
        await axios.put(`http://localhost:5000/api/tickets/${formData.id}`, formDataToSend, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        setSuccess('Ticket actualizado correctamente');
      } else {
        await axios.post('http://localhost:5000/api/tickets', formDataToSend, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        setSuccess('Ticket creado correctamente');
      }

      setTimeout(() => navigate('/Tickets'), 2000);
    } catch (error) {
      console.error('Error al procesar el ticket:', error);
      setError(error.response?.data?.detail || 'Error al procesar la solicitud');
    } finally {
      setIsLoading(false);
    }
  };

  // Validación del formulario
  const validateForm = () => {
    return (
      formData.tipo &&
      formData.origen &&
      formData.prioridad &&
      formData.categoria &&
      formData.titulo &&
      formData.descripcion &&
      formData.solicitante
    );
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
                  <span className={styles.creacionDeTicket}>
                    {location.state?.mode === 'edit' ? 'Editar Ticket' : 'Crear Nuevo Ticket'}
                  </span>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Mensajes de estado */}
        {error && (
          <div className={styles.errorMessage}>
            {error}
            <button onClick={() => setError(null)} className={styles.closeMessage}>&times;</button>
          </div>
        )}
        {success && (
          <div className={styles.successMessage}>
            {success}
            <button onClick={() => setSuccess(null)} className={styles.closeMessage}>&times;</button>
          </div>
        )}

       
        
          {/* Formulario */}
          <div className={styles.formColumn}>
            <div className={styles.formContainerCaso}>
              <form onSubmit={handleSubmit}>
                {location.state?.mode === 'edit' && (
                  <div className={styles.formGroupCaso}>
                    <label className={styles.casoLabel}>ID</label>
                    <input
                      className={styles.casoInput}
                      type="text"
                      name="id"
                      value={formData.id}
                      readOnly
                    />
                  </div>
                )}

                <div className={styles.formGroupCaso}>
                  <label className={styles.casoLabel}>Tipo*</label>
                  <select
                    className={styles.casoSelect}
                    name="tipo"
                    value={formData.tipo}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Seleccione...</option>
                    <option value="incidencia">Incidencia</option>
                    <option value="requerimiento">Requerimiento</option>
                  </select>
                </div>

                {/* Campo Origen con datos dinámicos */}
                <div className={styles.formGroupCaso}>
                  <label className={styles.casoLabel}>Origen*</label>
                  <select
                    className={styles.casoSelect}
                    name="origen"
                    value={formData.origen}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Seleccione...</option>
                    {departamentos.map(depto => (
                      <option key={depto.id} value={depto.nombre}>
                        {depto.nombre}
                      </option>
                    ))}
                  </select>
                </div>

                <div className={styles.formGroupCaso}>
                  <label className={styles.casoLabel}>Prioridad*</label>
                  <select
                    className={styles.casoSelect}
                    name="prioridad"
                    value={formData.prioridad}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Seleccione...</option>
                    <option value="alta">Alta</option>
                    <option value="mediana">Mediana</option>
                    <option value="baja">Baja</option>
                  </select>
                </div>

                {/* Campo Categoría con datos dinámicos */}
                <div className={styles.formGroupCaso}>
                  <label className={styles.casoLabel}>Categoría*</label>
                  <select
                    className={styles.casoSelect}
                    name="categoria"
                    value={formData.categoria}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Seleccione...</option>
                    {categorias.map(cat => (
                      <option key={cat.id} value={cat.nombre}>
                        {cat.nombre}
                      </option>
                    ))}
                  </select>
                </div>

                <div className={styles.formGroupCaso}>
                  <label className={styles.casoLabel}>Título*</label>
                  <input
                    className={styles.casoInput}
                    type="text"
                    name="titulo"
                    value={formData.titulo}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className={styles.formGroupCaso}>
                  <label className={styles.casoLabel}>Solicitante*</label>
                  <select
                    className={styles.casoSelect}
                    name="solicitante"
                    value={formData.solicitante}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Seleccione un usuario...</option>
                    {usuarios.map(usuario => (
                      <option key={usuario.id} value={`${usuario.nombres} ${usuario.apellidos}`}>
                        {`${usuario.nombres} ${usuario.apellidos}`} ({usuario.email})
                      </option>
                    ))}
                  </select>
                </div>

                <div className={styles.formGroupCaso}>
                  <label className={styles.casoLabel}>Elementos Asociados</label>
                  <input
                    className={styles.casoInput}
                    type="text"
                    name="elementos"
                    value={formData.elementos}
                    onChange={handleChange}
                  />
                </div>

                <div className={styles.formGroupCaso}>
                  <label className={styles.casoLabel}>Descripción*</label>
                  <textarea
                    className={styles.casoTextarea}
                    name="descripcion"
                    value={formData.descripcion}
                    onChange={handleChange}
                    rows="5"
                    required
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
                  {formData.archivo && (
                    <span className={styles.fileName}>{formData.archivo.name}</span>
                  )}
                </div>

                <button
                  type="submit"
                  className={styles.submitButton}
                  disabled={isLoading || !validateForm()}
                >
                  {isLoading ? (
                    <span className={styles.loadingSpinner}></span>
                  ) : (
                    location.state?.mode === 'edit' ? 'Actualizar Ticket' : 'Crear Ticket'
                  )}
                </button>
              </form>
            </div>
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