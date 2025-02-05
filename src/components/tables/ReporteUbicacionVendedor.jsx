import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Container, Row, Col, InputGroup, FormControl } from 'react-bootstrap';
import { getReporteVendedores } from '../../../services/services';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileExcel } from '@fortawesome/free-solid-svg-icons';
import { swalMensajeError } from '../sweetalert2/MensajeSwal';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import 'jspdf-autotable';

const ReporteUbicacionVendedor = () => {
    const [vendedores, setVendedores] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [dataPerPage, setDataPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const filteredData = vendedores.filter((data) =>
        (data.nombre_vendedor || "").toLowerCase().includes(searchTerm.toLowerCase())
    );
    const indexOfLastData = currentPage * dataPerPage;
    const indexOfFirstData = indexOfLastData - dataPerPage;
    const currentData = filteredData.slice(indexOfFirstData, indexOfLastData);

    const totalPages = Math.ceil(filteredData.length / dataPerPage);
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    useEffect(() => {
        let isMounted = true;
        const fetchData = async () => {
            try {
                const data = await getReporteVendedores();
                if (isMounted && data.success) {
                    setVendedores(data.data);
                }
            } catch (error) {
                console.error("Error en la solicitud:", error);
            }
        };
        fetchData();
        return () => { isMounted = false; };
    }, []);


    const handlePerPageChange = (e) => {
        setDataPerPage(parseInt(e.target.value));
        setCurrentPage(1);
    };

    const exportToExcel = () => {
        if (vendedores.length === 0) {
            return swalMensajeError("Lo siento...", "No hay datos para exportar a excel.");
        }
        const header = ["Código Vendedor", "Nombre", "MAC", "Latitud", "Longitud", "Fecha", "% Batería", "Versión"];
        const dataToExport = vendedores.map(data => [
            data.codvendedor || "Indefinido",
            data.nombre_vendedor || "Indefinido",
            data.mac || "Indefinido",
            data.latitud || "Indefinido",
            data.longitud || "Indefinido",
            data.fecha || "Indefinido",
            data.bateria !== null && data.bateria !== undefined ? `${data.bateria}%` : "Indefinido",
            data.version || "Indefinido"
        ]);
        const dataWithHeader = [header, ...dataToExport];
        const worksheet = XLSX.utils.aoa_to_sheet(dataWithHeader);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Información de los Vendedores");
        const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
        const data = new Blob([excelBuffer], { type: 'application/octet-stream' });
        FileSaver.saveAs(data, `datos_ubicacion_vendedores_${new Date().toLocaleDateString()}.xlsx`);
    };
    const navigate = (url) => {
        window.location.href = url;
    };

    return (
        <Container fluid style={{ marginTop: "10px" }}>
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
                <Col md={6} className="text-right" style={{ display: "flex", justifyContent: "space-evenly" }}>
                    <Button variant="outline-primary" onClick={() => navigate('/MapaVendedores')}>
                        Ultima ubicación de vendedores
                    </Button>
                    <Button variant="outline-success" onClick={exportToExcel}>
                        <FontAwesomeIcon icon={faFileExcel} /> Exportar a Excel
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
                        <div className="table-responsive" style={{ backgroundColor: "inherit", padding: "10px", borderRadius: "10px" }}>
                            <Table className="table table-dashed table-hover digi-dataTable table-striped" id="componentDataTable" style={{ backgroundColor: "inherit" }}>
                                <thead>
                                    <tr>
                                        <th>Ubicación</th>
                                        <th>Código de Vendedor</th>
                                        <th>Nombre</th>
                                        <th>MAC o ID Dispositivo</th>
                                        <th>Latitud GPS</th>
                                        <th>Longitud GPS</th>
                                        <th>Fecha-Hora de la Toma GPS</th>
                                        <th>% Batería</th>
                                        <th>Versión myDealer</th>
                                        <th>Ubicación</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {currentData.map((data, index) => (
                                        <tr key={index}>
                                            <td>
                                                <Button
                                                    className="btn btn-primary btn-sm"
                                                    onClick={() => window.location.href = `/mapa?lat=${data.latitud}&lng=${data.longitud}&codigo=${data.codvendedor}&fecha=${data.fecha}`}
                                                >
                                                    Ver en Mapa
                                                </Button>
                                            </td>
                                            <td>{data.codvendedor}</td>
                                            <td>{data.nombre_vendedor}</td>
                                            <td>{data.mac}</td>
                                            <td>{data.latitud}</td>
                                            <td>{data.longitud}</td>
                                            <td>{data.fecha}</td>
                                            <td>{data.bateria}</td>
                                            <td>{data.version}</td>
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
export default ReporteUbicacionVendedor;
