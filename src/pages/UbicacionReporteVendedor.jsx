import React from 'react'
import Footer from '../components/footer/Footer'
import ReporteUbicacionVendedor from '../components/tables/ReporteUbicacionVendedor'
const UbicacionVededorReporte = () => {
    return (
      <div className="main-content">       
        <div className="row g-3">
             <ReporteUbicacionVendedor/>
        </div>
          <Footer/>
      </div>
    )
  }
  
  export default UbicacionVededorReporte