import React from 'react'
import Footer from '../components/footer/Footer'
import TablaOpcionesPorPerfil from '../components/tables/TablaOpcionesPorPerfil'

const OpcionesPorPerfil = () => {
  return (
    <div className="main-content">       
      <div className="row g-3">
        <TablaOpcionesPorPerfil />
      </div>
      <Footer />
    </div>
  );
}

export default OpcionesPorPerfil;
