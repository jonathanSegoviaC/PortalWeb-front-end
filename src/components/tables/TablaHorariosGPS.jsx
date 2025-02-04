import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form } from 'react-bootstrap';
import axios from 'axios';
import { swalMensajeError, swalMensajeExito } from '../sweetalert2/MensajeSwal';

const TablaHorariosGPS = () => {
  const [horarios, setHorarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedHorario, setSelectedHorario] = useState({
    numdiasemana: '',
    nombredia: '',
    horaini: '',
    horafin: '',
    frecuenciatoma: ''
  });

  const fetchHorarios = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://home.mydealer.ec:8000/api/gpshorarios');
      setHorarios(response.data);
    } catch (error) {
      swalMensajeError("Error al cargar datos", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHorarios();
  }, []);

  const handleEdit = (horario) => {
    setSelectedHorario(horario);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedHorario({
      numdiasemana: '',
      nombredia: '',
      horaini: '',
      horafin: '',
      frecuenciatoma: ''
    });
    document.activeElement.blur(); // Eliminar el foco
  };

  const handleSaveChanges = async () => {
    try {
      const updatedHorario = {
        ...selectedHorario,
        horafin: selectedHorario.horafin.length === 5 
          ? `${selectedHorario.horafin}:00` 
          : selectedHorario.horafin,
        frecuenciatoma: parseInt(selectedHorario.frecuenciatoma, 10),
      };

      console.log("Datos enviados al servidor:", updatedHorario);
      await axios.put(`http://home.mydealer.ec:8000/api/gpshorarios/${updatedHorario.numdiasemana}`, updatedHorario);
      swalMensajeExito("Datos actualizados correctamente");
      setShowModal(false);
      fetchHorarios();
    } catch (error) {
      if (error.response) {
        console.error("Error 422:", error.response.data);
      }
      swalMensajeError("Error al guardar los cambios", error.message);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="table-responsive">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th># Día</th>
              <th>Descripción</th>
              <th>Hora Inicial</th>
              <th>Hora Final</th>
              <th>Frecuencia</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {horarios.map((horario) => (
              <tr key={horario.numdiasemana}>
                <td>{horario.numdiasemana}</td>
                <td>{horario.nombredia}</td>
                <td>{horario.horaini}</td>
                <td>{horario.horafin}</td>
                <td>{horario.frecuenciatoma}</td>
                <td>
                  <Button variant="info" onClick={() => handleEdit(horario)}>
                    Editar
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Editar Horario</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formDia">
              <Form.Label>Día</Form.Label>
              <Form.Control type="text" value={selectedHorario.numdiasemana} disabled />
            </Form.Group>

            <Form.Group controlId="formDescripcion">
              <Form.Label>Descripción</Form.Label>
              <Form.Control
                type="text"
                value={selectedHorario.nombredia}
                onChange={(e) => setSelectedHorario({ ...selectedHorario, nombredia: e.target.value })}
              />
            </Form.Group>

            <Form.Group controlId="formHoraInicio">
              <Form.Label>Hora Inicial (HH:MM:SS)</Form.Label>
              <Form.Control
                type="time"
                value={selectedHorario.horaini}
                onChange={(e) => setSelectedHorario({ ...selectedHorario, horaini: e.target.value })}
              />
            </Form.Group>

            <Form.Group controlId="formHoraFinal">
              <Form.Label>Hora Final (HH:MM:SS)</Form.Label>
              <Form.Control
                type="time"
                value={selectedHorario.horafin}
                onChange={(e) => setSelectedHorario({ ...selectedHorario, horafin: e.target.value })}
              />
            </Form.Group>

            <Form.Group controlId="formFrecuencia">
              <Form.Label>Frecuencia (Milisegundos)</Form.Label>
              <Form.Control
                type="number"
                value={selectedHorario.frecuenciatoma}
                onChange={(e) => setSelectedHorario({ ...selectedHorario, frecuenciatoma: e.target.value })}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cerrar
          </Button>
          <Button variant="primary" onClick={handleSaveChanges}>
            Guardar Cambios
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default TablaHorariosGPS;
