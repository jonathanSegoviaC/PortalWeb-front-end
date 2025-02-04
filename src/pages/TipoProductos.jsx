import React from 'react'
import Footer from '../components/footer/Footer'
import ScrollDataTableSection2 from '../components/tables/TablaTipoProducto'

const TableContent = () => {
    return (
      <div className="main-content">       
        <div className="row g-3">
        <h1>Tipo Producto</h1>
             <ScrollDataTableSection2/>
        </div>
          <Footer/>
      </div>
    )
  }
  
  export default TableContent