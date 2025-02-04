import React, { useState, useEffect } from 'react';
import { Table, Container, Row, Col, Button, Form } from 'react-bootstrap';
import axios from 'axios';

const TablaListaPrecioDetalle = () => {
  const [dataList, setDataList] = useState([]); // Datos obtenidos
  const [loading, setLoading] = useState(true); // Estado de carga
  const [currentPage, setCurrentPage] = useState(1); // Página actual
  const [dataPerPage, setDataPerPage] = useState(10); // Datos por página
  const [searchTerm, setSearchTerm] = useState(''); // Término de búsqueda

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get('http://localhost:8000/api/listapreciosdet');
        console.log('Datos obtenidos de la API:', response.data);
        if (Array.isArray(response.data)) {
          setDataList(response.data); // Asignar los datos al estado
        } else {
          console.error('Respuesta no es un arreglo:', response.data);
        }
      } catch (error) {
        console.error('Error al obtener los datos de la API:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleDataPerPageChange = (e) => {
    setDataPerPage(Number(e.target.value));
  };

  // Filtrar los datos por el término de búsqueda
  const filteredDataList = dataList.filter((data) =>
    data.codproducto?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastData = currentPage * dataPerPage;
  const indexOfFirstData = indexOfLastData - dataPerPage;
  const currentData = filteredDataList.slice(indexOfFirstData, indexOfLastData);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const totalPages = Math.ceil(filteredDataList.length / dataPerPage);

  if (loading) {
    return <div>Cargando datos...</div>;
  }

  return (
    <Container fluid>
      <Row className="mb-3">
        <Col md={6}>
          <Form.Control
            type="text"
            placeholder="Buscar por código de producto"
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </Col>
        <Col md={3}>
          <Form.Control as="select" value={dataPerPage} onChange={handleDataPerPageChange}>
            <option value={5}>5 datos por página</option>
            <option value={10}>10 datos por página</option>
            <option value={15}>15 datos por página</option>
            <option value={20}>20 datos por página</option>
          </Form.Control>
        </Col>
      </Row>
      <Row>
        <Col>
          <div className="card">
            <div className="card-body">
              <Table className="table table-striped" id="componentDataTable">
                <thead>
                  <tr>
                    <th>Código producto</th>
                    <th>Código lista precio</th>
                    <th>Precio</th>
                  </tr>
                </thead>
                <tbody>
                  {currentData.map((data, index) => (
                    <tr key={index}>
                      <td>{data.codproducto || 'N/A'}</td>
                      <td>{data.codlistaprecio || 'N/A'}</td>
                      <td>{data.precio !== undefined ? data.precio : 'N/A'}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              <PaginationSection currentPage={currentPage} totalPages={totalPages} paginate={paginate} />
            </div>
          </div>
        </Col>
      </Row>
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

export default TablaListaPrecioDetalle;
