import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaMagnifyingGlass, FaPowerOff } from "react-icons/fa6";
import { FiAlignJustify } from "react-icons/fi";
import { FcHome, FcCustomerSupport, FcAnswers, FcEmptyFilter, FcPrint } from "react-icons/fc";
import { FaFileExcel, FaFilePdf, FaFileCsv, FaChevronDown, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import Logo from "../imagenes/logo proyecto color.jpeg";
import Logoempresarial from "../imagenes/logo empresarial.png";
import ChatbotIcon from "../imagenes/img chatbot.png";
import styles from "../styles/Tickets.module.css";

// Datos de ejemplo más completos
const initialData = Array.from({ length: 100 }, (_, i) => ({
  id: `2 503 290 ${(1000 - i).toString().padStart(3, '0')}`,
  titulo: `CREACION DE USUARIOS - PARALELO ACADEMICO ${i + 1}`,
  solicitante: ['Jenyfer Quintero Calixto',],
  descripcion: 'ALIMENTAR EL EXCEL DE DELOGIN',
  prioridad: ['Mediana', 'Alta', 'Baja'][i % 3],
  estado: ['Cerrado', 'Abierto', 'Curso'][i % 3],
  tecnico: 'Jenyfer Quintero Calixto',
  grupo: 'EDQ B',
  categoria: 'CREACION DE USUARIO',
  ultimaActualizacion: '2025-03-29 03:40',
  fechaApertura: '2025-03-29 03:19'
}));

const Tickets = () => {
  // Estado del menú y chat
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isMenuExpanded, setIsMenuExpanded] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Estado de la tabla y filtros
  const [data, setData] = useState(initialData);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    id: '',
    titulo: '',
    solicitante: '',
    prioridad: '',
    estado: '',
    tecnico: '',
    grupo: '',
    categoria: ''
  });

  // Estado para paginación
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(15);
  const [isExportDropdownOpen, setIsExportDropdownOpen] = useState(false);

  // Handlers para menú y chat
  const toggleChat = () => setIsChatOpen(!isChatOpen);
  const toggleMenu = () => setIsMenuExpanded(!isMenuExpanded);
  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const toggleExportDropdown = () => setIsExportDropdownOpen(!isExportDropdownOpen);

  // Handlers para filtros
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const applyFilters = () => {
    const filteredData = initialData.filter(item => {
      return Object.keys(filters).every(key => {
        if (!filters[key]) return true;
        return String(item[key]).toLowerCase().includes(filters[key].toLowerCase());
      });
    });
    setData(filteredData);
    setCurrentPage(1); // Resetear a la primera página al aplicar filtros
  };

  const clearFilters = () => {
    setFilters({
      id: '',
      titulo: '',
      solicitante: '',
      prioridad: '',
      estado: '',
      tecnico: '',
      grupo: '',
      categoria: ''
    });
    setData(initialData);
    setCurrentPage(1);
  };

  // Handlers para exportación
  const exportToExcel = () => {
    alert('Exportando a Excel...');
    setIsExportDropdownOpen(false);
  };

  const exportToPdf = () => {
    alert('Exportando a PDF...');
    setIsExportDropdownOpen(false);
  };

  const exportToCsv = () => {
    alert('Exportando a CSV...');
    setIsExportDropdownOpen(false);
  };

  const printTable = () => {
    window.print();
    setIsExportDropdownOpen(false);
  };

  // Handler para búsqueda global
  const handleGlobalSearch = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const filtered = initialData.filter(item =>
      Object.values(item).some(val =>
        String(val).toLowerCase().includes(searchTerm)
      ))

    setData(filtered);
    setCurrentPage(1);
  };

  // Lógica de paginación
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = data.slice(indexOfFirstRow, indexOfLastRow);
  const totalPages = Math.ceil(data.length / rowsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const nextPage = () => currentPage < totalPages && setCurrentPage(currentPage + 1);
  const prevPage = () => currentPage > 1 && setCurrentPage(currentPage - 1);

  const handleRowsPerPageChange = (e) => {
    setRowsPerPage(Number(e.target.value));
    setCurrentPage(1);
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

      {/* Header */}
      <header
        className={styles.containerInicio}
        style={{ marginLeft: isMenuExpanded ? "200px" : "60px" }}
      >
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
            <span className={styles.username}>Bienvenido, <span id="nombreusuario"></span></span>
            <div className={styles.iconContainer}>
              <Link to="/">
                <FaPowerOff className={styles.icon} />
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Contenido principal - Tabla de tickets */}
      <div className={styles.containerticket} style={{ marginLeft: isMenuExpanded ? "200px" : "60px" }}>
        {/* Barra de herramientas */}
        <div className={styles.toolbar}>
          <div className={styles.searchContainer}>
            <input
              className={styles.search}
              type="text"
              placeholder="Buscar"
              onChange={handleGlobalSearch}
            />
            <button type="submit" className={styles.buttonBuscar} title="Buscar">
              <FaMagnifyingGlass className={styles.searchIcon} />
            </button>
          </div>

          <div className={styles.actions}>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={styles.actionButton}
              title="Alternar filtros"
            >
              <FcEmptyFilter />
            </button>

            {/* Dropdown de exportación */}
            <div className={styles.exportDropdown}>
              <button
                onClick={toggleExportDropdown}
                className={styles.exportButton}
                title="Opciones de exportación"
              >
                Exportar <FaChevronDown className={styles.dropdownIcon} />
              </button>
              {isExportDropdownOpen && (
                <div
                  className={styles.exportDropdownContent}
                  // Cerrar el dropdown al hacer clic fuera
                  onMouseLeave={() => setIsExportDropdownOpen(false)}
                >
                  <button
                    onClick={() => {
                      exportToExcel();
                      setIsExportDropdownOpen(false);
                    }}
                    className={styles.exportOption}
                  >
                    <FaFileExcel /> Excel
                  </button>
                  <button
                    onClick={() => {
                      exportToPdf();
                      setIsExportDropdownOpen(false);
                    }}
                    className={styles.exportOption}
                  >
                    <FaFilePdf /> PDF
                  </button>
                  <button
                    onClick={() => {
                      exportToCsv();
                      setIsExportDropdownOpen(false);
                    }}
                    className={styles.exportOption}
                  >
                    <FaFileCsv /> CSV
                  </button>
                  <button
                    onClick={() => {
                      printTable();
                      setIsExportDropdownOpen(false);
                    }}
                    className={styles.exportOption}
                  >
                    <FcPrint /> Imprimir
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Panel de filtros */}
        {showFilters && (
          <div className={styles.filterPanel}>
            <div className={styles.filterRow}>
              <div className={styles.filterGroup}>
                <label>ID</label>
                <input
                  type="text"
                  name="id"
                  value={filters.id}
                  onChange={handleFilterChange}
                />
              </div>
              <div className={styles.filterGroup}>
                <label>Título</label>
                <input
                  type="text"
                  name="titulo"
                  value={filters.titulo}
                  onChange={handleFilterChange}
                />
              </div>
              <div className={styles.filterGroup}>
                <label>Solicitante</label>
                <input
                  type="text"
                  name="solicitante"
                  value={filters.solicitante}
                  onChange={handleFilterChange}
                />
              </div>
            </div>
            <div className={styles.filterRow}>
              <div className={styles.filterGroup}>
                <label>Prioridad</label>
                <select
                  name="prioridad"
                  value={filters.prioridad}
                  onChange={handleFilterChange}
                >
                  <option value="">Todas</option>
                  <option value="Mediana">Mediana</option>
                  <option value="Alta">Alta</option>
                  <option value="Baja">Baja</option>
                </select>
              </div>
              <div className={styles.filterGroup}>
                <label>Estado</label>
                <select
                  name="estado"
                  value={filters.estado}
                  onChange={handleFilterChange}
                >
                  <option value="">Todos</option>
                  <option value="Cerrado">Cerrado</option>
                  <option value="Abierto">Abierto</option>
                  <option value="En Curso">En Curso</option>
                </select>
              </div>
              <div className={styles.filterGroup}>
                <label>Técnico</label>
                <input
                  type="text"
                  name="tecnico"
                  value={filters.tecnico}
                  onChange={handleFilterChange}
                />
              </div>
            </div>
            <div className={styles.filterRow}>
              <div className={styles.filterGroup}>
                <label>Grupo</label>
                <input
                  type="text"
                  name="grupo"
                  value={filters.grupo}
                  onChange={handleFilterChange}
                />
              </div>
              <div className={styles.filterGroup}>
                <label>Categoría</label>
                <input
                  type="text"
                  name="categoria"
                  value={filters.categoria}
                  onChange={handleFilterChange}
                />
              </div>
              <div className={styles.filterActions}>
                <button onClick={applyFilters} className={styles.applyButton}>
                  Aplicar Filtros
                </button>
                <button onClick={clearFilters} className={styles.clearButton}>
                  Limpiar Filtros
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Tabla de tickets */}
        <div className={styles.tableContainer}>
          <table className={styles.tableticket}>
            <thead>
              <tr>
                <th>ID</th>
                <th>Título</th>
                <th>Solicitante</th>
                <th>Descripción</th>
                <th>Prioridad</th>
                <th>Estado</th>
                <th>Técnico Asignado</th>
                <th>Grupo</th>
                <th>Categoría</th>
              </tr>
            </thead>
            <tbody>
              {currentRows.map((item, index) => (
                <tr key={index}>
                  <td>
                    <Link to={`/tickets/solucion/${item.id}`} className={styles.linkTicket}>
                      {item.id}
                    </Link>
                  </td>
                  <td>
                    <Link to={`/tickets/solucion/${item.id}`} className={styles.linkTicket}>
                      {item.titulo}
                    </Link>
                  </td>
                  <td>{item.solicitante}</td>
                  <td>{item.descripcion}</td>
                  <td>
                    <span className={`${styles.priority} ${styles[item.prioridad.toLowerCase()]}`}>
                      {item.prioridad}
                    </span>
                  </td>
                  <td>
                    <span className={`${styles.status} ${styles[item.estado.toLowerCase().replace(' ', '')]}`}>
                      {item.estado}
                    </span>
                  </td>
                  <td>{item.tecnico}</td>
                  <td>{item.grupo}</td>
                  <td>{item.categoria}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Controles de paginación */}
        <div className={styles.paginationControls}>
          <div className={styles.rowsPerPageSelector}>
            <span>Filas por página:</span>
            <select
              value={rowsPerPage}
              onChange={handleRowsPerPageChange}
              className={styles.rowsSelect}
            >
              <option value={15}>15</option>
              <option value={30}>30</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
              <option value={100}>200</option>
              <option value={100}>300</option>
              <option value={100}>400</option>
              <option value={100}>500</option>
              <option value={100}>600</option>
              <option value={100}>700</option>
              <option value={100}>800</option>
              <option value={100}>900</option>
              <option value={1000}>1000</option>
            </select>
            <span className={styles.rowsInfo}>
              Mostrando {indexOfFirstRow + 1}-{Math.min(indexOfLastRow, data.length)} de {data.length} registros
            </span>
          </div>

          <div className={styles.pagination}>
            <button
              onClick={prevPage}
              disabled={currentPage === 1}
              className={styles.paginationButton}
            >
              <FaChevronLeft />
            </button>

            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              // Lógica para mostrar páginas alrededor de la actual
              let pageNumber;
              if (totalPages <= 5) {
                pageNumber = i + 1;
              } else if (currentPage <= 3) {
                pageNumber = i + 1;
              } else if (currentPage >= totalPages - 2) {
                pageNumber = totalPages - 4 + i;
              } else {
                pageNumber = currentPage - 2 + i;
              }

              return (
                <button
                  key={pageNumber}
                  onClick={() => paginate(pageNumber)}
                  className={`${styles.paginationButton} ${currentPage === pageNumber ? styles.active : ''}`}
                >
                  {pageNumber}
                </button>
              );
            })}

            {totalPages > 5 && currentPage < totalPages - 2 && (
              <span className={styles.paginationEllipsis}>...</span>
            )}

            {totalPages > 5 && currentPage < totalPages - 2 && (
              <button
                onClick={() => paginate(totalPages)}
                className={`${styles.paginationButton} ${currentPage === totalPages ? styles.active : ''}`}
              >
                {totalPages}
              </button>
            )}

            <button
              onClick={nextPage}
              disabled={currentPage === totalPages}
              className={styles.paginationButton}
            >
              <FaChevronRight />
            </button>
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
    </div>
  );
};

export default Tickets;