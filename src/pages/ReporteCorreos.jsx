import React, { useState } from "react";
import ReporteCorreosForm from "../components/forms/ReporteCorreosForm";
import ReporteCorreosTable from "../components/tables/ReporteCorreosTable";
import { getReporteCorreos } from "../../services/services";


const ReporteCorreos = () => {
  const [filtros, setFiltros] = useState({
    fecha_inicio: "",
    fecha_fin: "",
    estado: "",
    tipo: "",
    page: 1,
  });
  const [correos, setCorreos] = useState([]);
  const [loading, setLoading] = useState(false);

  const buscarCorreos = async () => {
    if (!filtros.fecha_inicio || !filtros.fecha_fin) {
      alert("Por favor, ingresa ambas fechas.");
      return;
    }
    setLoading(true);
    try {
      const data = await getReporteCorreos(filtros); // Llamada al servicio
      setCorreos(data);
    } catch (error) {
      alert("No se pudo obtener el reporte de correos. Verifica los filtros.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Reporte de Correos</h1>
      <ReporteCorreosForm
        filtros={filtros}
        setFiltros={setFiltros}
        buscarCorreos={buscarCorreos}
        loading={loading}
      />
      <ReporteCorreosTable correos={correos} />
    </div>
  );
};

export default ReporteCorreos;