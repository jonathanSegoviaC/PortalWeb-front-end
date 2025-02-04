import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Container, Row, Col, InputGroup, FormControl } from 'react-bootstrap';
import { deleteDatosVendedor, getDatosMovilVendedor, getDatosVendedor, getUsuariosAdministrativos, updateDatosVendedor } from '../../../services/services';
import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil, faTrash, faMobilePhone, faInfo, faFileExcel, faFilePdf } from '@fortawesome/free-solid-svg-icons';
import { swalMensajeConfirmacion, swalMensajeError, swalMensajeExito, swalMensajeInformacion } from '../sweetalert2/MensajeSwal';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const MySwal = withReactContent(Swal);

const TablaVendedor = () => {
  let index = 0;
  const [currentPage, setCurrentPage] = useState(1);
  const [dataPerPage, setDataPerPage] = useState(10);
  const [showModal, setShowModal] = useState(false);
  const [showModalInfoMovil, setShowModalInfoMovil] = useState(false);
  const [readOnlyInfo, setReadOnlyInfo] = useState(false);
  const [dataList, setDataList] = useState([]);
  const [dataListMovil, setDataListMovil] = useState([]);
  const [formData, setFormData] = useState({});
  const [formDataInfoMovil, setFormDataInfoMovil] = useState({});
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await getDatosVendedor();
        setDataList(response.datos.data);
      } catch (error) {
        swalMensajeError("Lo siento...", error);
      }
    }
    fetchData();
  }, []);

  const handleShowModal = (data) => {
    setFormData(data);
    setShowModal(true);
  };

  const handleShowModalInfo = (data) => {
    setFormData(data);
    setShowModal(true);
    setReadOnlyInfo(true);
  };

  const handleCloseModal = () => {
    setReadOnlyInfo(false);
    setShowModal(false);
  };

  const handleShowModalInfoMovil = async (data, nombreVendedor) => {
    try {
      const response = await getDatosMovilVendedor(data, nombreVendedor);
      const size = response.data.datos.data.length;
      if ((size - 1) >= 0) {
        setDataListMovil(response.data.datos.data[size - 1]);
        setShowModalInfoMovil(true);
      } else {
        swalMensajeInformacion("Sin datos...", "No existen registros móviles sobre este vendedor.");
      }
    } catch (error) {
      swalMensajeError("Lo siento...", error)
    }
  };

  const handleCloseModalInfoMovil = () => {
    setShowModalInfoMovil(false);
    setDataListMovil([]);
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

  const filteredData = dataList.filter((data) => {
    return data.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      data.nombre.toUpperCase().includes(searchTerm.toUpperCase());
  });

  const indexOfLastData = currentPage * dataPerPage;
  const indexOfFirstData = indexOfLastData - dataPerPage;
  const currentData = filteredData.slice(indexOfFirstData, indexOfLastData);

  const totalPages = Math.ceil(filteredData.length / dataPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleSubmit = async (data) => {
    try {
      console.log("Datos", data);
      const response_update = await updateDatosVendedor(data.login, data);
      swalMensajeExito("Operación exitosa!", "Has actualizado con éxito los datos del vendedor");
      const response = await getDatosVendedor();
      setDataList(response.datos.data);
      setShowModal(false);
    } catch (error) {
      setShowModal(false);
      swalMensajeError("Lo siento...", "No se ha podido actualizar los datos del vendedor, aquí el error: \n" + error);
    }
  };

  const handleDelete = async (usuario) => {
    try {
      const titulo = "¿Estas seguro?";
      const mensaje = "Borrara un registro y no podrá recuperarlo.";
      const mensaje_confirmacion = "Has borrado con éxito el registro del vendedor";
      const mensaje_cancelacion = "Has cancelado esta operación";
      const response_confirmacion = await swalMensajeConfirmacion(titulo, mensaje, mensaje_confirmacion, mensaje_cancelacion);
      if (response_confirmacion.confirmed) {
        await deleteDatosVendedor(usuario);
        const response = await getDatosVendedor();
        setDataList(response.datos.data);
      }
    } catch (error) {
      swalMensajeError("Lo siento...", "No se ha podido borrar los datos del vendedor, aquí el error: \n" + error);
    }
  };

  const exportToExcel = () => {
    if (dataList.length === 0) {
      return swalMensajeError("Lo siento...", "No hay datos para exportar a excel.");
    }
    const header = ["Código Vendedor", "Nombre", "Email", "Login", "Estado"];
    const dataToExport = dataList.map(data => [
      data.codvendedor || "Indefinido",
      data.nombre || "Indefinido",
      data.email || "Indefinido",
      data.login || "Indefinido",
      data.Estado_Autorizacion || "Indefinido"
    ]);
    const dataWithHeader = [header, ...dataToExport];
    const worksheet = XLSX.utils.aoa_to_sheet(dataWithHeader);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Información de los Vendedores");
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const data = new Blob([excelBuffer], { type: 'application/octet-stream' });
    FileSaver.saveAs(data, `datos_vendedores_${new Date().toLocaleDateString()}.xlsx`);
  };

  const exportToPDF = () => {
    if (dataList.length === 0) {
      return swalMensajeError("Lo siento...", "No hay datos para exportar a pdf.");
    }
    const doc = new jsPDF();
    const headers = [["Codigo", "Administrador de Venta", "Email", "Usuario", "Estado"]];
    const dataToExport = dataList.map(data => [
      data.codvendedor || "Indefinido",
      data.nombre || "Indefinido",
      data.email || "Indefinido",
      data.login || "Indefinido",
      data.Estado_Autorizacion || "Indefinido"
    ]);

    const pageWidth = doc.internal.pageSize.width;
    const fecha = new Date();
    const dia = (fecha.getDate().toString().length === 1) ? "0" + fecha.getDate().toString() : fecha.getDate().toString();
    const mes = fecha.getMonth(); // getMonth() devuelve el mes de 0 a 11
    const año = fecha.getFullYear();
    const meses = [
      "enero", "febrero", "marzo", "abril", "mayo", "junio",
      "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"
    ];
    const header = (data) => {
      doc.addImage('./public/assets/images/logo_myDealer_final.png', 'PNG', 10, 18, 50, 20); // Modify the path and size as needed
      doc.setFontSize(16);
      doc.text("Información de los vendedores", pageWidth / 2, 30, { align: 'center' });
      doc.setFontSize(10);
      doc.text(`${dia} de ${meses[mes]} de ${año}`, pageWidth - 15, 40, { align: 'right' });
      doc.setFontSize(10);
      const text = "A continuación se presenta un reporte con la información principal de cada vendedor registrado dentro de My Dealer. Para mas información por favor revise el detalle personal de cada registro dentro de la plataforma web.";
      const splitText = doc.splitTextToSize(text, pageWidth - 20);
      doc.text(splitText, 10, 50);
    };
    const footer = (data) => {
      doc.setFontSize(10);
      doc.text(`${data.pageNumber}`, pageWidth - 15, doc.internal.pageSize.height - 10);
    };

    doc.autoTable({
      head: headers,
      body: dataToExport,
      startY: 60,
      margin: { top: 60, bottom: 20, left: 10, right: 10 },
      didDrawPage: (data) => {
        header(data);
        footer(data);
      },
      margin: { top: 40, bottom: 20, left: 10, right: 10 },
    });

    doc.save(`datos_vendedor_${new Date().toLocaleDateString()}.pdf`);
  };

  const exportToPDFInfoMovil = () => {
    if (dataListMovil.length === 0) {
      return swalMensajeError("Lo siento...", "No hay datos para exportar a pdf.");
    }
    const doc = new jsPDF();
    const headers = [["Nombre Aplicacion", "Version", "TargetSdkVersion", "UltimaFechaInstall", "UltimaFechaUpdate"]];
    const dataToExport = dataListMovil.informacion_de_aplicaciones.map(data => [
      data.Nombre || "Indefinido",
      data.Version || "Indefinido",
      data.TargetSdkVersion || "Indefinido",
      data.UltimaFechaInstall || "Indefinido",
      data.UltimaFechaUpdate || "Indefinido"
    ]);

    const pageWidth = doc.internal.pageSize.width;
    const fecha = new Date();
    const dia = (fecha.getDate().toString().length === 1) ? "0" + fecha.getDate().toString() : fecha.getDate().toString();
    const mes = fecha.getMonth(); // getMonth() devuelve el mes de 0 a 11
    const año = fecha.getFullYear();
    const meses = [
      "enero", "febrero", "marzo", "abril", "mayo", "junio",
      "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"
    ];
    const valorInicial = 57;
    const valorMultiplicativo = 7;
    const header = (data) => {
      doc.addImage('./public/assets/images/logo_myDealer_final.png', 'PNG', 10, 18, 50, 20); // Modify the path and size as needed
      doc.setFontSize(16);
      doc.text("Información móvil", pageWidth / 2, 30, { align: 'center' });
      doc.setFontSize(11);
      doc.text(`${dia} de ${meses[mes]} de ${año}`, pageWidth - 15, 40, { align: 'right' });
      const text = "A continuación se presenta un reporte con la información del dispositivo móvil de "+dataListMovil?.nombreVendedor+", lo que incluye detalles del equipo, además de la lista de aplicaciones instaladas en el mismo.";
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
    const footer = (data) => {
      doc.setFontSize(10);
      doc.text(`${data.pageNumber}`, pageWidth - 15, doc.internal.pageSize.height - 10);
    };
    let firstPage = true;
    doc.autoTable({
      head: headers,
      body: dataToExport,
      startY: (doc.getCurrentPageInfo().pageNumber == 1) ? ((valorInicial + (valorMultiplicativo * 7) + 10)) : 20,
      margin: { top: 20, bottom: 20, left: 10, right: 10 },
      didDrawPage: (data) => {
        if (firstPage) {
          header(data);
          footer(data);
          firstPage = false;
        }
      },
      margin: { top: valorInicial + (valorMultiplicativo * 7) - 10, bottom: 20, left: 10, right: 10 }
    });

    doc.save(`datos_movil_vendedor_${new Date().toLocaleDateString()}.pdf`);
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
          <Button variant="outline-primary" onClick={exportToExcel}>
            <FontAwesomeIcon icon={faFileExcel} /> Exportar a Excel
          </Button>
          <Button variant="outline-danger" onClick={exportToPDF}>
            <FontAwesomeIcon icon={faFilePdf} /> Exportar a PDF
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
            <div className="card-body">
              <Table className="table table-dashed table-hover digi-dataTable table-striped" id="componentDataTable">
                <thead>
                  <tr>
                    <th>Acciones</th>
                    <th>Código</th>
                    <th>Administrador de Venta</th>
                    <th>E-mail</th>

                    <th>Estado</th>
                    <th>Datos Móvil</th>
                  </tr>
                </thead>
                <tbody>
                  {currentData.map((data) => (
                    <tr key={data.codvendedor}>
                      <td style={{ display: 'flex', justifyContent: 'space-evenly' }}>
                        <Button variant="warning" onClick={() => { handleShowModal(data) }} size="sm" title='Editar registro'>
                          <FontAwesomeIcon icon={faPencil} />
                        </Button>
                        <Button variant="info" onClick={() => { handleShowModalInfo(data) }} size="sm" title='Ver información completa'>
                          <FontAwesomeIcon icon={faInfo} />
                        </Button>
                        <Button variant="danger" onClick={() => { handleDelete(data.login) }} size="sm" title='Borrar registro'>
                          <FontAwesomeIcon icon={faTrash} />
                        </Button>
                      </td>
                      <td>{data.codvendedor}</td>
                      <td>{data.nombre}</td>
                      <td>{data.email}</td>
                      <td>{data.Estado_Autorizacion}</td>
                      <td style={{ display: 'flex', justifyContent: 'space-evenly' }}>
                        {
                          data.datosMoviles ?
                            <Button variant="info" onClick={() => { handleShowModalInfoMovil(data.codvendedor, data.nombre) }} size="sm" title='Ver información móvil'>
                              <FontAwesomeIcon icon={faMobilePhone} />
                            </Button> : <></>
                        }
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              <PaginationSection currentPage={currentPage} totalPages={totalPages} paginate={paginate} />
            </div>
          </div>
        </Col>
      </Row>

      <Modal show={showModal} onHide={() => handleCloseModal()}>
        <Modal.Header>
          <Modal.Title>{readOnlyInfo ? 'Información completa del vendedor' : 'Editar información de vendedor'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Código</Form.Label>
              <Form.Control
                type="text"
                name="codvendedor"
                value={formData.codvendedor || ""}
                readOnly={true}
                onChange={handleChange}
              />
            </Form.Group>
            <br />
            <Form.Group>
              <Form.Label>Administrador de Venta</Form.Label>
              <Form.Control
                type="text"
                name="nombre"
                value={formData.nombre || ""}
                readOnly={readOnlyInfo}
                onChange={handleChange}
              />
            </Form.Group>
            <br />
            <Form.Group>
              <Form.Label>E-mail</Form.Label>
              <Form.Control
                type="text"
                name="email"
                value={formData.email || ""}
                readOnly={readOnlyInfo}
                onChange={handleChange}
              />
            </Form.Group>
            <br />
            <Form.Group>
              <Form.Label>Usuario</Form.Label>
              <Form.Control
                type="text"
                name="login"
                value={formData.login || ""}
                readOnly={readOnlyInfo}
                onChange={handleChange}
              />
            </Form.Group>
            <br />
            <Form.Group>
              <Form.Label>Clave</Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={formData.password || ""}
                readOnly={readOnlyInfo}
                onChange={handleChange}
              />
            </Form.Group>
            <br />
            <Form.Group>
              <Form.Label>MAC</Form.Label>
              <Form.Control
                type="text"
                name="mac_pend_asignacion"
                value={formData.mac_pend_asignacion || ""}
                readOnly={readOnlyInfo}
                onChange={handleChange}
              />
            </Form.Group>
            <br />
            <Form.Group>
              <Form.Label>Estado</Form.Label>
              <Form.Control
                type="text"
                name="Estado_Autorizacion"
                value={formData.Estado_Autorizacion || ""}
                readOnly={readOnlyInfo}
                onChange={handleChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => { handleCloseModal() }}>Cerrar</Button>
          {
            readOnlyInfo ?
              <></>
              :
              <Button variant="primary" onClick={() => { handleSubmit(formData) }}>
                {'Guardar Cambios'}
              </Button>
          }

        </Modal.Footer>
      </Modal>

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
            <br />
            <Form.Group>
              <Form.Label>Fabricante</Form.Label>
              {
                dataListMovil.informacion_del_movil ?
                  <Form.Control
                    type="text"
                    name="Fabricante"
                    value={dataListMovil.informacion_del_movil[0].Fabricante}
                    readOnly={true}
                  /> :
                  <Form.Control
                    type="text"
                    name="Fabricante"
                    value={"Indefinido"}
                    readOnly={true}
                  />
              }
            </Form.Group>
            <br />
            <Form.Group>
              <Form.Label>Modelo</Form.Label>
              {
                dataListMovil.informacion_del_movil ?
                  <Form.Control
                    type="text"
                    name="Fabricante"
                    value={dataListMovil.informacion_del_movil[0].Modelo}
                    readOnly={true}
                  /> :
                  <Form.Control
                    type="text"
                    name="Fabricante"
                    value={"Indefinido"}
                    readOnly={true}
                  />
              }
            </Form.Group>
            <br />
            <Form.Group>
              <Form.Label>Serial</Form.Label>
              {
                dataListMovil.informacion_del_movil ?
                  <Form.Control
                    type="text"
                    name="Fabricante"
                    value={dataListMovil.informacion_del_movil[0].Serial}
                    readOnly={true}
                  /> :
                  <Form.Control
                    type="text"
                    name="Fabricante"
                    value={"Indefinido"}
                    readOnly={true}
                  />
              }
            </Form.Group>
            <br />
            <Form.Group>
              <Form.Label>Marca</Form.Label>
              {
                dataListMovil.informacion_del_movil ?
                  <Form.Control
                    type="text"
                    name="Fabricante"
                    value={dataListMovil.informacion_del_movil[0].Marca}
                    readOnly={true}
                  /> :
                  <Form.Control
                    type="text"
                    name="Fabricante"
                    value={"Indefinido"}
                    readOnly={true}
                  />
              }
            </Form.Group>
            <br />
            <Form.Group>
              <Form.Label>Versión</Form.Label>
              {
                dataListMovil.informacion_del_movil ?
                  <Form.Control
                    type="text"
                    name="Fabricante"
                    value={dataListMovil.informacion_del_movil[0].Version}
                    readOnly={true}
                  /> :
                  <Form.Control
                    type="text"
                    name="Fabricante"
                    value={"Indefinido"}
                    readOnly={true}
                  />
              }
            </Form.Group>
            <br />
            <Form.Group>
              <Form.Label>RAM</Form.Label>
              {
                dataListMovil.informacion_del_movil ?
                  <Form.Control
                    type="text"
                    name="Fabricante"
                    value={dataListMovil.informacion_del_movil[0].RAM}
                    readOnly={true}
                  /> :
                  <Form.Control
                    type="text"
                    name="Fabricante"
                    value={"Indefinido"}
                    readOnly={true}
                  />
              }
            </Form.Group>
          </Form>
          <br />
          <Table className="table table-dashed table-hover digi-dataTable table-striped" id="componentDataTable">
            <thead>
              <tr>
                <th>Nombre Aplicación</th>
                <th>Versión</th>
                <th>TargetSdkVersion</th>
                <th>UltimaFechaInstall</th>
                <th>UltimaFechaUpdate</th>
              </tr>
            </thead>
            <tbody>
              {dataListMovil?.informacion_de_aplicaciones?.map((data) => (
                <tr key={data.Nombre + (index += 1)}>
                  <td style={{
                    maxWidth: '250px',
                    overflowWrap: 'break-word'
                  }}>{data.Nombre}</td>
                  <td style={{
                    maxWidth: '200px',
                    overflowWrap: 'break-word'
                  }}>{data.Version}</td>
                  <td style={{
                    maxWidth: '20px',
                    overflowWrap: 'break-word'
                  }}>{data.TargetSdkVersion}</td>
                  <td style={{
                    maxWidth: '250px',
                    overflowWrap: 'break-word'
                  }}>{data.UltimaFechaInstall}</td>
                  <td style={{
                    maxWidth: '250px',
                    overflowWrap: 'break-word'
                  }}>{data.UltimaFechaUpdate}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-danger" onClick={() => { exportToPDFInfoMovil() }}>
            <FontAwesomeIcon icon={faFilePdf} /> Exportar a PDF
          </Button>
          <Button variant="secondary" onClick={() => { handleCloseModalInfoMovil() }}>Cerrar</Button>
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

export default TablaVendedor;
