import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { DigiContext } from '../../context/DigiContext';
import { OverlayScrollbarsComponent } from 'overlayscrollbars-react'
import DashboardPart from './DashboardPart';
import AppsPart from './AppsPart';
import PagesPart from './PagesPart';
import ComponentsPart from './ComponentsPart';
import OpcionesDeMenuPart from './OpcionesDeMenuPart';
import OpcionesMenuAdmin from './OpcionesMenuAdmin';
import OpcionesMenuCliente from './OpcionesMenuCliente';
import OpcionesMenuVendedor from './OpcionesMenuVendedor';


const MainSidebar = () => {
  const {
    isExpanded,
    sidebarBackgroundImageStyle,
    isNavExpanded,
    layoutPosition,
    isSidebarOpen,
    ref,
    handleNavHover,
    handleNavHoverEnd,
    isSmallScreen,
  } = useContext(DigiContext);

  const shouldUseOverlayScrollbars = isExpanded || !isNavExpanded.isSmall || layoutPosition.horizontal || (!layoutPosition.twoColumn && isExpanded) || !layoutPosition.flush;


  const datosString = sessionStorage.getItem('datos');
  // const datos = datosString ? JSON.parse(datosString) : null;

  const datos = datosString ? JSON.parse(datosString) : null;
  //console.log('Datos recuperados de sessionStorage:', datos);

  const renderMenuOptions = () => {
    if ( datos.data_usuario.codcliente) {
      return <OpcionesMenuCliente />;
    } else if ( datos.data_usuario.codvendedor && datos.data_usuario.codvendedor!=470) {
      return <OpcionesMenuVendedor />;
    } else  {
      return <OpcionesMenuAdmin />;
    }
  }


  return (
    <div
      className={`main-sidebar 
      ${
        isNavExpanded.isSmall && !isExpanded ? 'collapsed' : isExpanded && isNavExpanded.reset ? 'collapsed' : ''
      } ${
        isNavExpanded.reset && isExpanded ? 'reset' : ''
      } ${
        layoutPosition.horizontal? 'open-sub horizontal-menu': ''
      } ${
        isSidebarOpen && !layoutPosition.twoColumn
          ? 'sidebar-mini'
          : 'vertical-menu'
      }
      ${
        !isSidebarOpen && layoutPosition.twoColumn && isSmallScreen
          ? 'sub-menu-collapsed'
          : ''
      }
        ${
        layoutPosition.twoColumn  ? 'two-column-menu collapsed':''
      } ${
        layoutPosition.twoColumn && isExpanded && !isSmallScreen ? 'sub-menu-collapsed':''
      } ${
        isNavExpanded.hoverOpen && isNavExpanded.hover ? 'sidebar-hover hoverable':''
      } ${
        layoutPosition.flush? 'flush-menu':''
      } 
      `}
      style={sidebarBackgroundImageStyle}
      ref={ref}
      onMouseEnter={isNavExpanded.hover ? handleNavHover : undefined}
      onMouseLeave={isNavExpanded.hover ? handleNavHoverEnd : undefined}
    >
      <div className="main-menu">
      {shouldUseOverlayScrollbars ? (
        <OverlayScrollbarsComponent className="sidebar-menu">
           {renderMenuOptions()}
        </OverlayScrollbarsComponent>
      ) : (
        <>
          {renderMenuOptions()}
        </>
      )}
    </div>
    </div>
  );
};

export default MainSidebar;
