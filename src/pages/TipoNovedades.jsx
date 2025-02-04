import React from 'react'
import Footer from '../components/footer/Footer'
import ScrollDataTableSection3 from '../components/tables/TablaTipoNovedad'

const TableContent = () => {
    return (
      <div className="main-content">       
        <div className="row g-3">
        <h1>Tipo Novedad</h1>
             <ScrollDataTableSection3/>
        </div>
          <Footer/>
      </div>
    )
  }
  
  export default TableContent