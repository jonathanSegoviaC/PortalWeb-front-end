import React from 'react';
import TablaProducto from '../components/tables/TablaProducto';
import Footer from '../components/footer/Footer';

const Producto = () => {
  return (
    <div className="main-content">
      <div className="row g-3">
      <h1>Productos</h1>
        <TablaProducto />
      </div>
      <Footer />
    </div>
  );
};

export default Producto;