import React, { useState, useEffect } from 'react';
import { Table, Form, Button } from 'react-bootstrap';
import axios from 'axios';
import { swalMensajeError } from '../sweetalert2/MensajeSwal';

const TablaProducto = () => {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5); // Datos por página dinámicos

  // Cargar los productos
  const fetchProductos = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:8000/api/all/productos');
      setProductos(response.data);
    } catch (error) {
      swalMensajeError("Error al cargar productos", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProductos();
  }, []);

  // Filtrar productos según la búsqueda
  const filteredProductos = productos.filter(producto =>
    producto.codproducto.toString().includes(search)
  );

  // Calcular datos para paginación
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredProductos.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredProductos.length / itemsPerPage);

  // Función para cambiar de página
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  // Función para cambiar la cantidad de datos por página
  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(parseInt(e.target.value));
    setCurrentPage(1); // Reiniciar a la primera página al cambiar el tamaño
  };

  if (loading) {
    return <div>Cargando productos...</div>;
  }

  return (
    <div>
      {/* Barra de búsqueda */}
      <Form.Group className="mb-3">
        <Form.Control
          type="text"
          placeholder="Buscar por Código de Producto"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </Form.Group>

      {/* Selector de datos por página */}
      <Form.Select onChange={handleItemsPerPageChange} value={itemsPerPage} className="mb-3">
        <option value="5">5 datos por página</option>
        <option value="10">10 datos por página</option>
        <option value="15">15 datos por página</option>
        <option value="20">20 datos por página</option>
      </Form.Select>

      {/* Tabla de productos */}
      <div className="table-responsive">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Cod. Producto</th>
              <th>Nombre</th>
              <th>UMV</th>
              <th>Estado</th>
              <th>Cod. Tipo Producto</th>
              <th>Precio</th>
              <th>Unidad Medida</th>
              <th>Cod. Marca</th>
              <th>Porc. Impuesto</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((producto) => (
              <tr key={producto.codproducto}>
                <td>{producto.codproducto}</td>
                <td>{producto.nombre}</td>
                <td>{producto.umv}</td>
                <td>{producto.estado}</td>
                <td>{producto.codtipoproducto}</td>
                <td>{producto.precio}</td>
                <td>{producto.unidadmedida}</td>
                <td>{producto.codmarca}</td>
                <td>{producto.porcimpuesto}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      {/* Paginación con botones de flechas */}
      <div className="d-flex justify-content-end mt-3">
        <Button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="me-2"
          style={{
            backgroundColor: currentPage === 1 ? "#5c5c5c" : "#007bff",
            borderColor: "transparent",
          }}
        >
          ←
        </Button>
        <Button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          style={{
            backgroundColor: currentPage === totalPages ? "#5c5c5c" : "#007bff",
            borderColor: "transparent",
          }}
        >
          →
        </Button>
      </div>
    </div>
  );
};

export default TablaProducto;