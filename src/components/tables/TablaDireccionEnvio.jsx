import React, { useState, useEffect } from 'react';
import { Table, Container, Row, Col, InputGroup, FormControl, Button, Form } from 'react-bootstrap';
import axios from 'axios';
import { swalMensajeError } from '../sweetalert2/MensajeSwal';

const TablaDireccionesEnvio = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [dataPerPage, setDataPerPage] = useState(10);
  const [dataList, setDataList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get('http://home.mydealer.ec:8000/api/reporte/direccion/envio');
        setDataList(response.data.datos);
      } catch (error) {
        swalMensajeError("Lo siento...", error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handlePerPageChange = (e) => {
    setDataPerPage(parseInt(e.target.value));
    setCurrentPage(1);
  };

  const filteredData = dataList.filter((data) =>
    (data.nombrecliente || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastData = currentPage * dataPerPage;
  const indexOfFirstData = indexOfLastData - dataPerPage;
  const currentData = filteredData.slice(indexOfFirstData, indexOfLastData);

  const totalPages = Math.ceil(filteredData.length / dataPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Container fluid>
      <Row className="mb-3">
        <Col md={6}>
          <InputGroup>
            <FormControl
              placeholder="Buscar por nombre del cliente"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Button variant="outline-secondary" onClick={() => setSearchTerm('')}>
              Limpiar
            </Button>
          </InputGroup>
        </Col>
        <Col md={6} className="text-end">
          <Form.Select onChange={handlePerPageChange} value={dataPerPage}>
            <option value="5">5 datos por página</option>
            <option value="10">10 datos por página</option>
            <option value="15">15 datos por página</option>
            <option value="20">20 datos por página</option>
          </Form.Select>
        </Col>
      </Row>

      {/* Contenedor responsivo para la tabla */}
      <div className="table-responsive">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>CodDirecciónEnvío</th>
              <th>Código del Cliente</th>
              <th>Nombre del Cliente</th>
              <th>Nombre del Destinatario</th>
              <th>País</th>
              <th>Provincia</th>
              <th>Ciudad</th>
              <th>Dirección</th>
              <th>Orden</th>
              <th>Latitud</th>
              <th>Longitud</th>
            </tr>
          </thead>
          <tbody>
            {currentData.map((data, index) => (
              <tr key={data.coddireccionenvio}>
                <td>{indexOfFirstData + index + 1}</td>
                <td>{data.coddireccionenvio}</td>
                <td>{data.codcliente}</td>
                <td>{data.nombrecliente}</td>
                <td>{data.nombredestinatario}</td>
                <td>{data.pais}</td>
                <td>{data.provincia}</td>
                <td>{data.ciudad}</td>
                <td>{data.direccion}</td>
                <td>{data.orden}</td>
                <td>{data.latitud || 'N/A'}</td>
                <td>{data.longitud || 'N/A'}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      <PaginationSection currentPage={currentPage} totalPages={totalPages} paginate={paginate} />
    </Container>
  );
};

const PaginationSection = ({ currentPage, totalPages, paginate }) => {
  return (
    <div className="pagination justify-content-end mt-3">
      <Button
        onClick={() => paginate(currentPage - 1)}
        disabled={currentPage === 1}
        className="me-2"
        style={{
          backgroundColor: currentPage === 1 ? "#5c5c5c" : "#007bff",
          borderColor: "transparent",
        }}
      >
        ←
      </Button>
      <Button
        onClick={() => paginate(currentPage + 1)}
        disabled={currentPage === totalPages}
        style={{
          backgroundColor: currentPage === totalPages ? "#5c5c5c" : "#007bff",
          borderColor: "transparent",
        }}
      >
        →
      </Button>
    </div>
  );
};

export default TablaDireccionesEnvio;
