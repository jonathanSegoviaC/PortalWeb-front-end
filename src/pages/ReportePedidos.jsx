import React, { useState } from "react";
import { getReportePedidos, getReportePedidosPorFiltros } from "../../services/services";
import ReportePedidosForm from "../components/forms/ReportePedidosForm";
import ReportePedidosTable from "../components/tables/ReportePedidosTable";

const ReportePedidos = () => {
  const [orden, setOrden] = useState("");
  const [detalle, setDetalle] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filtros, setFiltros] = useState({
    fecha_inicio: "",
    fecha_fin: "",
  });

  const buscarDetallePorOrden = async () => {
    if (!orden) {
      alert("Por favor, ingresa un número de orden.");
      return;
    }
    setLoading(true);
    try {
      const response = await getReportePedidos(orden);
      setDetalle(response || []);
    } catch (error) {
      console.error("Error al buscar el detalle del pedido:", error);
      alert("No se pudo encontrar el detalle del pedido.");
    } finally {
      setLoading(false);
    }
  };

  const buscarPedidosPorFiltros = async () => {
    if (!filtros.fecha_inicio || !filtros.fecha_fin) {
      alert("Por favor, ingresa ambas fechas.");
      return;
    }
    setLoading(true);
    try {
      const response = await getReportePedidosPorFiltros(filtros);
      setDetalle(response || []);
    } catch (error) {
      console.error("Error al buscar pedidos por filtros:", error);
      alert("No se pudo obtener la lista de pedidos. Verifica las fechas.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Consulta de Pedido</h1>
      <ReportePedidosForm
        onSearchByOrder={buscarDetallePorOrden}
        onSearchByFilters={buscarPedidosPorFiltros}
        loading={loading}
        setOrder={setOrden}
        setFilters={setFiltros}
        filtros={filtros}
      />
      <ReportePedidosTable detalle={detalle} />
    </div>
  );
};

export default ReportePedidos;