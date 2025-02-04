import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Container, Row, Col, InputGroup, FormControl } from 'react-bootstrap';
import axios from 'axios';
import { swalMensajeError } from '../sweetalert2/MensajeSwal';

const TablaParametros = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [dataPerPage, setDataPerPage] = useState(10);
  const [dataList, setDataList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editData, setEditData] = useState(null);

  // Formato para datos de formulario
  const [formData, setFormData] = useState({
    codparametro: "",
    descripcion: "",
    valor: "",
    categoria: "",
    tipo: "T"
  });

  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get('http://home.mydealer.ec:8000/api/parametros');
        setDataList(response.data.datos);
      } catch (error) {
        swalMensajeError("Lo siento...", error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleShowModal = (data = null) => {
    setEditData(data);
    if (data) {
      setFormData({
        codparametro: data.Codigo,
        descripcion: data.Descripcion,
        valor: data.Valor,
        categoria: data.Categoria || "",
        tipo: data.Tipo
      });
    } else {
      setFormData({
        codparametro: '',
        descripcion: '',
        valor: '',
        categoria: '',
        tipo: 'T'
      });
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditData(null);
    setFormData({
      codparametro: '',
      descripcion: '',
      valor: '',
      categoria: '',
      tipo: 'T'
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
    data.Codigo.toLowerCase().includes(searchTerm.toLowerCase()) ||
    data.Descripcion.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastData = currentPage * dataPerPage;
  const indexOfFirstData = indexOfLastData - dataPerPage;
  const currentData = filteredData.slice(indexOfFirstData, indexOfLastData);

  const totalPages = Math.ceil(filteredData.length / dataPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleSubmit = async () => {
    try {
      const { codparametro, descripcion, valor, categoria, tipo } = formData;
      const paramData = { codparametro, descripcion, valor, categoria, tipo };

      if (editData) {
        await axios.put(`http://home.mydealer.ec:8000/api/parametros/${editData.Codigo}`, paramData);
      } else {
        await axios.post('http://home.mydealer.ec:8000/api/parametros', paramData);
      }

      setShowModal(false);
      const response = await axios.get('http://home.mydealer.ec:8000/api/parametros');
      setDataList(response.data.datos);
    } catch (error) {
      swalMensajeError("Error al guardar los datos", error.message);
    }
  };

  const handleDelete = async (codigo) => {
    try {
      await axios.delete(`http://home.mydealer.ec:8000/api/parametros/${codigo}`);
      const response = await axios.get('http://home.mydealer.ec:8000/api/parametros');
      setDataList(response.data.datos);
    } catch (error) {
      swalMensajeError("Error al eliminar los datos", error.message);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Container fluid>
      <Row className="mb-3">
        <Col md={6}>
          <InputGroup>
            <FormControl
              placeholder="Buscar por código o descripción"
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
            <option value="20">20 datos por página</option>
          </Form.Select>
        </Col>
      </Row>
      <Row>
        <Col>
          <div className="card">
            <div className="card-body">
              <div className="table-responsive">
                <Table className="table table-dashed table-hover digi-dataTable table-striped" id="componentDataTable">
                  <thead>
                    <tr>
                      <th>Acciones</th>
                      <th>Código</th>
                      <th>Descripción</th>
                      <th>Valor</th>
                      <th>Categoría</th>
                      <th>Tipo</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentData.map((data) => (
                      <tr key={data.Codigo}>
                        <td>
                          <Button variant="warning" onClick={() => handleShowModal(data)} size="sm">Editar</Button>
                          <Button variant="danger" onClick={() => handleDelete(data.Codigo)} size="sm" className="ml-2">Eliminar</Button>
                        </td>
                        <td>{data.Codigo}</td>
                        <td>{data.Descripcion}</td>
                        <td>{data.Valor}</td>
                        <td>{data.Categoria || 'N/A'}</td>
                        <td>{data.Tipo}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
              <PaginationSection currentPage={currentPage} totalPages={totalPages} paginate={paginate} />
            </div>
          </div>
        </Col>
      </Row>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{editData ? 'Editar Parámetro' : 'Agregar Parámetro'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Código Parámetro</Form.Label>
              <Form.Control
                type="text"
                name="codparametro"
                value={formData.codparametro}
                onChange={handleChange}
                disabled={!!editData}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Descripción</Form.Label>
              <Form.Control
                type="text"
                name="descripcion"
                value={formData.descripcion}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Valor</Form.Label>
              <Form.Control
                type="text"
                name="valor"
                value={formData.valor}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Categoría</Form.Label>
              <Form.Control
                type="text"
                name="categoria"
                value={formData.categoria}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Tipo</Form.Label>
              <Form.Control
                type="text"
                name="tipo"
                value={formData.tipo}
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

export default TablaParametros;
