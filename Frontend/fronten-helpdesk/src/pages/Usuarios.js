import React, { useState } from "react";
import { Outlet, Link } from "react-router-dom";
// Iconos
import { FaMagnifyingGlass, FaPowerOff } from "react-icons/fa6";
import { FiAlignJustify } from "react-icons/fi";
import { FcHome, FcAssistant, FcBusinessman, FcAutomatic, FcAnswers, FcCustomerSupport, FcExpired, FcGenealogy, FcBullish, FcConferenceCall, FcPortraitMode, FcOrganization } from "react-icons/fc";
// Estilos
import styles from "../styles/Usuarios.module.css";
// Imágenes
import Logo from "../imagenes/logo proyecto color.jpeg";
import Logoempresarial from "../imagenes/logo empresarial.png";
import ChatbotIcon from "../imagenes/img chatbot.png";

const Usuarios = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isMenuExpanded, setIsMenuExpanded] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSupportOpen, setIsSupportOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isConfigOpen, setIsConfigOpen] = useState(false);
  const [formData, setFormData] = useState({
    usuario: '',
    nombres: '',
    apellidos: '',
    correo: '',
    telefono: '',
    contrasena: '',
    activo: '',
    entidad: '',
    rol: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/api/usuarios', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        alert('Usuario guardado correctamente en la base de datos');
        // Limpiar formulario
        setFormData({
          usuario: '',
          nombres: '',
          apellidos: '',
          correo: '',
          telefono: '',
          contrasena: '',
          activo: 'si',
          entidad: '',
          rol: ''
        });
      } else {
        alert('Error al guardar: ' + data.message);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error al conectar con el servidor');
    }
  };

  // Handlers
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
            <span className={styles.username}>Bienvenido, <span id="nombreusuario"></span></span>
            <div className={styles.iconContainer}>
              <Link to="/">
                <FaPowerOff className={styles.icon} />
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className={styles.container} style={{ marginLeft: isMenuExpanded ? "200px" : "60px" }}>
        {/*FORMULARIO DE CREACION DE USUARIO */}

        <div className={styles.containerUsuarios}>
          <h2 className={styles.titulo}>Formulario de Creación de Usuario</h2>

          <form onSubmit={handleSubmit}>
            <div className={styles.gridContainerUsuarios}>
              {/* Columna Izquierda */}
              <div className={styles.columna}>
                <div className={styles.formGroup}>
                  <label className={styles.label}>Usuario</label>
                  <input
                    type="text"
                    className={styles.input}
                    name="usuario"
                    value={formData.usuario}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.label}>Nombre(s)</label>
                  <input
                    type="text"
                    className={styles.input}
                    name="nombres"
                    value={formData.nombres}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.label}>Apellido(s)</label>
                  <input
                    type="text"
                    className={styles.input}
                    name="apellidos"
                    value={formData.apellidos}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              {/* Columna Derecha */}
              <div className={styles.columna}>
                <div className={styles.formGroup}>
                  <label className={styles.label}>Correo</label>
                  <input
                    type="email"
                    className={styles.input}
                    name="correo"
                    value={formData.correo}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.label}>Teléfono</label>
                  <input
                    type="tel"
                    className={styles.input}
                    name="telefono"
                    value={formData.telefono}
                    onChange={handleChange}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.label}>Contraseña</label>
                  <input
                    type="password"
                    className={styles.input}
                    name="contrasena"
                    value={formData.contrasena}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
            </div>

            {/* Selects en una fila debajo */}
            <div className={styles.selectsContainer}>
              <div className={styles.formGroup}>
                <label className={styles.label}>Activo</label>
                <select
                  className={styles.select}
                  name="activo"
                  value={formData.activo}
                  onChange={handleChange}
                  required
                >
                  <option value="si">Sí</option>
                  <option value="no">No</option>
                </select>
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>Entidades</label>
                <select
                  className={styles.select}
                  name="entidad"
                  value={formData.entidad}
                  onChange={handleChange}
                  required
                >
                  <option value="">Seleccione...</option>
                  <option value="tic">TIC</option>
                  <option value="mantenimiento">Mantenimiento</option>
                  <option value="financiera">Financiera</option>
                  <option value="compras">Compras</option>
                  <option value="almacen">Almacén</option>
                </select>
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>Rol</label>
                <select
                  className={styles.select}
                  name="rol"
                  value={formData.rol}
                  onChange={handleChange}
                  required
                >
                  <option value="">Seleccione...</option>
                  <option value="administrador">Administrador</option>
                  <option value="tecnico">Técnico</option>
                  <option value="usuario">Usuario</option>
                </select>
              </div>
            </div>

            <div className={styles.botonesContainer}>
              <div>
                <button type="submit" className={styles.boton}>Guardar</button>
              </div>
              <div>
                <button className={styles.boton}>Eliminar</button>
              </div>
            </div>
          </form>
        </div>
      </div >


      {/* Chatbot */}
      < div className={styles.chatbotContainer} >
        <img
          src={ChatbotIcon}
          alt="Chatbot"
          className={styles.chatbotIcon}
          onClick={toggleChat}
        />
        {
          isChatOpen && (
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
          )
        }
      </div >
    </div >
  );
};

export default Usuarios;