import React from 'react';
import Footer from '../components/footer/Footer';
import TablaParametros from '../components/tables/TablaParametros';

const Parametros = () => {
  return (
    <div className="main-content">       
      <div className="row g-3">
        <TablaParametros />
      </div>
      <Footer />
    </div>
  );
}

export default Parametros;
