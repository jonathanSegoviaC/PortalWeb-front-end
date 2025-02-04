import React from 'react'
import Footer from '../components/footer/Footer'
import TablaClientesxVendedor from '../components/tables/TablaClientesxVendedor'


function ClientexVendedor() {
    return (
        <div className="main-content">
            <div className="row g-3">
                <TablaClientesxVendedor />
            </div>
            <Footer />
        </div>
    )
}
  
  export default ClientexVendedor