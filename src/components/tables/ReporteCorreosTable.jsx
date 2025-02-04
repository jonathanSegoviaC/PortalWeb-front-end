import React, { useState } from "react";
import { Table, Button, Container } from "react-bootstrap";
import CorreoDetalleModal from "../modal/CorreoDetalleModal";

const ReporteCorreosTable = ({ correos }) => {
  const [selectedCorreo, setSelectedCorreo] = useState(null);

  return (
    <Container fluid>
      <h2 className="mt-3">Reporte de Correos</h2>

      {/* Tabla responsiva */}
      <div className="table-responsive">
        <Table striped bordered hover>
          <thead className="table-dark">
            <tr>
              <th>Nro.</th>
              <th>Número Correo</th>
              <th>Código Correo</th>
              <th>Usuario</th>
              <th>Mail Principal</th>
              <th>Asunto</th>
              <th>Estado</th>
              <th>Fecha Creación</th>
              <th>Acción</th>
            </tr>
          </thead>
          <tbody>
            {correos && correos.length > 0 ? (
              correos.map((correo, index) => (
                <tr key={correo.idcorreo}>
                  <td>{index + 1}</td>
                  <td>{correo.srorden}</td>
                  <td 
                    className="text-primary text-decoration-underline" 
                    style={{ cursor: "pointer" }} 
                    onClick={() => setSelectedCorreo(correo)}
                  >
                    {correo.idcorreo}
                  </td>
                  <td>{correo.usuario || "N/A"}</td>
                  <td>{correo.mailprincipal}</td>
                  <td>{correo.asunto}</td>
                  <td>{correo.estado === "N" ? "No Enviado" : "Enviado"}</td>
                  <td>{correo.fechacreacion}</td>
                  <td>
                    <Button variant="success">Enviar Correo</Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="9" className="text-center">
                  No se encontraron resultados.
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>

      {/* Modal para detalles del correo */}
      {selectedCorreo && (
        <CorreoDetalleModal
          correo={selectedCorreo}
          onClose={() => setSelectedCorreo(null)}
        />
      )}
    </Container>
  );
};

export default ReporteCorreosTable;
