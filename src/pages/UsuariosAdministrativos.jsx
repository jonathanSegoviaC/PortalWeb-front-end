import React from 'react'
import Footer from '../components/footer/Footer'
import TablaUsuariosAdministrativos from '../components/tables/TablaUsuariosAdministrativos'
const UsuariosAdministrativos = () => {
    return (
      <div className="main-content">       
        <div className="row g-3">
             <TablaUsuariosAdministrativos/>
        </div>
          <Footer/>
      </div>
    )
  }
  
  export default UsuariosAdministrativos