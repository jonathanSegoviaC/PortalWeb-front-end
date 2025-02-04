import React from 'react'
import Footer from "../components/footer/Footer"
import DashboardBreadcrumb from '../components/breadcrumb/DashboardBreadcrumb'
import NewCustomer from '../components/dashboard/NewCustomer'

const DashboardMainContent = () => {
  return (
    <div className="main-content">
        <DashboardBreadcrumb title={'Administración del Sitio'}/>
        <div className="row">
            <NewCustomer/>
        </div>
        <Footer/>
    </div>
  )
}

export default DashboardMainContent