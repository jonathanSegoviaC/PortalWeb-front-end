import React from "react";

const ReporteGestionForm = ({ filtros, setFiltros, onSearch, loading }) => {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginBottom: "20px" }}>
      <div>
        <label>Supervisor:</label>
        <input
          type="text"
          value={filtros.supervisor}
          onChange={(e) => setFiltros({ ...filtros, supervisor: e.target.value })}
          style={{ marginLeft: "10px", padding: "5px", width: "200px" }}
        />
      </div>
      <div>
        <label>Vendedor:</label>
        <input
          type="text"
          value={filtros.vendedor}
          onChange={(e) => setFiltros({ ...filtros, vendedor: e.target.value })}
          style={{ marginLeft: "10px", padding: "5px", width: "200px" }}
        />
      </div>
      <div>
        <label>Cliente:</label>
        <input
          type="text"
          value={filtros.cliente}
          onChange={(e) => setFiltros({ ...filtros, cliente: e.target.value })}
          style={{ marginLeft: "10px", padding: "5px", width: "200px" }}
        />
      </div>
      <div>
        <label>Fecha Inicio:</label>
        <input
          type="date"
          value={filtros.fecha_inicio}
          onChange={(e) => setFiltros({ ...filtros, fecha_inicio: e.target.value })}
          style={{ marginLeft: "10px", padding: "5px" }}
        />
      </div>
      <div>
        <label>Fecha Fin:</label>
        <input
          type="date"
          value={filtros.fecha_fin}
          onChange={(e) => setFiltros({ ...filtros, fecha_fin: e.target.value })}
          style={{ marginLeft: "10px", padding: "5px" }}
        />
      </div>
      <div>
        <label>Tipo de Novedad:</label>
        <input
          type="text"
          value={filtros.tipo_novedad}
          onChange={(e) => setFiltros({ ...filtros, tipo_novedad: e.target.value })}
          style={{ marginLeft: "10px", padding: "5px", width: "200px" }}
        />
      </div>
      <div>
        <label>Página:</label>
        <input
          type="number"
          value={filtros.page}
          onChange={(e) => setFiltros({ ...filtros, page: parseInt(e.target.value, 10) })}
          style={{ marginLeft: "10px", padding: "5px", width: "100px" }}
        />
      </div>
      <div style={{ gridColumn: "span 2", textAlign: "center" }}>
        <button
          onClick={onSearch}
          disabled={loading}
          style={{
            padding: "10px 20px",
            backgroundColor: "#001f3f",
            color: "#fff",
            border: "none",
            cursor: "pointer",
            borderRadius: "5px",
          }}
        >
          {loading ? "Buscando..." : "Buscar Reporte"}
        </button>
      </div>
    </div>
  );
};

export default ReporteGestionForm;