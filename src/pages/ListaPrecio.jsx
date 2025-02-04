import React from 'react'
import Footer from '../components/footer/Footer'
import TablaListaPrecio from '../components/tables/TablaListaPrecio'
const ListaPrecio = () => {
    return (
      <div className="main-content">       
        <div className="row g-3">
        <h1>Lista Precios</h1>
             <TablaListaPrecio/>
        </div>
          <Footer/>
      </div>
    )
  }
  
export default ListaPrecio