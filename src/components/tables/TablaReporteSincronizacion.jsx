import React, { useState, useEffect } from "react";
import { Table, Container, Row, Col, Button, Form } from "react-bootstrap";
import axios from "axios";

const TablaReporteSincronizacion = () => {
  const [dataList, setDataList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [dataPerPage, setDataPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get("http://localhost:8000/api/reportesin");
        console.log("Respuesta de la API:", response.data); // Para verificar la estructura

        // Acceder al arreglo dentro de `response.data.data`
        if (Array.isArray(response.data.data)) {
          setDataList(response.data.data);
        } else {
          console.error("La respuesta no contiene un arreglo válido:", response.data);
          setDataList([]);
        }
      } catch (error) {
        console.error("Error al obtener los datos:", error);
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

  // Filtrar por el término de búsqueda (ej. id)
  const filteredDataList = dataList.filter((data) =>
    data.id.toString().toLowerCase().includes(searchTerm.toLowerCase())
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
            placeholder="Buscar por id"
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </Col>
        <Col md={3}>
          <Form.Control as="select" value={dataPerPage} onChange={handleDataPerPageChange}>
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={15}>15</option>
            <option value={20}>20</option>
          </Form.Control>
        </Col>
      </Row>
      <Row>
        <Col>
          <div className="card">
            <div className="card-body">
              <Table
                className="table table-dashed table-hover digi-dataTable table-striped"
                id="componentDataTable"
              >
                <thead>
                  <tr>
                    <th>Id</th>
                    <th>Código Vendedor</th>
                    <th>Fecha Móvil</th>
                    <th>Fecha Web</th>
                    <th>Versión</th>
                  </tr>
                </thead>
                <tbody>
                  {currentData.map((data) => (
                    <tr key={data.id}>
                      <td>{data.id}</td>
                      <td>{data.codvendedor}</td>
                      <td>{data.fechamovil}</td>
                      <td>{data.fechaweb}</td>
                      <td>{data.version}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              <PaginationSection
                currentPage={currentPage}
                totalPages={totalPages}
                paginate={paginate}
              />
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
      {pageNumbers.map((number) => (
        <Button
          key={number}
          onClick={() => paginate(number)}
          className={`page-item ${number === currentPage ? "active" : ""}`}
          style={{ fontSize: "0.8rem" }}
        >
          {number}
        </Button>
      ))}
    </div>
  );
};

export default TablaReporteSincronizacion;
