import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Container, Row, Col, InputGroup, FormControl } from 'react-bootstrap';
import axios from 'axios';
import { getUsuariosAdministrativos } from '../../../services/services';
import { swalMensajeError } from '../sweetalert2/MensajeSwal';

const TablaUsuariosAdministrativos = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [dataPerPage, setDataPerPage] = useState(10);
  const [dataList, setDataList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editData, setEditData] = useState(null);

  //Formato para bajarse los datos GET
  const [formData, setFormData] = useState({
    loginUsuario: "",
    nombre: "",
    apellido: "",
    email: "",
    cargo: "",
    codPerfil: "",
    estado: "",
    division: ""
  });

  //Formato para subir datos POST PUT
  const [formUpData, setUpFormData] = useState({
    loginusuario: "",
    password: "",
    nombre: "",
    apellido: "",
    email: "",
    codperfil: 1,
    coddivision: ""
  });

  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await getUsuariosAdministrativos();
        setFormData(response.datos);
      } catch (error) {
        swalMensajeError("Lo siento...", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleShowModal = (data = null) => {
    setEditData(data);
    if (data) {
      setFormData(data);
    } else {
      setFormData({
        loginUsuario: '',
        nombre: '',
        apellido: '',
        email: '',
        cargo: '',
        codPerfil: '',
        estado: '',
        division: '',
        password: '',
      });
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditData(null);
    setFormData({
      loginUsuario: '',
      nombre: '',
      apellido: '',
      email: '',
      cargo: '',
      codPerfil: '',
      estado: '',
      division: '',
      password: '',
    });
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

  const filteredData = dataList.filter(data =>
    data.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    data.apellido.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastData = currentPage * dataPerPage;
  const indexOfFirstData = indexOfLastData - dataPerPage;
  const currentData = filteredData.slice(indexOfFirstData, indexOfLastData);

  const totalPages = Math.ceil(filteredData.length / dataPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleSubmit = async () => {
    try {
      const { loginUsuario, password, nombre, apellido, email, codPerfil, division } = formData;
      const userData = { loginUsuario, password, nombre, apellido, email, codPerfil, division };

      if (editData) {
        await axios.put(`http://home.mydealer.ec:8000/api/user/administracion/${editData.loginUsuario}`, userData);
      } else {
        await axios.post('http://home.mydealer.ec:8000/api/user/administracion', userData);
      }

      setShowModal(false);
      const response = await axios.get('http://home.mydealer.ec:8000/api/user/administracion');
      setDataList(response.data.datos);
    } catch (error) {
      swalMensajeError("Error al guardar los datos", error);
    }
  };

  const handleDelete = async (loginUsuario) => {
    try {
      await axios.delete(`http://home.mydealer.ec:8000/api/user/administracion/${loginUsuario}`);
      const response = await axios.get('http://home.mydealer.ec:8000/api/user/administracion');
      setDataList(response.data.datos);
    } catch (error) {
      swalMensajeError("Error al eliminar los datos", error);
    }
  };

  return (
    <Container fluid>
      <Row className="mb-3">
        <Col md={6}>
          <InputGroup>
            <FormControl
              placeholder="Buscar por nombre o apellido"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Button variant="outline-secondary" onClick={() => setSearchTerm('')}>Limpiar</Button>
          </InputGroup>
        </Col>
        <Col md={6} className="text-end">
          <Button variant="primary" onClick={() => handleShowModal()}>Insertar</Button>
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
                    <th>Usuario</th>
                    <th>Nombre</th>
                    <th>Perfil</th>
                    <th>Estado</th>
                    <th>División</th>
                  </tr>
                </thead>
                <tbody>
                  {currentData.map((data) => (
                    <tr key={data.loginUsuario}>
                      <td>
                        <Button variant="warning" onClick={() => handleShowModal(data)} size="sm">Editar</Button>
                        <Button variant="danger" onClick={() => handleDelete(data.loginUsuario)} size="sm" className="ml-2">Eliminar</Button>
                      </td>
                      <td>{data.loginUsuario}</td>
                      <td>{`${data.nombre} ${data.apellido}`}</td>
                      <td>{data.codPerfil}</td>
                      <td>{data.estado}</td>
                      <td>{data.division}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              <PaginationSection currentPage={currentPage} totalPages={totalPages} paginate={paginate} />
            </div>
          </div>
        </Col>
      </Row>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{editData ? 'Editar Usuario' : 'Agregar Usuario'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Login Usuario</Form.Label>
              <Form.Control
                type="text"
                name="loginUsuario"
                value={formData.loginUsuario}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Apellido</Form.Label>
              <Form.Control
                type="text"
                name="apellido"
                value={formData.apellido}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Código Perfil</Form.Label>
              <Form.Control
                type="text"
                name="codPerfil"
                value={formData.codPerfil}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>División</Form.Label>
              <Form.Control
                type="text"
                name="division"
                value={formData.division}
                onChange={handleChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>Cerrar</Button>
          <Button variant="primary" onClick={handleSubmit}>
            {editData ? 'Guardar Cambios' : 'Agregar'}
          </Button>
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

export default TablaUsuariosAdministrativos;
