import React from 'react'
import Footer from '../components/footer/Footer'
import TablaListaPrecio from '../components/tables/TablaListaPrecio'
import TablaListaPrecioDetalle from '../components/tables/TablaListaPreciosDetalle'
const ListaPrecioDetalle = () => {
    return (
      <div className="main-content">       
        <div className="row g-3">
        <h1>Lista Precios Detalle</h1>
             <TablaListaPrecioDetalle/>
        </div>
          <Footer/>
      </div>
    )
  }
  
export default ListaPrecioDetalle