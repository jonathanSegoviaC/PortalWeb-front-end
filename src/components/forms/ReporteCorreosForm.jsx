import React from "react";

const ReporteCorreosForm = ({ filtros, setFiltros, buscarCorreos, loading }) => {
  return (
    <div style={{ marginBottom: "20px" }}>
      <label htmlFor="fecha_inicio">Fecha Inicio:</label>
      <input
        type="date"
        id="fecha_inicio"
        value={filtros.fecha_inicio}
        onChange={(e) =>
          setFiltros({ ...filtros, fecha_inicio: e.target.value })
        }
        style={{
          marginLeft: "10px",
          padding: "5px",
          color: "#fff",
          backgroundColor: "#001f3f",
          border: "1px solid #ccc",
          borderRadius: "4px",
        }}
      />
      <label htmlFor="fecha_fin" style={{ marginLeft: "20px" }}>
        Fecha Fin:
      </label>
      <input
        type="date"
        id="fecha_fin"
        value={filtros.fecha_fin}
        onChange={(e) =>
          setFiltros({ ...filtros, fecha_fin: e.target.value })
        }
        style={{
          marginLeft: "10px",
          padding: "5px",
          color: "#fff",
          backgroundColor: "#001f3f",
          border: "1px solid #ccc",
          borderRadius: "4px",
        }}
      />
      <label htmlFor="tipo" style={{ marginLeft: "20px" }}>
        Tipo:
      </label>
      <select
        id="tipo"
        value={filtros.tipo}
        onChange={(e) => setFiltros({ ...filtros, tipo: e.target.value })}
        style={{
          marginLeft: "10px",
          padding: "5px",
          color: "#fff",
          backgroundColor: "#001f3f",
          border: "1px solid #ccc",
          borderRadius: "4px",
        }}
      >
        <option value="">Todos</option>
        <option value="NotificacionCobro">Notificación Cobro</option>
        <option value="NotificacionPedido">Notificación Pedido</option>
        <option value="NotificacionPreliminar">Notificación Preliminar</option>
      </select>
      <label htmlFor="estado" style={{ marginLeft: "20px" }}>
        Estado:
      </label>
      <select
        id="estado"
        value={filtros.estado}
        onChange={(e) => setFiltros({ ...filtros, estado: e.target.value })}
        style={{
          marginLeft: "10px",
          padding: "5px",
          color: "#fff",
          backgroundColor: "#001f3f",
          border: "1px solid #ccc",
          borderRadius: "4px",
        }}
      >
        <option value="">Todos</option>
        <option value="E">Enviado</option>
        <option value="N">No Enviado</option>
      </select>
      <button
        onClick={buscarCorreos}
        disabled={loading}
        style={{
          marginLeft: "20px",
          padding: "5px 10px",
          backgroundColor: "#ccc",
          color: "#000",
          border: "1px solid #000",
          cursor: "pointer",
          borderRadius: "4px",
        }}
      >
        {loading ? "Buscando..." : "Buscar Correos"}
      </button>
    </div>
  );
};

export default ReporteCorreosForm;