import React from 'react'
import Footer from '../components/footer/Footer'
import TablaDireccionesEnvio from '../components/tables/TablaDireccionEnvio'

const DireccionEnvio = () => {
  return (
    <div className="main-content">       
      <div className="row g-3">
      <h1>Dirección de envío</h1>
        <TablaDireccionesEnvio />
      </div>
      <Footer />
    </div>
  );
}

export default DireccionEnvio;