import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Container, Row, Col, InputGroup, FormControl } from 'react-bootstrap';
import { getTipoNovedad, updateTipoNovedad, deleteTipoNovedad, createMenuCabecera } from '../../../services/services';
import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil, faTrash, faMobilePhone, faInfo, faCircleUser } from '@fortawesome/free-solid-svg-icons';
import { swalMensajeConfirmacion, swalMensajeError, swalMensajeExito, swalMensajeInformacion } from '../sweetalert2/MensajeSwal';
import { deleteMenuCabecera, getMenuCabecera, updateMenuCabecera } from '../../../services/services';


const MenuCabeceraContent = () => {
  let index = 0;
  const [currentPage, setCurrentPage] = useState(1);
  const [dataPerPage, setDataPerPage] = useState(10);
  const [showModal, setShowModal] = useState(false);
  const [readOnlyInfo, setReadOnlyInfo] = useState(false);
  const [dataList, setDataList] = useState([]);
  const [formData, setFormData] = useState({});
  const [showModalCreate, setShowModalCreate] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await getMenuCabecera();
        const datos = response.data.datos;
        setDataList(datos);
        console.log("Datos", datos);
      } catch (error) {
        swalMensajeError("Lo siento...", error);
      }
    }
    fetchData();
  }, []);

  const handleShowModal = (datos) => {
    setFormData(datos);
    setShowModal(true);
  };

  const handleShowModalCreate = (datos = {}) => {
    setFormData(datos);
    setShowModal(true);
    setShowModalCreate(true);
  };

  const handleCloseModal = () => {
    setReadOnlyInfo(false);
    setShowModal(false);
    setShowModalCreate(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handlePerPageChange = (e) => {
    setDataPerPage(parseInt(e.target.value));
    setCurrentPage(1);
  };

  const filteredData = dataList ? dataList.filter(datos =>
    datos.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  ) : [];

  const indexOfLastData = currentPage * dataPerPage;
  const indexOfFirstData = indexOfLastData - dataPerPage;
  const currentData = filteredData.slice(indexOfFirstData, indexOfLastData);

  const totalPages = Math.ceil(filteredData.length / dataPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const transformKeysToLowerCase = (obj) => {
    return Object.keys(obj).reduce((acc, key) => {
      acc[key.toLowerCase()] = obj[key];
      return acc;
    }, {});
  };

  const handleSubmitUser = async (datos) => {
    try {
      const transformedData = transformKeysToLowerCase(datos);
      const response_update = await createMenuCabecera(transformedData);
      swalMensajeExito("Operación exitosa!", "Has creado un tipo novedad");
      const response = await getMenuCabecera();
      setDataList(response.data.datos);
      setShowModal(false);
    } catch (error) {
      setShowModal(false);
      swalMensajeError("Lo siento...", "No se ha podido crear el menu cabecera, aquí el error: \n" + error);
    }
  };

  const handleSubmit = async (datos) => {
    try {
      const transformedData = transformKeysToLowerCase(datos);
      const response_update = await updateMenuCabecera(datos.codmenucabecera, transformedData);
      swalMensajeExito("Operación exitosa!", "Has actualizado con éxito los datos de menu cabecera");
      const response = await getMenuCabecera();
      setDataList(response.data.datos);
      setShowModal(false);
    } catch (error) {
      setShowModal(false);
      swalMensajeError("Lo siento...", "No se ha podido actualizar los datos de meni cabecera, aquí el error: \n" + error);
    }
  };

  const handleDelete = async (perfil) => {
    try {
      const titulo = "¿Estas seguro?";
      const mensaje = "Borrara un registro y no podrá recuperarlo.";
      const mensaje_confirmacion = "Has borrado con éxito el registro menu cabecera";
      const mensaje_cancelacion = "Has cancelado esta operación";
      const response_confirmacion = await swalMensajeConfirmacion(titulo, mensaje, mensaje_confirmacion, mensaje_cancelacion);
      if (response_confirmacion.confirmed) {
        await deleteMenuCabecera(perfil);
        const response = await getMenuCabecera();
        setDataList(response.data.datos);
      }
    } catch (error) {
      swalMensajeError("Lo siento...", "No se ha podido borrar los datos de menu cabecera, aquí el error: \n" + error);
    }
  };

  return (
    <Container fluid>
      <Row className="mb-3">
        <Col md={6}>
          <InputGroup>
            <FormControl
              placeholder="Buscar por nombre"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Button variant="outline-secondary" onClick={() => setSearchTerm('')}>Limpiar</Button>
          </InputGroup>
        </Col>

        <Col md={6} className="text-right">
          <Button variant="info" onClick={() => { handleShowModalCreate() }} size="sm" title='Crear perfil'>
            <FontAwesomeIcon icon={faCircleUser} /> Agregar
          </Button>
        </Col>

      </Row>
      <Row className="mb-3">
        <Col md={6}>
          <Form.Select onChange={handlePerPageChange} value={dataPerPage}>
            <option value="5">5 datos por página</option>
            <option value="10">10 datos por página</option>
            <option value="15">15 datos por página</option>
          </Form.Select>
        </Col>
      </Row>
      <Row>
        <Col>
          <div className="card">
            <div className="card-body">
              <Table className="table table-dashed table-hover digi-dataTable table-striped" id="componentDataTable">
                <thead>
                  <tr>
                    <th>Acciones</th>
                    <th>Código</th>
                    <th>Nombre de menú</th>
                    <th>Orden</th>
                    <th>Sitio</th>

                  </tr>
                </thead>
                <tbody>
                  {currentData.map((datos) => (
                    <tr key={datos.codmenucabecera}>
                      <td style={{ display: 'flex', justifyContent: 'space-evenly' }}>
                        <Button variant="warning" onClick={() => { handleShowModal(datos) }} size="sm" title='Editar registro'>
                          <FontAwesomeIcon icon={faPencil} />
                        </Button>
                        <Button variant="danger" onClick={() => { handleDelete(datos.codmenucabecera) }} size="sm" title='Borrar registro'>
                          <FontAwesomeIcon icon={faTrash} />
                        </Button>
                      </td>
                      <td>{datos.codmenucabecera}</td>
                      <td>{datos.nombre}</td>
                      <td>{datos.orden}</td>
                      <td>{datos.sitio}</td>
                      <td style={{ display: 'flex', justifyContent: 'space-evenly' }}>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              <PaginationSection currentPage={currentPage} totalPages={totalPages} paginate={paginate} />
            </div>
          </div>
        </Col>
      </Row>

      <Modal show={showModal} onHide={() => handleCloseModal()}>
        <Modal.Header>
          <Modal.Title>{showModalCreate ? 'Información completa de tipo novedad' : 'Editar información de tipo novedad'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            {showModalCreate ?
              <></> :
              <Form.Group>
                <Form.Label>Código</Form.Label>
                <Form.Control
                  type="text"
                  name="Codigo"
                  value={formData.codmenucabecera || "Indefinido"}
                  readOnly={true}
                  onChange={handleChange}
                />
              </Form.Group>
            }
            <br />
            <Form.Group>
              <Form.Label>Nombre de Menú</Form.Label>
              <Form.Control
                type="text"
                name="nombre"
                value={formData.nombre || ""}
                onChange={handleChange}
              />
            </Form.Group>
            <br />
            <Form.Group>
              <Form.Label>Orden</Form.Label>
              <Form.Control
                type="text"
                name="orden"
                value={formData.orden || ""}
                onChange={handleChange}
              />
            </Form.Group>
            <br />
            <Form.Group>
              <Form.Label>Sitio</Form.Label>
              <Form.Control
                type="text"
                name="sitio"
                value={formData.sitio || ""}
                onChange={handleChange}
              />
            </Form.Group>
            <br />
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => { handleCloseModal() }}>Cerrar</Button>
          {
            showModalCreate ?
              <Button variant="primary" onClick={() => { handleSubmitUser(formData) }}>
                {'Guardar Cambios'}
              </Button>
              :
              <Button variant="primary" onClick={() => { handleSubmit(formData) }}>
                {'Guardar Cambios'}
              </Button>
          }

        </Modal.Footer>
      </Modal>
    </Container>
  );
};

const PaginationSection = ({ currentPage, totalPages, paginate }) => {
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="pagination justify-content-end mt-3">
      {pageNumbers.map(number => (
        <Button
          key={number}
          onClick={() => paginate(number)}
          className={`page-item ${number === currentPage ? 'active' : ''}`}
          style={{ fontSize: '0.8rem' }}
        >
          {number}
        </Button>
      ))}
    </div>
  );
};

export default MenuCabeceraContent;
