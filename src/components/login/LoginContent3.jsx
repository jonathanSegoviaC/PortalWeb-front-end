import React, { useContext, useState } from 'react'
import Footer from '../footer/Footer'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import { DigiContext } from '../../context/DigiContext'
import { getLogin } from '../../../services/services';

const LoginContent3 = () => {
    const {passwordVisible, togglePasswordVisibility, isLightTheme} = useContext(DigiContext)
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };
//***************************************** Metodo login */
    const handleLogin = async (event) => {
        event.preventDefault();
        
        try {
            const response = await getLogin(username, password);
            console.log('Inicio de sesión exitoso:', response);
            if (response.mensaje === "OK") {

               // const { nombre, login } = response.datos[0].data_usuario;
                const datos = response.datos[0];
                sessionStorage.setItem('datos', JSON.stringify(datos));
                //console.log(datos.token);
                //sessionStorage.setItem('datos', datos);
                //console.log(datos.token);
               // sessionStorage.setItem('nombre', nombre);
               // sessionStorage.setItem('usuario', login);

                // Redirigir al usuario a otra página después de un inicio de sesión exitoso
                navigate('/dashboard');
            } else {
                console.error('Inicio de sesión fallido:', response.message);
                alert('Error de usuario o contraseña ');
            }
        } catch (error) {
            console.error('Error durante el inicio de sesión:', error);
            alert('Error de usuario o contraseña ');
        }
    };
  return (
    <div className="main-content login-panel login-panel-3">
    <div className="container">
        <div className="d-flex justify-content-end">
            <div className="login-body">
                <div className="top d-flex justify-content-between align-items-center">
                    <div className="logo">
                    <img src={`${isLightTheme? "assets/images/logo-black.png":"assets/images/logo_myDealer.png"}`} alt="Logo"/>
                    </div>
                </div>
                <div className="bottom">
                    <h3 className="panel-title">Inicio de sesión</h3>
                    <form onSubmit={handleLogin}>
                        <div className="input-group mb-25">
                            <span className="input-group-text"><i className="fa-regular fa-user"></i></span>
                            <input type="text" className="form-control" placeholder="Usuario" value={username} onChange={handleUsernameChange}/>
                        </div>
                        <div className="input-group mb-20">
                            <span className="input-group-text"><i className="fa-regular fa-lock"></i></span>
                            <input
                                type={passwordVisible ? 'text' : 'password'}
                                className="form-control rounded-end"
                                placeholder="Contraseña"
                                value={password}
                                onChange={handlePasswordChange}
                            />                            
                            <Link
                            role="button"
                            className="password-show"
                            onClick={togglePasswordVisibility}
                            >
                                <i className="fa-duotone fa-eye"></i>
                            </Link>                        
                        </div>
                        <div className="d-flex justify-content-between mb-25">
                            
                            <Link to="/resetPassword" className="text-white fs-14">¿Olvidó su contraseña?</Link>
                        </div>
                         <button className="btn btn-primary w-100 login-btn" type="submit">Iniciar sesión</button>
                    </form>
                </div>
            </div>
        </div>
    </div>

    <Footer/>
</div>
  )
}

export default LoginContent3