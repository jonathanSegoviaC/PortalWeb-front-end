import React from "react";

const ReporteGestionTable = ({ resultados }) => {
  return (
    <div style={{ marginTop: "20px" }}>
      {resultados.length > 0 ? (
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ backgroundColor: "#f2f2f2" }}>
              <th style={{ padding: "10px" }}>Supervisor</th>
              <th style={{ padding: "10px" }}>Vendedor</th>
              <th style={{ padding: "10px" }}>Cliente</th>
              <th style={{ padding: "10px" }}>Fecha</th>
              <th style={{ padding: "10px" }}>Tipo Novedad</th>
              <th style={{ padding: "10px" }}>Página</th>
            </tr>
          </thead>
          <tbody>
            {resultados.map((resultado, index) => (
              <tr key={index} style={{ borderBottom: "1px solid #ddd" }}>
                <td style={{ padding: "10px" }}>{resultado.supervisor}</td>
                <td style={{ padding: "10px" }}>{resultado.vendedor}</td>
                <td style={{ padding: "10px" }}>{resultado.cliente}</td>
                <td style={{ padding: "10px" }}>{resultado.fecha}</td>
                <td style={{ padding: "10px" }}>{resultado.tipo_novedad}</td>
                <td style={{ padding: "10px" }}>{resultado.page}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No se encontraron resultados.</p>
      )}
    </div>
  );
};

export default ReporteGestionTable;