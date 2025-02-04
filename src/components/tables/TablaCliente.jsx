import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Container, Row, Col, InputGroup, FormControl } from 'react-bootstrap';
import { getDatosClientes,getPerfilUsuario } from '../../../services/services';
import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil, faTrash, faMobilePhone, faInfo, faArrowCircleRight, faArrowRight, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { swalMensajeConfirmacion, swalMensajeError, swalMensajeExito, swalMensajeInformacion } from '../sweetalert2/MensajeSwal';

const MySwal = withReactContent(Swal);

const TablaCliente = () => {
  let index = 0;
  const [currentPage, setCurrentPage] = useState(1);
  const [dataPerPage, setDataPerPage] = useState(10);
  const [showModal, setShowModal] = useState(false);
  const [showModalInfoMovil, setShowModalInfoMovil] = useState(false);
  const [readOnlyInfo, setReadOnlyInfo] = useState(false);
  const [dataList, setDataList] = useState([]);
  const [dataListMovil, setDataListMovil] = useState([]);
  const [formData, setFormData] = useState({});
  const [formDataInfoMovil, setFormDataInfoMovil] = useState({});
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await getDatosClientes();
        const datos = response.data.datos;
        setDataList(datos);
       // console.log("Datos", datos);
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

  const handleShowModalInfo = (datos) => {
    setFormData(datos);
    setShowModal(true);
    setReadOnlyInfo(true);
  };

  const handleCloseModal = () => {
    setReadOnlyInfo(false);
    setShowModal(false);
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

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const filteredData = dataList ? dataList.filter(datos =>
    datos.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  ):[];

  const indexOfLastData = currentPage * dataPerPage;
  const indexOfFirstData = indexOfLastData - dataPerPage;
  const currentData = filteredData.slice(indexOfFirstData, indexOfLastData);

  const totalPages = Math.ceil(filteredData.length / dataPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

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
                    <th>Info</th>
                    <th>Código Cliente</th>
                    <th>Nombre</th>
                    <th style={{textAlign:'center'}}>Email</th>
                  </tr>
                </thead>
                <tbody>
                  {currentData.map((datos) => (
                    <tr key={datos.codcliente}>
                      <td style={{ display: 'flex', justifyContent: 'space-evenly' }}>
                        <Button variant="info" onClick={() => { handleShowModalInfo(datos) }} size="sm" title='Ver información completa'>
                          <FontAwesomeIcon icon={faInfo} />
                        </Button>
                      </td>
                      <td>{datos.codcliente}</td>
                      <td>{datos.nombre}</td>
                      <td>{datos.email}</td>
                      <td style={{ display: 'flex', justifyContent: 'space-evenly' }}>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              <div className="pagination justify-content-end mt-3">
      <Button
      onClick={prevPage}
      className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}
      style={{ fontSize: '0.8rem' }}
      >
                  <FontAwesomeIcon icon={faArrowLeft} />
                </Button>
                <Button
                  onClick={nextPage}
                  className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}
                  style={{ fontSize: '0.8rem', marginLeft: '10px' }} 
                  >
                    <FontAwesomeIcon icon={faArrowRight} />
                  </Button>
     </div>
            </div>
          </div>
        </Col>
      </Row>

      <Modal show={showModal} onHide={() => handleCloseModal()}>
        <Modal.Header>
          <Modal.Title>{readOnlyInfo ? 'Información completa del vendedor' : 'Editar información de vendedor'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Código</Form.Label>
              <Form.Control
                type="text"
                name="codcliente"
                value={formData.codcliente || "Indefinido"}
                readOnly={true}
                onChange={handleChange}
              />
            </Form.Group>
            <br />
            <Form.Group>
              <Form.Label>Código tipo cliente</Form.Label>
              <Form.Control
                type="text"
                name="codtipocliente"
                value={formData.codtipocliente || "Indefinido"}
                readOnly={readOnlyInfo}
                onChange={handleChange}
              />
            </Form.Group>
            <br />
            <Form.Group>
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                name="nombre"
                value={formData.nombre || "Indefinido"}
                readOnly={readOnlyInfo}
                onChange={handleChange}
              />
            </Form.Group>
            <br />
            <Form.Group>
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="text"
                name="email"
                value={formData.email || "Indefinido"}
                readOnly={readOnlyInfo}
                onChange={handleChange}
              />
            </Form.Group>
            <br />
            <Form.Group>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="text"
                name="password"
                value={formData.password || "Indefinido"}
                readOnly={readOnlyInfo}
                onChange={handleChange}
              />
            </Form.Group>
            <br />
            <Form.Group>
              <Form.Label>País</Form.Label>
              <Form.Control
                type="text"
                name="pais"
                value={formData.pais || "Indefinido"}
                readOnly={readOnlyInfo}
                onChange={handleChange}
              />
            </Form.Group>
            <br />
            <Form.Group>
              <Form.Label>Provincia</Form.Label>
              <Form.Control
                type="text"
                name="provincia"
                value={formData.provincia || "Indefinido"}
                readOnly={readOnlyInfo}
                onChange={handleChange}
              />
            </Form.Group>
            <br />
            <Form.Group>
              <Form.Label>Ciudad</Form.Label>
              <Form.Control
                type="text"
                name="ciudad"
                value={formData.ciudad || "Indefinido"}
                readOnly={readOnlyInfo}
                onChange={handleChange}
              />
            </Form.Group>
            <br />
            <Form.Group>
              <Form.Label>Código vendedor</Form.Label>
              <Form.Control
                type="text"
                name="codvendedor"
                value={formData.codvendedor || "Indefinido"}
                readOnly={readOnlyInfo}
                onChange={handleChange}
              />
            </Form.Group>
            <br />
            <Form.Group>
              <Form.Label>Forma pago</Form.Label>
              <Form.Control
                type="text"
                name="codformapago"
                value={formData.codformapago || "Indefinido"}
                readOnly={readOnlyInfo}
                onChange={handleChange}
              />
            </Form.Group>
            <br />
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => { handleCloseModal() }}>Cerrar</Button>
          {
            readOnlyInfo ?
              <></>
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

export default TablaCliente;
