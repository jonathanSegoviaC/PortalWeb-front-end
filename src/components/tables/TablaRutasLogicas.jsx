import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Container, Row, Col, InputGroup, FormControl } from 'react-bootstrap';
import { deleteDatosVendedor, getDatosMovilVendedor, getDatosVendedor,getDatosVendedorV2, getUsuariosAdministrativos, updateDatosVendedor } from '../../../services/services';
import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil, faTrash, faMobilePhone,faArrowRight, faArrowLeft,  faInfo, faFileExcel, faFilePdf } from '@fortawesome/free-solid-svg-icons';
import { swalMensajeConfirmacion, swalMensajeError, swalMensajeExito, swalMensajeInformacion } from '../sweetalert2/MensajeSwal';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { Link } from 'react-router-dom';

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

  const [vendedores, setVendedores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
   
 
  useEffect(() => {
    const fetchVendedores = async () => {
      try {
        const vendedores = await getDatosVendedorV2();
        setVendedores(vendedores);
        setDataList(vendedores); // Actualiza dataList con los datos de vendedores
      } catch (err) {
        console.error('Error al cargar Vendedores:', err);
        setError('Error al cargar los Vendedores.');
      } finally {
        setLoading(false);
      }
    };
    fetchVendedores();
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
                    
                    <th>Código</th>
                    <th>Administrador de Venta</th>
                    <th>Acciones</th>
                    
                  </tr>
                </thead>
                <tbody>
                  {currentData.map((vendedor) => (
                    <tr key={vendedor.codvendedor}>
                      <td>{vendedor.codvendedor}</td>
                      <td>{vendedor.nombre}</td>
                      
                     
                        <td>
                                <Link
                                    to={`/ClientexVendedor/${vendedor.codvendedor}`}
                                    className="btn btn-primary btn-sm"
                                >
                                    Ver Clientes
                                </Link>
                        </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              
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
