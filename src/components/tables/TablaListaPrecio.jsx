import React, { useState, useEffect } from 'react';
import { Table, Container, Row, Col, Button, Form } from 'react-bootstrap';
import axios from 'axios';

const TablaListaPrecio = () => {
  const [dataList, setDataList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [dataPerPage, setDataPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get('http://localhost:8000/api/listaprecios');
        console.log('Respuesta de la API:', response.data); // Para verificar la estructura
        // Manejar la respuesta como un arreglo directamente
        if (Array.isArray(response.data)) {
          setDataList(response.data);
        } else {
          console.error('La respuesta no es un arreglo:', response.data);
          setDataList([]);
        }
      } catch (error) {
        console.error('Error al obtener los datos:', error);
        setDataList([]);
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

  // Filtrar por el término de búsqueda usando "nombre"
  const filteredDataList = dataList.filter((data) =>
    data.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastData = currentPage * dataPerPage;
  const indexOfFirstData = indexOfLastData - dataPerPage;
  const currentData = filteredDataList.slice(indexOfFirstData, indexOfLastData);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const totalPages = Math.ceil(filteredDataList.length / dataPerPage);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Container fluid>
      <Row className="mb-3">
        <Col md={6}>
          <Form.Control
            type="text"
            placeholder="Buscar por nombre"
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
              <Table className="table table-dashed table-hover digi-dataTable table-striped" id="componentDataTable">
                <thead>
                  <tr>
                    <th>Código lista precio</th>
                    <th>Nombre</th>
                    <th>Estado</th>
                  </tr>
                </thead>
                <tbody>
                  {currentData.map((data) => (
                    <tr key={data.codlistaprecio}>
                      <td>{data.codlistaprecio}</td>
                      <td>{data.nombre}</td>
                      <td>{data.estado}</td>
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

export default TablaListaPrecio;
