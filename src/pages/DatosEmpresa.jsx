import React, { useEffect, useState } from 'react';
import Footer from "../components/footer/Footer";
import DatosEmpresaContent from '../components/datos-empresa/DatosEmpresaContent';
import ViewProfileCards from '../components/cards/ViewProfileCards';

const DatosEmpresa = () => {
  const empresaId = 4; // Or any other logic to determine the empresaId

  return (
    <div className='main-content'>
      <div className='panel-header'>
        <h1>Editar Datos de la Empresa</h1>
      </div>
      <DatosEmpresaContent empresaId={empresaId} />
      <Footer />
    </div>
  );
}

export default DatosEmpresa
