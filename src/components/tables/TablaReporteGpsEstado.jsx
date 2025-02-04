import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';
import { Table, Button, Modal, Form, Container, Row, Col, InputGroup, FormControl } from 'react-bootstrap';
import axios from 'axios';

import 'jspdf-autotable';
import { swalMensajeConfirmacion, swalMensajeError, swalMensajeExito, swalMensajeInformacion } from '../sweetalert2/MensajeSwal';

import { faPencil, faTrash, faMobilePhone, faInfo, faFileExcel, faFilePdf, faArrowRight, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import * as FileSaver from 'file-saver';

import { getReporteGpsEstadoFiltro, getDatosMovilVendedor, getDatosVendedor, getSupervisor, getVendedorPorSupervisor, getDatosMovilVendedorVF } from '../../../services/services';

const MySwal = withReactContent(Swal);

// Estilos específicos para esta vista
const CustomButton = styled.button`
  background-color: purple;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  margin: 1px 50px 5px 40px; /* margen: arriba, derecha, abajo, izquierda */
`;

// Componentes estilizados
const Card = styled.div`
  background-color: transparent; /* Sin color de fondo */
  border-radius: 1px;
  box-shadow: 0 4px 6px rgba(243, 240, 240, 0.1);
  padding: -20rem;
  margin: 1rem auto;
  max-width: 5000px;
  align-self: flex-start; /* Alinea a la izquierda */
`;

const ErrorMessage = styled.p`
  color: #e53e3e;
  text-align: center;
  margin-top: 1rem;
`;

const Title = styled.h1`
  font-size: 2rem;
  font-weight: bold;
  text-align: center;
  color: rgb(255, 255, 255);
  margin-bottom: 1.5rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0.5rem;
`;

const Label = styled.label`
  font-size: 1.1rem;
  font-weight: 1000;
  color: rgb(224, 217, 217);
  margin: 1px 10px 5px 40px; /* margen: arriba, derecha, abajo, izquierda */
`;

const Select = styled.select`
  padding: 0.5rem;
  border: 1px solid rgb(118, 184, 255);
  border-radius: 4px;
  font-size: 1rem;
  &:disabled {
    background-color: rgb(76, 172, 236);
  }
`;

const Input = styled.input`
  padding: 0.75rem;
  border: 0.5px solid rgb(20, 128, 243);
  border-radius: 1px;
  font-size: 1rem;
  margin: 1px 10px 5px 30px; /* margen: arriba, derecha, abajo, izquierda */
`;

// Estilos para el indicador de batería
const BatteryContainer = styled.div`
  display: flex;
  align-items: center;
  width: 60px;
  height: 30px;
  border: 2px solid #333;
  border-radius: 5px;
  position: relative;
  background-color: #f0f0f0;
`;

const BatteryTop = styled.div`
  width: 5px;
  height: 10px;
  background-color: #333;
  position: absolute;
  top: 50%;
  right: -7px;
  transform: translateY(-50%);
  border-radius: 0 2px 2px 0;
`;

const BatteryLevel = styled.div`
  height: 100%;
  width: ${(props) => props.level}%;
  background-color: ${(props) =>
    props.level > 50 ? '#4caf50' : props.level > 20 ? '#ffeb3b' : '#f44336'};
  border-radius: 3px;
  transition: width 0.3s ease, background-color 0.3s ease;
`;

const BatteryText = styled.span`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 12px;
  color: #333;
  font-weight: bold;
`;

// Componente de la batería
const BatteryIndicator = ({ level }) => {
  return (
    <BatteryContainer>
      <BatteryLevel level={level} />
      <BatteryTop />
      <BatteryText>{level}%</BatteryText>
    </BatteryContainer>
  );
};

const ReporteGpsEstado = () => {
  const [datos, setDatos] = useState([]);
  const [codsupervisor, setCodsupervisor] = useState('');
  const [codvendedor, setCodvendedor] = useState('');
  const [fechaInicio, setFechaInicio] = useState('');
  const [fechaFin, setFechaFin] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [supervisores, setSupervisores] = useState([]);
  const [vendedores, setVendedores] = useState([]);
  const [dataListMovil, setDataListMovil] = useState([]);
  const [showModalInfoMovil, setShowModalInfoMovil] = useState(false);
  const [dataList, setDataList] = useState([]);

  const [currentPage, setCurrentPage] = useState(1); // Página actual
  const [itemsPerPage, setItemsPerPage] = useState(10); // Cantidad de datos por página
  const [searchTerm, setSearchTerm] = useState(""); // Término de búsqueda
  const [filteredData, setFilteredData] = useState([]); // Datos filtrados
  const [currentData, setCurrentData] = useState([]); // Datos actuales

  // Cargar supervisores al iniciar el componente
  useEffect(() => {
    const cargarSupervisores = async () => {
      try {
        const supervisores = await getSupervisor();
        setSupervisores(supervisores);
      } catch (err) {
        console.error('Error al cargar supervisores:', err);
        setError('Error al cargar los supervisores.');
      }
    };
    cargarSupervisores();
  }, []);

  // Cargar vendedores cuando se selecciona un supervisor
  useEffect(() => {
    const cargarVendedores = async () => {
      if (codsupervisor) {
        try {
          const vendedores = await getVendedorPorSupervisor(codsupervisor);
          setVendedores(vendedores);
        } catch (err) {
          console.error('Error al cargar vendedores:', err);
          setError('Error al cargar los vendedores.');
        }
      } else {
        setVendedores([]);
      }
    };
    cargarVendedores();
  }, [codsupervisor]);

  const handleShowModalInfoMovil = async (dato, nombreVendedor) => {
    try {
      const response = await getDatosMovilVendedorVF(dato, nombreVendedor);
      if (response && response.datos) {
        if (Array.isArray(response.datos.data) && response.datos.data.length > 0) {
          const lastData = response.datos.data[response.datos.data.length - 1];
          if (Array.isArray(lastData.informacion_del_movil) && lastData.informacion_del_movil.length > 0) {
            setDataListMovil(lastData);
            setShowModalInfoMovil(true);
          } else {
            swalMensajeInformacion("Sin datos...", "No existen registros móviles sobre este vendedor.");
          }
        } else {
          swalMensajeInformacion("Sin datos...", "No existen registros móviles sobre este vendedor.");
        }
      } else {
        swalMensajeInformacion("Sin datos...", "La respuesta no tiene la estructura esperada.");
      }
    } catch (error) {
      swalMensajeError("Lo siento...", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (!fechaInicio || !fechaFin) {
      setError('Por favor, ingresa ambas fechas.');
      setLoading(false);
      return;
    }

    try {
      const supervisorParam = codsupervisor === "" ? null : codsupervisor;
      const vendedorParam = codvendedor === "" ? null : codvendedor;

      const datosReporte = await getReporteGpsEstadoFiltro(
        supervisorParam,
        vendedorParam,
        fechaInicio,
        fechaFin
      );

      setDatos(datosReporte);
      setDataList(datosReporte);
    } catch (err) {
      console.error(err);
      setError('Error al obtener los datos. Por favor, inténtalo de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  // Cálculo de currentData y filtrado
  const indexOfLastData = currentPage * itemsPerPage;
  const indexOfFirstData = indexOfLastData - itemsPerPage;

  const handlePerPageChange = (e) => {
    const newDataPerPage = parseInt(e.target.value);
    setItemsPerPage(newDataPerPage);
    setCurrentPage(1);
  };

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleCloseModalInfoMovil = () => {
    setShowModalInfoMovil(false);
    setDataListMovil([]);
  };

  useEffect(() => {
    const filtered = dataList.filter((dato) => {
      return dato.nombre.toLowerCase().includes(searchTerm.toLowerCase());
    });
    setFilteredData(filtered);
    setCurrentPage(1); // Reiniciar a la primera página al filtrar
  }, [searchTerm, dataList]);

  useEffect(() => {
    const newCurrentData = filteredData.slice(indexOfFirstData, indexOfLastData);
    setCurrentData(newCurrentData);
  }, [itemsPerPage, currentPage, filteredData]);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  // Exportar a PDF
  const exportToPDFInfoMovil = () => {
    if (dataListMovil.length === 0) {
      return swalMensajeError("Lo siento...", "No hay datos para exportar a pdf.");
    }
    const doc = new jsPDF();
    const headers = [["Nombre Aplicacion", "Version", "TargetSdkVersion", "UltimaFechaInstall", "UltimaFechaUpdate"]];
    const dataToExport = dataListMovil.informacion_de_aplicaciones.map(dato => [
      dato.Nombre || "Indefinido",
      dato.Version || "Indefinido",
      dato.TargetSdkVersion || "Indefinido",
      dato.UltimaFechaInstall || "Indefinido",
      dato.UltimaFechaUpdate || "Indefinido"
    ]);

    const pageWidth = doc.internal.pageSize.width;
    const fecha = new Date();
    const dia = (fecha.getDate().toString().length === 1) ? "0" + fecha.getDate().toString() : fecha.getDate().toString();
    const mes = fecha.getMonth();
    const año = fecha.getFullYear();
    const meses = [
      "enero", "febrero", "marzo", "abril", "mayo", "junio",
      "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"
    ];

    const valorInicial = 57;
    const valorMultiplicativo = 7;
    const header = (dato) => {
      doc.addImage('./public/assets/images/logo_myDealer_final.png', 'PNG', 10, 18, 50, 20);
      doc.setFontSize(16);
      doc.text("Información móvil", pageWidth / 2, 30, { align: 'center' });
      doc.setFontSize(11);
      doc.text(`${dia} de ${meses[mes]} de ${año}`, pageWidth - 15, 40, { align: 'right' });
      const text = "A continuación se presenta un reporte con la información del dispositivo móvil de " + dataListMovil?.nombreVendedor + ", lo que incluye detalles del equipo, además de la lista de aplicaciones instaladas en el mismo.";
      const splitText = doc.splitTextToSize(text, pageWidth - 20);
      doc.text(splitText, 10, 50);
      doc.text("Actualizado: ", 10, valorInicial + (valorMultiplicativo * 1), { align: 'left' });
      doc.text(dataListMovil.fecha, pageWidth / 5, valorInicial + (valorMultiplicativo * 1), { align: 'left' });
      doc.text("Fabricante: ", 10, valorInicial + (valorMultiplicativo * 2), { align: 'left' });
      doc.text(dataListMovil.informacion_del_movil[0].Fabricante, pageWidth / 5, valorInicial + (valorMultiplicativo * 2), { align: 'left' });
      doc.text("Modelo: ", 10, valorInicial + (valorMultiplicativo * 3), { align: 'left' });
      doc.text(dataListMovil.informacion_del_movil[0].Modelo, pageWidth / 5, valorInicial + (valorMultiplicativo * 3), { align: 'left' });
      doc.text("Serial: ", 10, valorInicial + (valorMultiplicativo * 4), { align: 'left' });
      doc.text(dataListMovil.informacion_del_movil[0].Serial, pageWidth / 5, valorInicial + (valorMultiplicativo * 4), { align: 'left' });
      doc.text("Marca: ", 10, valorInicial + (valorMultiplicativo * 5), { align: 'left' });
      doc.text(dataListMovil.informacion_del_movil[0].Marca, pageWidth / 5, valorInicial + (valorMultiplicativo * 5), { align: 'left' });
      doc.text("Version: ", 10, valorInicial + (valorMultiplicativo * 6), { align: 'left' });
      doc.text(dataListMovil.informacion_del_movil[0].Version, pageWidth / 5, valorInicial + (valorMultiplicativo * 6), { align: 'left' });
      doc.text("RAM: ", 10, valorInicial + (valorMultiplicativo * 7), { align: 'left' });
      doc.text(dataListMovil.informacion_del_movil[0].RAM, pageWidth / 5, valorInicial + (valorMultiplicativo * 7), { align: 'left' });
    };

    const footer = (dato) => {
      doc.setFontSize(10);
      doc.text(`${dato.pageNumber}`, pageWidth - 15, doc.internal.pageSize.height - 10);
    };

    let firstPage = true;
    doc.autoTable({
      head: headers,
      body: dataToExport,
      startY: (doc.getCurrentPageInfo().pageNumber == 1) ? (valorInicial + (valorMultiplicativo * 7) + 10) : 20,
      margin: { top: 20, bottom: 20, left: 10, right: 10 },
      didDrawPage: (dato) => {
        if (firstPage) {
          header(dato);
          footer(dato);
          firstPage = false;
        }
      },
      margin: { top: valorInicial + (valorMultiplicativo * 7) - 10, bottom: 20, left: 10, right: 10 }
    });

    doc.save(`datos_movil_vendedor_${new Date().toLocaleDateString()}.pdf`);
  };

  return (
    <Container fluid>
      <Card>
        <Title>Reporte GPS Estado</Title>
        <Form onSubmit={handleSubmit}>
          {/* Supervisor */}
          <FormGroup>
            <Label htmlFor="codsupervisor">Código Supervisor:</Label>
            <Select
              value={codsupervisor}
              onChange={(e) => setCodsupervisor(e.target.value)}
              required
            >
              <option value="null">Todos los supervisores</option>
              {supervisores.map((supervisor) => (
                <option key={supervisor.codsupervisor} value={supervisor.codsupervisor}>
                  {`${supervisor.codsupervisor} - ${supervisor.nombre}`}
                </option>
              ))}
            </Select>
          </FormGroup>

          {/* Vendedor */}
          <FormGroup>
            <Label htmlFor="codvendedor">Código Vendedor:</Label>
            <Select
              id="codvendedor"
              value={codvendedor}
              onChange={(e) => setCodvendedor(e.target.value)}
              required
              disabled={!codsupervisor}
            >
              <option value="null">Todos los vendedores</option>
              {vendedores.map((vendedor) => (
                <option key={vendedor.codvendedor} value={vendedor.codvendedor}>
                  {`${vendedor.codvendedor} - ${vendedor.nombre}`}
                </option>
              ))}
            </Select>
          </FormGroup>

          {/* Fecha Inicio */}
          <FormGroup>
            <Label htmlFor="fechaInicio">Fecha Inicio:</Label>
            <Input
              id="fechaInicio"
              type="date"
              value={fechaInicio}
              onChange={(e) => setFechaInicio(e.target.value)}
              required
            />
          </FormGroup>

          {/* Fecha Fin */}
          <FormGroup>
            <Label htmlFor="fechaFin">Fecha Fin:</Label>
            <Input
              id="fechaFin"
              type="date"
              value={fechaFin}
              onChange={(e) => setFechaFin(e.target.value)}
              required
            />
          </FormGroup>

          {/* Botón */}
          <CustomButton type="submit" disabled={loading}>
            {loading ? "Cargando..." : "Buscar"}
          </CustomButton>
        </Form>

        {/* Error */}
        {error && <ErrorMessage>{error}</ErrorMessage>}
      </Card>

      <Container fluid>
        <Row className="mb-3">
          <Col md={6}>
            <InputGroup>
              <FormControl
                placeholder="Buscar por nombre"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Button variant="outline-secondary" onClick={() => setSearchTerm('')}>Limpiar</Button>
            </InputGroup>
          </Col>
        </Row>
        
        <Row>
          <Col>
            <div className="card">
              <div className="card-body">
                <div className="table-responsive"> {/* Hace la tabla responsiva */}
                  <Table className="table table-dashed table-hover digi-dataTable table-striped" id="componentDataTable">
                    <thead>
                      <tr>
                        <th>Nro</th>
                        <th>Código Vendedor</th>
                        <th>Nombre</th>
                        <th>Fecha</th>
                        <th>Tiempo</th>
                        <th>Latitud</th>
                        <th>Longitud</th>
                        <th>Batería</th>
                        <th>Versión</th>
                        <th>InfoMovil</th>
                      </tr>
                    </thead>
                    <tbody>
                      {(() => {
                        let rowIndex = (currentPage - 1) * itemsPerPage + 1; // Iniciar el contador
                        return currentData.map((dato) =>
                          dato.coordenadas.map((coordenada) => {
                            const globalIndex = rowIndex++; // Incrementar el contador
                            return (
                              <tr key={`${dato.codvendedor}-${coordenada.fecha}`}>
                                <td>{globalIndex}</td>
                                <td>{dato.codvendedor}</td>
                                <td>{dato.nombre}</td>
                                <td>{coordenada.fecha.split(" ")[0]}</td>
                                <td>{coordenada.fecha.split(" ")[1]}</td>
                                <td>{coordenada.latitud}</td>
                                <td>{coordenada.longitud}</td>
                                <td>
                                  <BatteryIndicator level={coordenada.bateria} />
                                </td>
                                <td>{coordenada.version}</td>
                                <td>
                                  <Button
                                    variant="info"
                                    onClick={() =>
                                      handleShowModalInfoMovil(dato.codvendedor, dato.nombre)
                                    }
                                    size="sm"
                                    title="Ver información móvil"
                                  >
                                    <FontAwesomeIcon icon={faMobilePhone} />
                                  </Button>
                                </td>
                              </tr>
                            );
                          })
                        );
                      })()}
                    </tbody>
                  </Table>
                </div> {/* Fin de table-responsive */}
                <div className="pagination justify-content-end mt-3">
                  <Button
                    onClick={prevPage}
                    className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}
                    style={{ fontSize: '0.8rem' }}
                  >
                    <FontAwesomeIcon icon={faArrowLeft} />
                  </Button>
                  <Button
                    onClick={nextPage}
                    className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}
                    style={{ fontSize: '0.8rem', marginLeft: '10px' }}
                  >
                    <FontAwesomeIcon icon={faArrowRight} />
                  </Button>
                </div>
              </div>
            </div>
          </Col>
        </Row>

        {/* Modal */}
        <Modal show={showModalInfoMovil} onHide={() => handleCloseModalInfoMovil()} size='xl'>
          <Modal.Header closeButton>
            <Modal.Title>{'Datos Móviles'}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group>
                <Form.Label>Actualizado</Form.Label>
                <Form.Control
                  type="text"
                  name="fecha"
                  value={dataListMovil?.fecha || "Indefinido"}
                  readOnly={true}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Fabricante</Form.Label>
                <Form.Control
                  type="text"
                  name="Fabricante"
                  value={dataListMovil?.informacion_del_movil?.[0]?.Fabricante || "Indefinido"}
                  readOnly={true}
                />
              </Form.Group>
              <br />
              <Form.Group>
                <Form.Label>Modelo</Form.Label>
                <Form.Control
                  type="text"
                  name="Modelo"
                  value={dataListMovil?.informacion_del_movil?.[0]?.Modelo || "Indefinido"}
                  readOnly={true}
                />
              </Form.Group>
              <br />
              <Form.Group>
                <Form.Label>Serial</Form.Label>
                <Form.Control
                  type="text"
                  name="Serial"
                  value={dataListMovil?.informacion_del_movil?.[0]?.Serial || "Indefinido"}
                  readOnly={true}
                />
              </Form.Group>
              <br />
              <Form.Group>
                <Form.Label>Marca</Form.Label>
                <Form.Control
                  type="text"
                  name="Marca"
                  value={dataListMovil?.informacion_del_movil?.[0]?.Marca || "Indefinido"}
                  readOnly={true}
                />
              </Form.Group>
              <br />
              <Form.Group>
                <Form.Label>Versión</Form.Label>
                <Form.Control
                  type="text"
                  name="Versión"
                  value={dataListMovil?.informacion_del_movil?.[0]?.Version || "Indefinido"}
                  readOnly={true}
                />
              </Form.Group>
              <br />
              <Form.Group>
                <Form.Label>RAM</Form.Label>
                <Form.Control
                  type="text"
                  name="RAM"
                  value={dataListMovil?.informacion_del_movil?.[0]?.RAM || "Indefinido"}
                  readOnly={true}
                />
              </Form.Group>
            </Form>
            <br />
            <Table className="table table-dashed table-hover digi-dataTable table-striped" id="componentDataTable">
              <thead>
                <tr>
                  <th>Nombre Aplicación</th>
                  <th>Versión</th>
                  <th>TargetSdkVersion</th>
                  <th>Última Fecha de Instalación</th>
                  <th>Última Fecha de Actualización</th>
                </tr>
              </thead>
              <tbody>
                {dataListMovil?.informacion_de_aplicaciones?.map((dato, index) => (
                  <tr key={dato.Nombre + index}>
                    <td style={{ maxWidth: '250px', overflowWrap: 'break-word' }}>{dato.Nombre}</td>
                    <td style={{ maxWidth: '200px', overflowWrap: 'break-word' }}>{dato.Version}</td>
                    <td style={{ maxWidth: '20px', overflowWrap: 'break-word' }}>{dato.TargetSdkVersion}</td>
                    <td style={{ maxWidth: '250px', overflowWrap: 'break-word' }}>{dato.UltimaFechaInstall}</td>
                    <td style={{ maxWidth: '250px', overflowWrap: 'break-word' }}>{dato.UltimaFechaUpdate}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="outline-danger" onClick={exportToPDFInfoMovil}>
              <FontAwesomeIcon icon={faFilePdf} /> Exportar a PDF
            </Button>
            <Button variant="secondary" onClick={handleCloseModalInfoMovil}>
              Cerrar
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </Container>
  );
};

export default ReporteGpsEstado;
