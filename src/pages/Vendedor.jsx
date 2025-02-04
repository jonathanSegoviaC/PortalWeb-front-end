import React from 'react'
import Footer from '../components/footer/Footer'
import TablaVendedor from '../components/tables/TablaVendedor'
const Vendedor = () => {
    return (
      <div className="main-content">       
        <div className="row g-3">
             <TablaVendedor/>
        </div>
          <Footer/>
      </div>
    )
  }
  
  export default Vendedor