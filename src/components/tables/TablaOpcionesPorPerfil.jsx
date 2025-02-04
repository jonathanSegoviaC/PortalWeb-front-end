import React, { useState, useEffect } from 'react';
import { Table, Container, Row, Col, InputGroup, FormControl, Button, Form } from 'react-bootstrap';
import axios from 'axios';
import { swalMensajeError } from '../sweetalert2/MensajeSwal';

import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const TablaOpcionesPorPerfil = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [dataPerPage, setDataPerPage] = useState(10);
  const [dataList, setDataList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get('http://home.mydealer.ec:8000/api/opcion/perfil/usuario');
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

  const filteredData = dataList.filter(data =>
    data.perfil.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastData = currentPage * dataPerPage;
  const indexOfFirstData = indexOfLastData - dataPerPage;
  const currentData = filteredData.slice(indexOfFirstData, indexOfLastData);

  const totalPages = Math.ceil(filteredData.length / dataPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber)


  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(dataList);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Data');
    XLSX.writeFile(wb, 'perfiles.xlsx');
  };

  const exportToPDF = () => {
    const doc = new jsPDF();
    const tableColumn = ["Sr. Perfil", "Perfil", "Nivel", "Tipo Perfil"];
    const tableRows = [];

    dataList.forEach(data => {
      const dataRow = [
        data.srperfil,
        data.perfil,
        data.nivel || 'N/A',
        data.tipoperfil,
      ];
      tableRows.push(dataRow);
    });

    doc.autoTable(tableColumn, tableRows, { startY: 20 });
    doc.text("Perfiles de Usuario", 14, 15);
    doc.save("perfiles.pdf");
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
              placeholder="Buscar por perfil"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Button variant="outline-secondary" onClick={() => setSearchTerm('')}>Limpiar</Button>
          </InputGroup>
        </Col>
        <Col md={6} className="text-end">
          <Button variant="success" onClick={exportToExcel} className="me-2">Exportar a Excel</Button>
          <Button variant="danger" onClick={exportToPDF}>Exportar a PDF</Button>
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
              <Table className="table table-dashed table-hover digi-dataTable table-striped" id="componentDataTable">
                <thead>
                  <tr>
                    <th>Sr. Perfil</th>
                    <th>Perfil</th>
                    <th>Nivel</th>
                    <th>Tipo Perfil</th>
                  </tr>
                </thead>
                <tbody>
                  {currentData.map((data) => (
                    <tr key={data.srperfil}>
                      <td>{data.srperfil}</td>
                      <td>{data.perfil}</td>
                      <td>{data.nivel || 'N/A'}</td>
                      <td>{data.tipoperfil}</td>
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

export default TablaOpcionesPorPerfil;
