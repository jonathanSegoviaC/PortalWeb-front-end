import React, { useState } from "react";
import { getReporteGestion } from "../../services/services";

const ReporteGestion = () => {
  const [filtros, setFiltros] = useState({
    supervisor: "",
    vendedor: "",
    cliente: "",
    fecha_inicio: "",
    fecha_fin: "",
    tipo_novedad: "",
    page: 1,
  });
  const [resultados, setResultados] = useState([]);
  const [loading, setLoading] = useState(false);

  const buscarReporteGestion = async () => {
    setLoading(true);
    try {
      const data = await getReporteGestion(filtros);
      setResultados(data || []);
    } catch (error) {
      console.error("Error al buscar el reporte de gestión:", error);
      alert("No se pudo obtener el reporte. Verifica los filtros ingresados.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 bg-[#001f3f] text-white rounded-md shadow-lg">
      <h1 className="text-xl font-bold mb-4">Reporte de Gestión</h1>

      {/* Campos de Filtros */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm">Supervisor:</label>
          <input
            type="text"
            value={filtros.supervisor}
            onChange={(e) => setFiltros({ ...filtros, supervisor: e.target.value })}
            className="w-full p-2 bg-gray-800 text-white border border-gray-600 rounded"
          />
        </div>
        <div>
          <label className="block text-sm">Vendedor:</label>
          <input
            type="text"
            value={filtros.vendedor}
            onChange={(e) => setFiltros({ ...filtros, vendedor: e.target.value })}
            className="w-full p-2 bg-gray-800 text-white border border-gray-600 rounded"
          />
        </div>
        <div>
          <label className="block text-sm">Cliente:</label>
          <input
            type="text"
            value={filtros.cliente}
            onChange={(e) => setFiltros({ ...filtros, cliente: e.target.value })}
            className="w-full p-2 bg-gray-800 text-white border border-gray-600 rounded"
          />
        </div>
        <div>
          <label className="block text-sm">Fecha Inicio:</label>
          <input
            type="date"
            value={filtros.fecha_inicio}
            onChange={(e) => setFiltros({ ...filtros, fecha_inicio: e.target.value })}
            className="w-full p-2 bg-gray-800 text-white border border-gray-600 rounded"
          />
        </div>
        <div>
          <label className="block text-sm">Fecha Fin:</label>
          <input
            type="date"
            value={filtros.fecha_fin}
            onChange={(e) => setFiltros({ ...filtros, fecha_fin: e.target.value })}
            className="w-full p-2 bg-gray-800 text-white border border-gray-600 rounded"
          />
        </div>
        <div>
          <label className="block text-sm">Tipo de Novedad:</label>
          <input
            type="text"
            value={filtros.tipo_novedad}
            onChange={(e) => setFiltros({ ...filtros, tipo_novedad: e.target.value })}
            className="w-full p-2 bg-gray-800 text-white border border-gray-600 rounded"
          />
        </div>
      </div>

      <button
        onClick={buscarReporteGestion}
        disabled={loading}
        className="py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded"
      >
        {loading ? "Buscando..." : "Buscar Reporte"}
      </button>

      {/* Resultados */}
      <div className="mt-6">
        {resultados.length > 0 ? (
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-700">
                <th className="p-2 border border-gray-600">Supervisor</th>
                <th className="p-2 border border-gray-600">Vendedor</th>
                <th className="p-2 border border-gray-600">Cliente</th>
                <th className="p-2 border border-gray-600">Fecha</th>
                <th className="p-2 border border-gray-600">Tipo Novedad</th>
              </tr>
            </thead>
            <tbody>
              {resultados.map((resultado, index) => (
                <tr key={index} className="border-b border-gray-700">
                  <td className="p-2">{resultado.supervisor}</td>
                  <td className="p-2">{resultado.vendedor}</td>
                  <td className="p-2">{resultado.cliente}</td>
                  <td className="p-2">{resultado.fecha}</td>
                  <td className="p-2">{resultado.tipo_novedad}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-center mt-4">No se encontraron resultados.</p>
        )}
      </div>
    </div>
  );
};

export default ReporteGestion;