import React from 'react'
import Footer from '../components/footer/Footer'
import TablaRutasLogicas from '../components/tables/TablaRutasLogicas'


function RutasLogicas() {
    return (
        <div className="main-content">
            <div className="row g-3">
                <TablaRutasLogicas />
            </div>
            <Footer />
        </div>
    )
}
  
  export default RutasLogicas