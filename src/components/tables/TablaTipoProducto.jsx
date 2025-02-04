import React, { useState, useEffect } from 'react';
import { Table, Container, Row, Col, Button, Form } from 'react-bootstrap';
import axios from 'axios';

const ScrollDataTableSection2 = () => {
  const [dataList, setDataList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [dataPerPage, setDataPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get('http://home.mydealer.ec:8000/api/tipo/producto');
        if (Array.isArray(response.data.datos)) {
          setDataList(response.data.datos);
        } else {
          console.error('Se esperaba un arreglo pero se obtuvo:', response.data.datos);
        }
      } catch (error) {
        console.error('Error al obtener los datos', error);
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

  //no me deja filtrar con descripcion o ningun otro parametro
  const filteredDataList = dataList.filter((data) =>
    data.Descripcion.toLowerCase().includes(searchTerm.toLowerCase())
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
            placeholder="Buscar por descripción"
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
                    <th>Código tipo de producto</th>
                    <th>Descripción</th>
                    <th>Código grupo de material</th>
                  </tr>
                </thead>
                <tbody>
                  {currentData.map((data) => (
                    <tr key={data.CodigoTipoproducto}>
                      <td>{data.CodigoTipoProducto}</td>
                      <td>{data.Descripcion}</td>
                      <td>{data.CodigoGrupoMaterial}</td>
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

export default ScrollDataTableSection2;