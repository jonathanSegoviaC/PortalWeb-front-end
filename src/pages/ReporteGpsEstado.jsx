import React from 'react'
import Footer from '../components/footer/Footer'


import TablaReporteGpsEstado from '../components/tables/TablaReporteGpsEstado'

function ReporteGpsEstado() {
    return (
        <div className="main-content">
            <div className="row g-3">
                <TablaReporteGpsEstado />
            </div>
            <Footer />
        </div>
    )
}
  
  export default ReporteGpsEstado