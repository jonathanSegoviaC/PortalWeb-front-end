import React from 'react'
import Footer from '../components/footer/Footer'
import ReporteGeorreferenciacionCliente from '../components/tables/GeorreferenciacionCliente.jsx'
const UbicacionVededorReporte = () => {
    return (
      <div className="main-content">       
        <div className="row g-3">
             <ReporteGeorreferenciacionCliente/>
        </div>
          <Footer/>
      </div>
    )
  }
  
  export default UbicacionVededorReporte