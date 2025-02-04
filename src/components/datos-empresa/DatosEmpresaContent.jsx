import React, { useEffect, useState } from 'react';
import { getDatosEmpresa, updateDatosEmpresa, createDatosEmpresa } from '../../../services/services';
import "../../../public/assets/css/style.css";
import "../../../public/assets/css/personalEmpresa.css";
import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { } from '@fortawesome/free-solid-svg-icons';
import { swalMensajeError, swalMensajeExito, swalMensajeInformacion } from '../sweetalert2/MensajeSwal';

const MySwal = withReactContent(Swal);

const DatosEmpresaContent = ({ empresaId }) => {
  const [formData, setFormData] = useState({});
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getDatosEmpresa(empresaId);
        setFormData(data);
      } catch (error) {
        swalMensajeError("Lo siento...", error);
      }
    };
    fetchData();
  }, [empresaId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (formData.claveadmin !== formData.confirmarclaveadmin) {
        swalMensajeError("Datos incorrectos", "Las claves no son iguales!");
        return;
      }
      await updateDatosEmpresa(empresaId, formData);
      const data = await getDatosEmpresa(empresaId);
      setFormData(data);
      swalMensajeExito("Operación exitosa!", "Has actualizado con éxito los datos de la empresa");
    } catch (error) {
      swalMensajeError("Lo siento...", error);
    }
  };

  const handleCancel = async () => {
    await swalMensajeInformacion("Has cancelado los cambios", "Vamos a intentar restablecer los valores originales.");
    const fetchData = async () => {
      try {
        const data = await getDatosEmpresa(empresaId);
        setFormData(data);
      } catch (error) {
        swalMensajeError("Lo siento...", error);
      }
    };
    fetchData();
  };

  const toggleDropdown = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };

  return (
    <div className="main-content">
      <div className='panel'>
        <div className='panel-body'>
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <table className="form-table">
              <tbody>
                <tr>
                  <th><label htmlFor="codempresa">Código de empresa:</label></th>
                  <td><input className="form-control" type="text" id="codempresa" name="codempresa" value={formData.codempresa} readOnly={true} onChange={handleChange} /></td>
                </tr>
                <tr>
                  <th><label htmlFor="nombre">Nombre:</label></th>
                  <td><input className="form-control" type="text" id="nombre" name="nombre" value={formData.nombre} onChange={handleChange} /></td>
                </tr>
                <tr>
                  <th><label htmlFor="direccion">Dirección:</label></th>
                  <td><input className="form-control" type="text" id="direccion" name="direccion" value={formData.direccion} onChange={handleChange} /></td>
                </tr>
                <tr>
                  <th><label htmlFor="telefono">Teléfono:</label></th>
                  <td><input className="form-control" type="tel" id="telefono" name="telefono" value={formData.telefono} onChange={handleChange} /></td>
                </tr>
                <tr>
                  <th><label htmlFor="pais">País:</label></th>
                  <td><input className="form-control" type="text" id="pais" name="pais" value={formData.pais} onChange={handleChange} /></td>
                </tr>
                <tr>
                  <th><label htmlFor="provincia">Provincia:</label></th>
                  <td><input className="form-control" type="text" id="provincia" name="provincia" value={formData.provincia} onChange={handleChange} /></td>
                </tr>
                <tr>
                  <th><label htmlFor="ciudad">Ciudad:</label></th>
                  <td><input className="form-control" type="text" id="ciudad" name="ciudad" value={formData.ciudad} onChange={handleChange} /></td>
                </tr>
                <tr>
                  <th><label htmlFor="fax">Fax:</label></th>
                  <td><input className="form-control" type="text" id="fax" name="fax" value={formData.fax} onChange={handleChange} /></td>
                </tr>
                <tr>
                  <th><label htmlFor="nombretienda">Nombre tienda:</label></th>
                  <td><input className="form-control" type="text" id="nombretienda" name="nombretienda" value={formData.nombretienda} onChange={handleChange} /></td>
                </tr>
                <tr>
                  <th><label htmlFor="logo">Logo:</label></th>
                  <td><input className="form-control" type="file" id="logo" name="logo" accept="image/jpeg" value={formData.logo} onChange={handleChange} /></td>
                </tr>
                <tr>
                  <th><label htmlFor="logo_cabecera">Logo cabecera:</label></th>
                  <td><input className="form-control" type="file" id="logo_Cabecera" name="logo_cabecera" accept="image/jpeg" value={formData.logo_cabecera} onChange={handleChange} /></td>
                </tr>
                <tr>
                  <th><label htmlFor="fotopiecob">Pie Correo Cobros:</label></th>
                  <td><input className="form-control" type="file" id="fotopiecob" name="fotopiecob" accept="image/jpeg" value={formData.fotopiecob} onChange={handleChange} /></td>
                </tr>
                <tr>
                  <th><label htmlFor="emailsoporte">Email soporte:</label></th>
                  <td><input className="form-control" type="text" id="emailsoporte" name="emailsoporte" value={formData.emailsoporte} onChange={handleChange} /></td>
                </tr>
                <tr>
                  <th><label htmlFor="emailorden">Email comercial:</label></th>
                  <td><input className="form-control" type="text" id="emailorden" name="emailorden" value={formData.emailorden} onChange={handleChange} /></td>
                </tr>
                <tr>
                  <th><label htmlFor="usuarioadmin">Administrador:</label></th>
                  <td><input className="form-control" type="text" id="usuarioadmin" name="usuarioadmin" value={formData.usuarioadmin} onChange={handleChange} /></td>
                </tr>
                <tr>
                  <th><label htmlFor="claveadmin">Clave:</label></th>
                  <td><input className="form-control" type="password" id="claveadmin" name="claveadmin" value={formData.claveadmin} onChange={handleChange} /></td>
                </tr>
                <tr>
                  <th><label htmlFor="confirmarclaveadmin">Confirmar clave:</label></th>
                  <td><input className="form-control" type="password" id="confirmarclaveadmin" name="confirmarclaveadmin" value={formData.confirmarclaveadmin} onChange={handleChange} /></td>
                </tr>
                <tr>
                  <th><label htmlFor="mensaje">Mensaje:</label></th>
                  <td><input className="form-control" type="text" id="mensaje" name="mensaje" value={formData.mensaje} onChange={handleChange} /></td>
                </tr>
              </tbody>
            </table>
            <div>
              <button type="button" className="btn btn-sm btn-primary site-view-btn" onClick={() => { toggleDropdown() }}>
                {isDropdownVisible ? 'Ocultar Datos Adicionales' : 'Mostrar Datos Adicionales'}
              </button>
              {isDropdownVisible && (
                <div className="dropdown-content">
                  <table className="form-table">
                    <tbody>
                      <tr>
                        <th><label htmlFor="cargo1">Cargo 1:</label></th>
                        <td><input className="form-control" type="text" id="cargo1" name="cargo1" value={formData.cargo1} onChange={handleChange} /></td>
                      </tr>
                      <tr>
                        <th><label htmlFor="nombre1">Nombre 1:</label></th>
                        <td><input className="form-control" type="text" id="nombre1" name="nombre1" value={formData.nombre1} onChange={handleChange} /></td>
                      </tr>
                      <tr>
                        <th><label htmlFor="email1">Email 1:</label></th>
                        <td><input className="form-control" type="email" id="email1" name="email1" value={formData.email1} onChange={handleChange} /></td>
                      </tr>
                      <tr>
                        <th><label htmlFor="foto1">Foto 1:</label></th>
                        <td>
                          <input className="form-control" type="file" id="foto1" name="foto1" accept="image/jpeg" onChange={handleChange} />
                          <small>* De preferencia suba una imagen de 150px - 200px</small>
                        </td>
                      </tr>
                      <tr>
                        <th><label htmlFor="cargo2">Cargo 2:</label></th>
                        <td><input className="form-control" type="text" id="cargo2" name="cargo2" value={formData.cargo2} onChange={handleChange} /></td>
                      </tr>
                      <tr>
                        <th><label htmlFor="nombre2">Nombre 2:</label></th>
                        <td><input className="form-control" type="text" id="nombre2" name="nombre2" value={formData.nombre2} onChange={handleChange} /></td>
                      </tr>
                      <tr>
                        <th><label htmlFor="email2">Email 2:</label></th>
                        <td><input className="form-control" type="email" id="email2" name="email2" value={formData.email2} onChange={handleChange} /></td>
                      </tr>
                      <tr>
                        <th><label htmlFor="foto2">Foto 2:</label></th>
                        <td>
                          <input className="form-control" type="file" id="foto2" name="foto2" accept="image/jpeg" onChange={handleChange} />
                          <small>* De preferencia suba una imagen de 150px - 200px</small>
                        </td>
                      </tr>
                      <tr>
                        <th><label htmlFor="cargo3">Cargo 3:</label></th>
                        <td><input className="form-control" type="text" id="cargo3" name="cargo3" value={formData.cargo3} onChange={handleChange} /></td>
                      </tr>
                      <tr>
                        <th><label htmlFor="nombre3">Nombre 3:</label></th>
                        <td><input className="form-control" type="text" id="nombre3" name="nombre3" value={formData.nombre3} onChange={handleChange} /></td>
                      </tr>
                      <tr>
                        <th><label htmlFor="email3">Email 3:</label></th>
                        <td><input className="form-control" type="email" id="email3" name="email3" value={formData.email3} onChange={handleChange} /></td>
                      </tr>
                      <tr>
                        <th><label htmlFor="foto3">Foto 3:</label></th>
                        <td>
                          <input className="form-control" type="file" id="foto3" name="foto3" accept="image/jpeg" onChange={handleChange} />
                          <small>* De preferencia suba una imagen de 150px - 200px</small>
                        </td>
                      </tr>
                      <tr>
                        <th><label htmlFor="cargo4">Cargo 4:</label></th>
                        <td><input className="form-control" type="text" id="cargo4" name="cargo4" value={formData.cargo4} onChange={handleChange} /></td>
                      </tr>
                      <tr>
                        <th><label htmlFor="nombre4">Nombre 4:</label></th>
                        <td><input className="form-control" type="text" id="nombre4" name="nombre4" value={formData.nombre4} onChange={handleChange} /></td>
                      </tr>
                      <tr>
                        <th><label htmlFor="email4">Email 4:</label></th>
                        <td><input className="form-control" type="email" id="email4" name="email4" value={formData.email4} onChange={handleChange} /></td>
                      </tr>
                      <tr>
                        <th><label htmlFor="foto4">Foto 4:</label></th>
                        <td>
                          <input className="form-control" type="file" id="foto4" name="foto4" accept="image/jpeg" onChange={handleChange} />
                          <small>* De preferencia suba una imagen de 150px - 200px</small>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              )}
            </div>
            <br />
            <div className="form-buttons">
              <button className="btn btn-sm btn-primary site-view-btn" type="submit">Guardar cambios</button>
              <button className="btn btn-sm btn-primary site-view-btn" type="button" onClick={() => handleCancel()}>Cancelar</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default DatosEmpresaContent;