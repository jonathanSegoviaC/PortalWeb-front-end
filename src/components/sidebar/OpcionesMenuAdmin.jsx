import { NavLink, Link } from 'react-router-dom';
import { useContext } from 'react';
import { DigiContext } from '../../context/DigiContext';
import { config } from '@fullcalendar/core/internal';
import { useNavigate } from 'react-router-dom';

const OpcionesMenuAdmin = () => {
  const {
    pagesState,
    toggleMainPagesDropdown,
    toggleSubPagesDropdown,
    toggleEmpresa,
    toggleSocios,
    toggleProductos,
    toggleRoles,
    toggleReportes,
    toggleConfiguracion,
    toggleSalir,
    layoutPosition,
    dropdownOpen,
    mainPagesRef,
    isExpanded,
    isNavExpanded,
    isSmallScreen
  } = useContext(DigiContext);
 
 
  const {
    isMainDropdownOpen,
    isSubDropdownOpen,
    empresa,
    socios,
    productos,
    roles,
    reportes,
    configuracion,
    salir
  } = pagesState;
  const handleSubNavLinkClick = () => {
    if (!isSubDropdownOpen) {
      toggleSubPagesDropdown(); // Open the sub-dropdown
    }
  };


  const menuItems = [
    {
      label: 'Empresa',
      stateKey: 'empresa',
      iconClass: 'fa-user-cog',
      toggleFunction: toggleEmpresa,
      subMenu: [
        { path: '/datosempresa', label: 'Datos Generales' },
        { path: '/usuariosAdministrativos', label: 'Usuarios Administrativos' },
        { path: '/ClientesxVendedor', label: '' }
      ]
    },
    {
      label: 'Socios',
      stateKey: 'socios',
      iconClass: 'fa-user-cog',
      toggleFunction: toggleSocios,
      subMenu: [
        { path: '/', label: 'Tipo Cliente' },
        { path: '/', label: 'Cliente' },
        { path: '/', label: 'Direccion de Envio' },
        { path: '/datosvendedor', label: 'Vendedor' }
      ]
    },
    {
        label: 'Productos',
        stateKey: 'productos',
        iconClass: 'fa-user-cog',
        toggleFunction: toggleEmpresa,
        subMenu: [
          { path: '/', label: 'Tipo Producto' },
          { path: '/', label: 'Producto' },
          { path: '/', label: 'Lista Precios' },
          { path: '/', label: 'Lista Precios Detalle' }
        ]
      },
      {
        label: 'Roles',
        stateKey: 'roles',
        iconClass: 'fa-user-cog',
        toggleFunction: toggleEmpresa,
        subMenu: [
          { path: '/', label: 'Perfil de Usuario' },
          { path: '/', label: 'Menu Cabecera' },
          { path: '/', label: 'Opciones del Menu' },
          { path: '/', label: 'Opciones por Perfil' }
        ]
      },
      {
        label: 'Reportes',
        stateKey: 'reportes',
        iconClass: 'fa-user-cog',
        toggleFunction: toggleEmpresa,
        subMenu: [
          { path: '/', label: 'Reporte de Pedidos' },
          { path: '/', label: 'Autorizacion Pedidos' },
          { path: '/', label: 'Reporte Sincronizacion' },
          { path: '/', label: 'Reporte GPS Estado' },
          { path: '/', label: 'Reporte GPS Visitas' },
          { path: '/', label: 'Reporte Paradas' },
          { path: '/', label: 'Reporte Ubicacion Vendedor' },
          { path: '/', label: 'Reporte Georreferenciacion Cliente' },
          { path: '/', label: 'Consulta de Gestion' },
          { path: '/', label: 'Reporte de Correos' }
        ]
      }
    // Agregar más elementos específicos para el administrador si es necesario
  ];

  return (
    <li className="sidebar-item" ref={isExpanded || isNavExpanded.isSmall || layoutPosition.horizontal || (layoutPosition.twoColumn && isExpanded) || (layoutPosition.twoColumn && isSmallScreen) ? mainPagesRef : null}>
      <Link
        role="button"
        className={`sidebar-link-group-title has-sub ${isMainDropdownOpen ? 'show' : ''}`}
        onClick={toggleMainPagesDropdown}
      >
        Opciones de Menú
      </Link>
      <ul className={`sidebar-link-group ${layoutPosition.horizontal ? (dropdownOpen.pages ? 'd-block' : '') : (isMainDropdownOpen ? 'd-none' : '')}`}>

        <li className="sidebar-dropdown-item">
          <Link
            role="button"
            className={`sidebar-link has-sub ${empresa ? 'show' : ''}`}
            onClick={toggleEmpresa}
          >
            <span className="nav-icon">
              <i className="fa-light fa-user-cog"></i>
            </span>{' '}
            <span className="sidebar-txt">Empresa</span>
          </Link>
          <ul className={`sidebar-dropdown-menu ${empresa ? 'd-block' : ''}`}>
            <li className="sidebar-dropdown-item">
              <NavLink to="/datosempresa" className="sidebar-link">
                Datos Generales
              </NavLink>
            </li>
            <li className="sidebar-dropdown-item">
              <NavLink to="/usuariosAdministrativos" className="sidebar-link">
                Usuarios Administrativos
              </NavLink>
            </li>
            <li className="sidebar-dropdown-item">
              <NavLink to="/rutasLogicas" className="sidebar-link">
                Rutas Lógicas
              </NavLink>
            </li>
          </ul>
          
        </li>

        <li className="sidebar-dropdown-item">
          <Link
            role="button"
            className={`sidebar-link has-sub ${socios ? 'show' : ''}`}
            onClick={toggleSocios}
          >
            <span className="nav-icon">
              <i className="fa-light fa-user-cog"></i>
            </span>{' '}
            <span className="sidebar-txt">Socios</span>
          </Link>
          <ul className={`sidebar-dropdown-menu ${socios ? 'd-block' : ''}`}>
            <li className="sidebar-dropdown-item">
              <NavLink to="/tipocliente" className="sidebar-link">
                Tipo Cliente
              </NavLink>
            </li>
            <li className="sidebar-dropdown-item">
              <NavLink to="/cliente" className="sidebar-link">
                Cliente
              </NavLink>
            </li>

            <li className="sidebar-dropdown-item">
              <NavLink to="/direccionEnvio" className="sidebar-link">
                Dirección de Envío
              </NavLink>
            </li>

            <li className="sidebar-dropdown-item">
              <NavLink to="/datosvendedor" className="sidebar-link">
                Vendedor
              </NavLink>
            </li>

          </ul>
        </li>

        <li className="sidebar-dropdown-item">
          <Link
            role="button"
            className={`sidebar-link has-sub ${productos ? 'show' : ''}`}
            onClick={toggleProductos}
          >
            <span className="nav-icon">
              <i className="fa-light fa-user-cog"></i>
            </span>{' '}
            <span className="sidebar-txt">Productos</span>
          </Link>
          <ul className={`sidebar-dropdown-menu ${productos ? 'd-block' : ''}`}>
            <li className="sidebar-dropdown-item">
              <NavLink to="/tipoproducto" className="sidebar-link">
                Tipo Producto
              </NavLink>
            </li>
            <li className="sidebar-dropdown-item">
              <NavLink to="/producto" className="sidebar-link">
                Producto
              </NavLink>
            </li>

            <li className="sidebar-dropdown-item">
              <NavLink to="/lista-precios" className="sidebar-link">
                Lista Precios
              </NavLink>
            </li>

            <li className="sidebar-dropdown-item">
              <NavLink to="/lista-precios-detalle" className="sidebar-link">
                Lista Precios Detalle
              </NavLink>
            </li>

          </ul>
        </li>

        <li className="sidebar-dropdown-item">
          <Link
            role="button"
            className={`sidebar-link has-sub ${roles ? 'show' : ''}`}
            onClick={toggleRoles}
          >
            <span className="nav-icon">
              <i className="fa-light fa-user-cog"></i>
            </span>{' '}
            <span className="sidebar-txt">Roles</span>
          </Link>
          <ul className={`sidebar-dropdown-menu ${roles ? 'd-block' : ''}`}>
            <li className="sidebar-dropdown-item">
              <NavLink to="/perfil" className="sidebar-link">
                Perfil de Usuario
              </NavLink>
            </li>
            <li className="sidebar-dropdown-item">
              <NavLink to="/menucabecera" className="sidebar-link">
                Menú Cabecera
              </NavLink>
            </li>

            <li className="sidebar-dropdown-item">
              <NavLink to="/opciones-menu" className="sidebar-link">
                Opciones del Menú
              </NavLink>
            </li>

            <li className="sidebar-dropdown-item">
              <NavLink to="/opcionesPorPerfil" className="sidebar-link">
                Opciones por perfil
              </NavLink>
            </li>

          </ul>
        </li>

        <li className="sidebar-dropdown-item">
          <Link
            role="button"
            className={`sidebar-link has-sub ${reportes ? 'show' : ''}`}
            onClick={toggleReportes}
          >
            <span className="nav-icon">
              <i className="fa-light fa-user-cog"></i>
            </span>{' '}
            <span className="sidebar-txt">Reportes</span>
          </Link>
          <ul className={`sidebar-dropdown-menu ${reportes ? 'd-block' : ''}`}>
            <li className="sidebar-dropdown-item">
              <NavLink to="/reporte-pedidos" className="sidebar-link">
                Reporte de pedidos
              </NavLink>
            </li>
            <li className="sidebar-dropdown-item">
              <NavLink to="/autorizacion-pedidos" className="sidebar-link">
                Autorización Pedidos
              </NavLink>
            </li>

            <li className="sidebar-dropdown-item">
              <NavLink to="/reporte-sincronizacion" className="sidebar-link">
                Reporte Sincronización
              </NavLink>
            </li>

            <li className="sidebar-dropdown-item">
              <NavLink to="/ReporteGpsEstado" className="sidebar-link">
                Reporte GPS Estado
              </NavLink>
            </li>

            <li className="sidebar-dropdown-item">
              <NavLink to="/reporte-gps-visitas" className="sidebar-link">
                Reporte GPS Visitas
              </NavLink>
            </li>

            <li className="sidebar-dropdown-item">
              <NavLink to="/reporte-paradas" className="sidebar-link">
                Reporte Paradas
              </NavLink>
            </li>

            <li className="sidebar-dropdown-item">
              <NavLink to="/reporte-ubicacion-vendedor" className="sidebar-link">
              Reporte Ubicación Vendedor
              </NavLink>
            </li>

            <li className="sidebar-dropdown-item">
              <NavLink to="/reporte-georreferenciacion" className="sidebar-link">
              Reporte Georreferenciación Cliente
              </NavLink>
            </li>

            <li className="sidebar-dropdown-item">
              <NavLink to="/consulta-gestion" className="sidebar-link">
              Consulta de Gestión
              </NavLink>
            </li>

            <li className="sidebar-dropdown-item">
              <NavLink to="/reporte-correos" className="sidebar-link">
              Reporte de Correos
              </NavLink>
            </li>

          </ul>
        </li>

        <li className="sidebar-dropdown-item">
          <Link
            role="button"
            className={`sidebar-link has-sub ${configuracion ? 'show' : ''}`}
            onClick={toggleConfiguracion}
          >
            <span className="nav-icon">
              <i className="fa-light fa-user-cog"></i>
            </span>{' '}
            <span className="sidebar-txt">Configuración</span>
          </Link>
          <ul className={`sidebar-dropdown-menu ${configuracion ? 'd-block' : ''}`}>
            <li className="sidebar-dropdown-item">
              <NavLink to="/parametros" className="sidebar-link">
                Parámetros
              </NavLink>
            </li>
            <li className="sidebar-dropdown-item">
              <NavLink to="/tiponovedad" className="sidebar-link">
                Tipo de novedad
              </NavLink>
            </li>

            <li className="sidebar-dropdown-item">
              <NavLink to="/horario-gps" className="sidebar-link">
                Horario GPS
              </NavLink>
            </li>

          </ul>
        </li>

        <li className="sidebar-dropdown-item">
          <Link
            role="button"
            className={`sidebar-link has-sub ${salir ? 'show' : ''}`}
            onClick={toggleSalir}
          >
            <span className="nav-icon">
              <i className="fa-light fa-user-cog"></i>
            </span>{' '}
            <span className="sidebar-txt">Salir</span>
          </Link>
          <ul className={`sidebar-dropdown-menu ${salir ? 'd-block' : ''}`}>

            <li className="sidebar-dropdown-item">
              <NavLink to="/" className="sidebar-link" onClick={(event) => {
                localStorage.removeItem("authToken");
                //delete userService.currentUser;
                sessionStorage.removeItem('datos');
                history.push("/");
              }}>
                Cerrar Sesión
              </NavLink>
            </li>

          </ul>
        </li>
      </ul>
    </li>
  );
  
};

export default OpcionesMenuAdmin;
