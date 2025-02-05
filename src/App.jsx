import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Dashboard from "./pages/Bienvenida"
import CrmDashboard from "./pages/CrmDashboard"
import HrmDashboard from "./pages/HrmDashboard"
import Audience from "./pages/Audience"
import Company from "./pages/Company"
import Task from "./pages/Task"
import Leads from "./pages/Leads"
import Customer from "./pages/Customer"
import AddEmployee from "./pages/AddEmployee"
import AllEmployee from "./pages/AllEmployee"
import Attendance from "./pages/Attendance"
import AllCustomer from "./pages/AllCustomer"
import AddNewProduct from "./pages/AddNewProduct"
import AllProduct from "./pages/AllProduct"
import Category from "./pages/Category"
import Order from "./pages/Order"
import Chat from "./pages/Chat"
import Email from "./pages/Email"
import Calendar from "./pages/Calendar"
import Invoices from "./pages/Invoices"
import Contacts from "./pages/Contacts"
import Login from "./pages/Login"
import Login2 from "./pages/Login2"
import Registration from "./pages/Registration"
import Registration2 from "./pages/Registration2"
import ResetPassword from "./pages/ResetPassword"
import UpdatePassword from "./pages/UpdatePassword"
import LoginStatus from "./pages/LoginStatus"
import Profile from "./pages/Profile"
import EditProfile from "./pages/EditProfile"
import Utility from "./pages/Utility"
import SweetAlert from "./pages/SweetAlert"
import NestableList from "./pages/NestableList"
import Animation from "./pages/Animation"
import SwiperSlider from "./pages/SwiperSlider"
import Form from "./pages/Form"
import Table from "./pages/Table"
import Charts from "./pages/Charts"
import Icon from "./pages/Icon"
import Map from "./pages/Map"
import FileManager from "./pages/FileManager"
import Layout from "./components/layout/Layout"
import Login3 from "./pages/Login3"
import Error400 from "./pages/Error400"
import Error403 from "./pages/Error403"
import Error404 from "./pages/Error404"
import Error408 from "./pages/Error408"
import Error500 from "./pages/Error500"
import Error503 from "./pages/Error503"
import Error504 from "./pages/Error504"
import ComingSoon from "./pages/ComingSoon"
import ComingSoon2 from "./pages/ComingSoon2"
import PricingTable from "./pages/PricingTable"
import PricingTable2 from "./pages/PricingTable2"
import UnderConstruction from "./pages/UnderConstruction"
import DatosEmpresa from "./pages/DatosEmpresa"
import MenuCabecera from "./pages/MenuCabecera"
import Bienvenida from "./pages/Bienvenida"
import TipoClientes from "./pages/TipoClientes"
import TipoProductos from "./pages/TipoProductos"
import TipoNovedades from "./pages/TipoNovedades"
import UsuariosAdministrativos from "./pages/UsuariosAdministrativos"
import Vendedor from "./pages/Vendedor"
import OpcionesPorPerfil from "./pages/OpcionesPorPerfil"
import DireccionEnvio from "./pages/DireccionEnvio"
import HorariosGPS from "./pages/HorariosGPS"
import Parametros from "./pages/Parametros"
import PerfilUsuario from "./pages/PerfilUsuario"
import Cliente from "./pages/Cliente"
import ListaPrecio from "./pages/ListaPrecio"
import ReporteGpsEstado from "./pages/ReporteGpsEstado"
import RutasLogicas from "./pages/RutasLogicas"
import ClientexVendedor from "./pages/ClientesxVendedor"
import ListaPrecioDetalle from "./pages/ListaPrecioDetalle"
import ReportePedidos from "./pages/ReportePedidos"
import ReporteCorreos from "./pages/ReporteCorreos"
import ReporteGestion from "./pages/ReporteGestion";
import Producto from "./pages/Producto.jsx"; // Importa la página de Producto
import ReporteSincronizacion from "./pages/ReporteSincronizacion.jsx"
import Mapa from "./components/mapas/mapa"
import MapaVendedores from "./components/mapas/ubicacionVendedores.jsx"
import ReporteUbicacionVendedor from "./pages/UbicacionReporteVendedor.jsx"
import ReporteGeorreferenciacionCliente from "./pages/ReporteGeorreferenciacionCliente.jsx"
function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login3 />} />
        <Route element={<Layout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<EditProfile />} />
          <Route path="/datosempresa" element={<DatosEmpresa />} />
          <Route path="/menucabecera" element={<MenuCabecera />} />
          <Route path="/tipoCliente" element={<TipoClientes />} />
          <Route path="/tipoProducto" element={<TipoProductos />} />
          <Route path="/tipoNovedad" element={<TipoNovedades />} />
          <Route path="/usuariosAdministrativos" element={<UsuariosAdministrativos />} />
          <Route path="/datosvendedor" element={<Vendedor />} />
          <Route path="/opcionesPorPerfil" element={<OpcionesPorPerfil />} />
          <Route path="/direccionEnvio" element={<DireccionEnvio />} />
          <Route path="/parametros" element={<Parametros />} />                                        
          <Route path="/datosvendedor" element={<Vendedor />} /> 
          <Route path="/perfil" element={<PerfilUsuario />} />    
          <Route path="/Cliente" element={<Cliente />} />  
          <Route path="/lista-precios" element={<ListaPrecio />} />  
          <Route path="/producto" element={<Producto />} /> {/* Ruta para la página Producto */}
          <Route path="/lista-precios-detalle" element={<ListaPrecioDetalle />} />  
          <Route path="/datosvendedor" element={<Vendedor />} />
          <Route path="/direccionEnvio" element={<DireccionEnvio />} />
          <Route path="/horario-gps" element={<HorariosGPS />} />
          <Route path="/ReporteGpsEstado" element={<ReporteGpsEstado />} />
          <Route path="/RutasLogicas" element={<RutasLogicas />} />
          <Route path="/ClientexVendedor/:codvendedor"  element={<ClientexVendedor />} />
          <Route path="/reporte-pedidos" element={<ReportePedidos />} />
          <Route path="/reporte-correos" element={<ReporteCorreos />} />
          <Route path="/reporte-gestion" element={<ReporteGestion />} />
          <Route path="/consulta-gestion" element={<ReporteGestion />} />
          <Route path="/reporte-sincronizacion" element={<ReporteSincronizacion />} />
          <Route path="/Mapa" element={<Mapa/>}></Route>
          <Route path="/MapaVendedores" element={<MapaVendedores/>}></Route>
          <Route path="/reporte-ubicacion-vendedor" element={<ReporteUbicacionVendedor />} />
          <Route path="/reporte-georreferenciacion" element={<ReporteGeorreferenciacionCliente />} />
          
        </Route>
        <Route path="/resetpassword" element={<ResetPassword />} />
        <Route path="/updatepassword" element={<UpdatePassword />} />
        <Route path="/bienvenida" element={<Bienvenida />} />
      </Routes>

    </Router>
  )
}

export default App
