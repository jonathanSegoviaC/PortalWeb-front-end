import React, { useState } from "react";
import { Table, Button, Modal, Container } from "react-bootstrap";

const ReportePedidosTable = ({ detalle }) => {
  const [modalData, setModalData] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const abrirModal = (detalle) => {
    setModalData(detalle);
    setShowModal(true);
  };

  const cerrarModal = () => {
    setModalData(null);
    setShowModal(false);
  };

  return (
    <Container fluid>
      <h2 className="mt-3">Detalle del Pedido</h2>

      {/* Contenedor responsivo para la tabla */}
      <div className="table-responsive">
        <Table striped bordered hover>
          <thead className="table-dark">
            <tr>
              <th>Código Sucursal</th>
              <th>Cliente</th>
              <th>Fecha</th>
              <th>Total</th>
              <th>Estado</th>
              <th>Código Vendedor</th>
              <th>Número de Orden</th>
              <th>Subtotal</th>
              <th>Descuento</th>
              <th>Impuesto</th>
              <th>Forma de Pago</th>
              <th>Observaciones</th>
              <th>Acción</th>
            </tr>
          </thead>
          <tbody>
            {detalle.map((pedido, index) => (
              <tr key={index}>
                <td>{pedido.codsucursal}</td>
                <td>{pedido.codcliente}</td>
                <td>{pedido.fecha}</td>
                <td>{pedido.total}</td>
                <td>{pedido.estado}</td>
                <td>{pedido.codvendedor}</td>
                <td>{pedido.numordenerp}</td>
                <td>{pedido.subtotal}</td>
                <td>{pedido.descuento}</td>
                <td>{pedido.impuesto}</td>
                <td>{pedido.codformapago}</td>
                <td>{pedido.observaciones || "N/A"}</td>
                <td>
                  <Button
                    variant="secondary"
                    onClick={() => abrirModal(pedido.reporte_detalle)}
                    disabled={!pedido.reporte_detalle || pedido.reporte_detalle.length === 0}
                  >
                    Ver Detalle
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      {/* Modal con Bootstrap */}
      <Modal show={showModal} onHide={cerrarModal} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Detalle del Producto</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="table-responsive">
            <Table striped bordered hover>
              <thead className="table-dark">
                <tr>
                  <th>Código Producto</th>
                  <th>Cantidad</th>
                  <th>Precio</th>
                  <th>Subtotal</th>
                  <th>Impuesto</th>
                </tr>
              </thead>
              <tbody>
                {modalData &&
                  modalData.map((detalle, idx) => (
                    <tr key={idx}>
                      <td>{detalle.codproducto}</td>
                      <td>{detalle.cantidad}</td>
                      <td>{detalle.precio}</td>
                      <td>{detalle.subtotal}</td>
                      <td>{detalle.impuesto}</td>
                    </tr>
                  ))}
              </tbody>
            </Table>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={cerrarModal}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default ReportePedidosTable;
