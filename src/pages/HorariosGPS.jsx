import React from 'react';
import TablaHorariosGPS from '../components/tables/TablaHorariosGPS';
import Footer from '../components/footer/Footer';

const HorariosGPS = () => {
  return (
    <div className="main-content">
      <div className="row g-3">
      <h1>Horarios GPS</h1>
        <TablaHorariosGPS />
      </div>
      <Footer />
    </div>
  );
};

export default HorariosGPS;