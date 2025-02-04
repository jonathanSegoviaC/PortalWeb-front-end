import React from 'react'
import Footer from '../components/footer/Footer'
import ScrollDataTableSection from '../components/tables/TablaTipoCliente'
const TableContent = () => {
    return (
      <div className="main-content">       
        <div className="row g-3">
        <h1>Tipo Cliente</h1>
             <ScrollDataTableSection/>
        </div>
          <Footer/>
      </div>
    )
  }
  
  export default TableContent