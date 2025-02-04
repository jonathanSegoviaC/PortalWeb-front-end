import React from "react";

const CorreoDetalleModal = ({ correo, onClose }) => {
  if (!correo) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: "0",
        left: "0",
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: "1000",
      }}
    >
      <div
        style={{
          backgroundColor: "#fff",
          padding: "20px",
          borderRadius: "10px",
          maxWidth: "500px",
          width: "100%",
        }}
      >
        <h2>Detalles del Correo</h2>
        <p>
          <strong>Orden:</strong> {correo.srorden}
        </p>
        <p>
          <strong>Código Correo:</strong> {correo.idcorreo}
        </p>
        <p>
          <strong>Usuario:</strong> {correo.usuario || "No especificado"}
        </p>
        <p>
          <strong>Mail Principal:</strong> {correo.mailprincipal}
        </p>
        <p>
          <strong>Asunto:</strong> {correo.asunto}
        </p>
        <p>
          <strong>Fecha Creación:</strong> {correo.fechacreacion}
        </p>
        <button onClick={onClose} style={{ padding: "10px 20px" }}>
          Cerrar
        </button>
      </div>
    </div>
  );
};

export default CorreoDetalleModal;