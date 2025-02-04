import React from 'react'
import logo from '../../../public/assets/images/logo_myDealer_final.png'

const NewCustomer = () => {
    return (
        <div className="row mb-30">
            <h1 style={{ fontSize: '4em' }}>Bienvenido a MyDealer</h1>
            <h3 style={{ fontSize: '1em' }}>Usted ha ingresado a la Administración de este Sitio.
                En el lado izquierdo de esta página encontrará un menú de opciones por
                medio del cual podrá acceder a cada una de las páginas necesarias
                para administrar este Sitio Web.</h3>
            <img src={logo} alt="logo de mydealer">
                
            </img>
        </div>

    )
}

export default NewCustomer