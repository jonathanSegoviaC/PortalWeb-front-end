import React from "react";

const ReportePedidosForm = ({ onSearchByOrder, onSearchByFilters, loading, setOrder, setFilters, filtros }) => {
  return (
    <div style={{ display: "flex", gap: "20px", marginBottom: "20px" }}>
      {/* Formulario de búsqueda por número de orden */}
      <div>
        <label htmlFor="orden">Número de Orden:</label>
        <input
          type="text"
          id="orden"
          onChange={(e) => setOrder(e.target.value)}
          style={{
            marginLeft: "10px",
            padding: "5px",
            width: "200px",
            color: "#fff",
            backgroundColor: "#001f3f",
            border: "1px solid #ccc",
            borderRadius: "4px",
          }}
        />
        <button
          onClick={onSearchByOrder}
          disabled={loading}
          style={{
            marginLeft: "10px",
            padding: "5px 10px",
            color: "#000",
            backgroundColor: "#ccc",
            border: "1px solid #000",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          {loading ? "Buscando..." : "Buscar Pedido"}
        </button>
      </div>

      {/* Formulario de búsqueda por filtros */}
      <div>
        <label>Fecha Inicio:</label>
        <input
          type="date"
          name="fecha_inicio"
          value={filtros.fecha_inicio}
          onChange={(e) =>
            setFilters((prev) => ({ ...prev, fecha_inicio: e.target.value }))
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
        <label style={{ marginLeft: "20px" }}>Fecha Fin:</label>
        <input
          type="date"
          name="fecha_fin"
          value={filtros.fecha_fin}
          onChange={(e) =>
            setFilters((prev) => ({ ...prev, fecha_fin: e.target.value }))
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
        <button
          onClick={onSearchByFilters}
          disabled={loading}
          style={{
            marginLeft: "10px",
            padding: "5px 10px",
            backgroundColor: "#ccc",
            color: "#000",
            border: "1px solid #000",
            cursor: "pointer",
            borderRadius: "4px",
          }}
        >
          {loading ? "Buscando..." : "Buscar Pedidos"}
        </button>
      </div>
    </div>
  );
};

export default ReportePedidosForm;