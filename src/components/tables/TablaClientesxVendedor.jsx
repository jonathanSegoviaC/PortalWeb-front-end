
import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { useParams,useNavigate } from 'react-router-dom';
import { Spinner, Alert, Table, Form } from 'react-bootstrap';


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


const ClientesxVendedor = () => {
    const { codvendedor } = useParams();
    const navigate = useNavigate(); // Hook para navegar
    const [clientes, setClientes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    const fetchClientes = useCallback(async () => {
        try {
            const response = await axios.get(
                `http://localhost:8000/api/RutasLogicas/${codvendedor}`
            );
            // Normalizar los datos para asegurarse de que nombrecomercial no sea null
            const normalizedClientes = response.data.map(cliente => ({
                ...cliente,
                nombrecomercial: cliente.nombrecomercial || 'N/A', // Asignar 'N/A' si es null o undefined
            }));
            setClientes(normalizedClientes);
            setLoading(false);
        } catch (err) {
            console.error(err); // Para depuración
            if (err.response) {
                setError(`Error ${err.response.status}: ${err.response.data.message}`);
            } else {
                setError('Error de conexión o servidor no disponible.');
            }
            setLoading(false);
        }
    }, [codvendedor]);

    useEffect(() => {
        fetchClientes();
    }, [fetchClientes]);

    const filteredClientes = clientes.filter((cliente) =>
        (cliente.nombrecomercial || '').toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Función para retroceder
    const handleGoBack = () => {
        navigate(-1); // Retrocede a la página anterior
    };

    if (loading) {
        return <Spinner animation="border" />;
    }

    if (error) {
        return <Alert variant="danger">{error}</Alert>;
    }

    if (clientes.length === 0) {
        return <div>No se encontraron clientes asignados al vendedor {codvendedor}.</div>;
    }

    return (
        <div>
            {/* Botón para retroceder */}
            <button onClick={handleGoBack} className="btn btn-secondary mb-3">
                Volver Atrás
            </button>
            <h1>Clientes asignados al vendedor {codvendedor}</h1>
            <Form.Control
                type="text"
                placeholder="Buscar por nombre comercial"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="mb-3"
            />
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Código</th>
                        <th>Nombre Comercial</th>
                        <th>Provincia</th>
                        <th>Ciudad</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredClientes.map((cliente) => (
                        <tr key={cliente.codcliente}>
                            <td>{cliente.codcliente}</td>
                            <td>{cliente.nombrecomercial || 'N/A'}</td>
                            <td>{cliente.provincia || 'N/A'}</td>
                            <td>{cliente.ciudad || 'N/A'}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
};

export default ClientesxVendedor;