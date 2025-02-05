import React, { useState, useEffect } from 'react';
import { Table, Button, Container, Row, Col, InputGroup, FormControl } from 'react-bootstrap';
import { getGeorreferenciacionCliente } from '../../../services/services';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileExcel } from '@fortawesome/free-solid-svg-icons';
import { swalMensajeError } from '../sweetalert2/MensajeSwal';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import 'jspdf-autotable';

const ReporteGeorreferenciacionCliente = () => {
    const [clientes, setClientes] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        let isMounted = true;
    
        const fetchData = async () => {
            try {
                const response = await getGeorreferenciacionCliente(page);
                console.log("Respuesta completa de la API:", response); // Verifica qué devuelve la API
    
                if (isMounted && response) {
                    setClientes(response.data || []); // Asegura que siempre sea un array
                    setTotalPages(response.last_page || 1);
    
                    // Solo actualiza la página si es diferente
                    if (response.current_page !== page) {
                        setPage(response.current_page);
                    }
                }
            } catch (error) {
                console.error("Error en la solicitud:", error);
            }
        };
    
        fetchData();
    
        return () => { isMounted = false; };
    }, [page]);
    
    // Observa los cambios en clientes
    useEffect(() => {
        console.log("Clientes actualizados:", clientes);
    }, [clientes]);
    

    const exportToExcel = () => {
        if (clientes.length === 0) {
            return swalMensajeError("Lo siento...", "No hay datos para exportar a Excel.");
        }

        const header = ["Código Dirección Envío", "Código Cliente", "Latitud", "Longitud", "Fecha"];
        const dataToExport = clientes.map(data => [
            data.coddireccionenvio || "Indefinido",
            data.codcliente || "Indefinido",
            data.latitud || "Indefinido",
            data.longitud || "Indefinido",
            data.fecha || "Indefinido"
        ]);
        const dataWithHeader = [header, ...dataToExport];
        const worksheet = XLSX.utils.aoa_to_sheet(dataWithHeader);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Información clientes");
        const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
        const data = new Blob([excelBuffer], { type: 'application/octet-stream' });
        FileSaver.saveAs(data, `georreferenciacion_clientes_${new Date().toLocaleDateString()}.xlsx`);
    };

    const filteredData = clientes.filter((data) =>
        (data.codcliente || "").toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <Container fluid style={{ marginTop: "10px" }}>
            <Row className="mb-3">
                <Col md={6}>
                    <InputGroup>
                        <FormControl
                            placeholder="Buscar por código de cliente"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <Button variant="outline-secondary" onClick={() => setSearchTerm('')}>Limpiar</Button>
                    </InputGroup>
                </Col>
                <Col md={6} className="text-right" style={{ display: "flex", justifyContent: "space-evenly" }}>
                    <Button variant="outline-success" onClick={exportToExcel}>
                        <FontAwesomeIcon icon={faFileExcel} /> Exportar a Excel
                    </Button>
                </Col>
            </Row>
            <Row>
                <Col>
                    <div className="table-responsive">
                        <Table className="table table-hover table-striped">
                            <thead>
                                <tr>
                                    <th>Ubicación</th>
                                    <th>Código Dirección Envío</th>
                                    <th>Código Cliente</th>
                                    <th>Latitud</th>
                                    <th>Longitud</th>
                                    <th>Fecha</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredData.map((data, index) => (
                                    <tr key={index}>
                                        <td>
                                            <Button
                                                className="btn btn-primary btn-sm"
                                                onClick={() => window.location.href = `/mapa?lat=${data.latitud}&lng=${data.longitud}&codigo=${data.codcliente}&fecha=${data.fecha}`}
                                            >
                                                Ver en Mapa
                                            </Button>
                                        </td>
                                        <td>{data.coddireccionenvio}</td>
                                        <td>{data.codcliente}</td>
                                        <td>{data.latitud}</td>
                                        <td>{data.longitud}</td>
                                        <td>{data.fecha}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </div>
                </Col>
            </Row>

            {/* Paginación */}
            <Row className="mt-3">
                <Col className="d-flex justify-content-center">
                    <Button
                        variant="secondary"
                        className="me-2"
                        onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                        disabled={page === 1}
                    >
                        Anterior
                    </Button>
                    <span className="align-self-center">Página {page} de {totalPages}</span>
                    <Button
                        variant="secondary"
                        className="ms-2"
                        onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
                        disabled={page >= totalPages}
                    >
                        Siguiente
                    </Button>
                </Col>
            </Row>
        </Container>
    );
};

export default ReporteGeorreferenciacionCliente;
