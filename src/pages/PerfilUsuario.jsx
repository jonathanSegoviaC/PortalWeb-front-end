import React from 'react'
import Footer from '../components/footer/Footer'
import TablaPerfilUsuario from '../components/tables/TablaPerfilUsuario'
const PerfilUsuario = () => {
    return (
      <div className="main-content">       
        <div className="row g-3">
             <TablaPerfilUsuario/>
        </div>
          <Footer/>
      </div>
    )
  }
  
export default PerfilUsuario