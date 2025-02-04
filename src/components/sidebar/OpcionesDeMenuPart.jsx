import { NavLink, Link } from 'react-router-dom';
import { useContext } from 'react';
import { DigiContext } from '../../context/DigiContext';
import { config } from '@fullcalendar/core/internal';
import { useNavigate } from 'react-router-dom';


const OpcionesDeMenuPart = () => {
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
              <NavLink to="/UsuariosAdministrativos" className="sidebar-link">
                Usuarios Administrativos
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
              <NavLink to="/login" className="sidebar-link">
                Datos Generales
              </NavLink>
            </li>
            <li className="sidebar-dropdown-item">
              <NavLink to="/login2" className="sidebar-link">
                Usuarios Administrativos
              </NavLink>
            </li>
            <li className="sidebar-dropdown-item">
              <NavLink to="/TipoCliente" className="sidebar-link">
                Tipo Cliente
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
              <NavLink to="/login" className="sidebar-link">
                Datos Generales
              </NavLink>
            </li>
            <li className="sidebar-dropdown-item">
              <NavLink to="/login2" className="sidebar-link">
                Usuarios Administrativos
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
              <NavLink to="/login" className="sidebar-link">
                Datos Generales
              </NavLink>
            </li>
            <li className="sidebar-dropdown-item">
              <NavLink to="/menuCabecera" className="sidebar-link">
                Menú Cabecera
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
              <NavLink to="/login" className="sidebar-link">
                Datos Generales
              </NavLink>
            </li>
            <li className="sidebar-dropdown-item">
              <NavLink to="/login2" className="sidebar-link">
                Usuarios Administrativos
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
            <span className="sidebar-txt">Configuracion</span>
          </Link>
          <ul className={`sidebar-dropdown-menu ${configuracion ? 'd-block' : ''}`}>
            <li className="sidebar-dropdown-item">
              <NavLink to="/login" className="sidebar-link">
                Datos Generales
              </NavLink>
            </li>
            <li className="sidebar-dropdown-item">
              <NavLink to="/login2" className="sidebar-link">
                Usuarios Administrativos
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
                Cerrar Sesion
              </NavLink>
            </li>

          </ul>
        </li>
      </ul>
    </li>
  );
};

export default OpcionesDeMenuPart;
