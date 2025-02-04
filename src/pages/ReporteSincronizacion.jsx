import React from 'react'
import Footer from '../components/footer/Footer'
import TablaReporteSincronizacion from '../components/tables/TablaReporteSincronizacion'
const ReporteSincronizacion = () => {
    return (
      <div className="main-content">       
        <div className="row g-3">
            <div>
                <h1>Reporte Sincronización</h1>
            </div>
        
             <TablaReporteSincronizacion/>
        </div>
          <Footer/>
      </div>
    )
  }
  
export default ReporteSincronizacion