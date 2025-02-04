import React from 'react'
import Footer from '../footer/Footer'
import { Link } from 'react-router-dom'

const ResetPasswordContent = () => {
  return (
    <div className="main-content login-panel">
        <div className="login-body">
            <div className="top d-flex justify-content-between align-items-center">
                <div className="logo">
                    <img src="assets/images/logo_myDealer.png" alt="Logo"/>
                </div>
                <Link to="/"><i className="fa-duotone fa-house-chimney"></i></Link>
            </div>
            <div className="bottom">
                <h3 className="panel-title">Recuperar contraseña</h3>
                <form>
                    <div className="input-group mb-30">
                        <span className="input-group-text"><i className="fa-regular fa-user"></i></span>
                        <input type="text" className="form-control" placeholder="Nombre de usuario"/>
                    </div>
                    <div className="input-group mb-30">
                        <span className="input-group-text"><i className="fa-regular fa-envelope"></i></span>
                        <input type="text" className="form-control" placeholder="Correo electrónico"/>
                    </div>
                    <button className="btn btn-primary w-100 login-btn">Obtener Link</button>
                </form>
                <div className="other-option">
                    <p className="mb-0">¿Recuerda la contraseña? <Link to="/">Iniciar sesión</Link></p>
                </div>
            </div>
        </div>

        <Footer/>
    </div>
  )
}

export default ResetPasswordContent