import React from 'react'
import Footer from '../components/footer/Footer'
import TablaCliente from '../components/tables/TablaCliente'
const Cliente = () => {
    return (
      <div className="main-content">       
        <div className="row g-3">
        <h1>Cliente</h1>
             <TablaCliente/>
        </div>
          <Footer/>
      </div>
    )
  }
  
export default Cliente