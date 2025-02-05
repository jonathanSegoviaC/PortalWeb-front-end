import axios from 'axios';
import { show_alert } from '../src/pages/SweetAlert';

export const getDatosEmpresa = async (empresaId) => {
  const api = 'http://home.mydealer.ec:8000/api/datos/empresa/';
  try {
    const response = await axios.get(`${api}${empresaId}`);
    response.data.datos.confirmarclaveadmin = "";
    return response.data.datos;
  } catch (error) {
    const titulo = "Error al momento de consultar los datos de las empresas: \n";
    throw titulo + error;
  }
};

export const updateDatosEmpresa = async (empresaId, data) => {
  const api = 'http://home.mydealer.ec:8000/api/datos/empresa/';
  try {
    const response = await axios.put(`${api}${empresaId}`, data);
    return response.data;
  } catch (error) {
    const titulo = "Error al momento de actualizar los datos de la empresa: \n";
    throw titulo + error;
  }
};

export const createDatosEmpresa = async (data) => {
  const api = 'http://home.mydealer.ec:8000/api/datos/empresa/';
  try {
    const response = await axios.post(api, data);
    return response.data;
  } catch (error) {
    const titulo = "Error al momento de registrar una nueva empresa: \n";
    throw titulo + error;
  }
};

export const getLogin = async (login, password) => {
  const api = 'http://home.mydealer.ec:8000/api/loginweb';
  try {
    const response = await axios.post(api, { login, password });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getUsuariosAdministrativos = async () => {
  const api = 'http://home.mydealer.ec:8000/api/user/administracion';
  try {
    const response = await axios.get(api);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export const updateUsuariosAdministrativos = async (loginUsuario, formData) => {
  const api = `http://home.mydealer.ec:8000/api/user/administracion`;
  try {
    const response = await axios.put(`${api}/${loginUsuario}`, formData);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export const crateUsuariosAdministrativos = async (formData) => {
  const api = 'http://home.mydealer.ec:8000/api/user/administracion';
  try {
    const response = await axios.post(api, formData);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export const getDatosVendedor = async () => {
  const api = 'http://home.mydealer.ec:8000/api/vendedor';
  const apiInfoMovil = 'http://home.mydealer.ec:8000/api/vendedor/datosmoviles/';
  try {
    const response = await axios.get(api);
    response.data.datos.data.forEach(async element => {
      const responseInfoMovil = await axios.get(`${apiInfoMovil}${element.codvendedor}?page=1`);
      const size = responseInfoMovil.data.datos.data.length;
      if ((size - 1) >= 0) {
        element.datosMoviles = true;
      } else {
        element.datosMoviles = false;
      }
    });

    return response.data;
  } catch (error) {
    const titulo = "Error al momento de consultar los datos de los vendedores: \n";
    throw titulo + error;
  }
}
export const getDatosVendedorV2 = async () => {
  const api = 'http://localhost:8000/api/vendedor';

  try {
    // Obtener la lista de vendedores
    const response = await axios.get(api);

    // Verificar si la respuesta tiene la estructura esperada
    if (!response.data || !response.data.datos || !Array.isArray(response.data.datos)) {
      throw new Error('La respuesta de la API no tiene el formato esperado.');
    }

    // Obtener el array de vendedores
    const vendedores = response.data.datos;

    // Devolver los datos de los vendedores
    return vendedores;
  } catch (error) {
    const titulo = "Error al momento de consultar los datos de los vendedores: \n";
    console.error(titulo, error);
    throw new Error(titulo + error.message);
  }
};

export const getDatosMovilVendedor = async (codvendedor, nombreVendedor) => {
  const apiInfoMovil = 'http://home.mydealer.ec:8000/api/vendedor/datosmoviles/';
  try {
    const response = await axios.get(`${apiInfoMovil}${codvendedor}?page=1`);
    const size = response.data.datos.data.length;
    if ((size - 1) >= 0) {
      response.data.datos.data[size - 1].nombreVendedor = nombreVendedor;
    }
    return response;
  } catch (error) {
    const titulo = "Error al momento de consultar los datos moviles del vendedor: \n";
    throw titulo + error;
  }
}

export const updateDatosVendedor = async (usuario, formData) => {
  const api = `http://home.mydealer.ec:8000/api/vendedor`;
  try {
    const response = await axios.put(`${api}/${usuario}`, formData);
    return response.data;
  } catch (error) {
    const titulo = `Error al momento de actualizar los datos del vendedor ${formData.administradorventa}: \n`;
    throw titulo + error;
  }
}

export const deleteDatosVendedor = async (usuario) => {
  const api = `http://home.mydealer.ec:8000/api/vendedor`;
  try {
    const response = await axios.delete(`${api}/${usuario}`);
    return response.data;
  } catch (error) {
    const titulo = `Error al momento de borrar los datos del vendedor ${formData.administradorventa}: \n`;
    throw titulo + error;
  }
}

/*************************************************************** Perfil de usuario */
export const createPerfilUsuario = async (formData1) => {
  const api = `http://home.mydealer.ec:8000/api/user/perfil`;
  try {
    const response = await axios.post(`${api}`, formData1);
    return response.data;
  } catch (error) {
    const titulo = `Error al momento de Crear el perfil ${Object.keys(formData1)}: \n`;
    throw titulo + error;
  }
}
/*********************Perfil usuarui */

export const getPerfilUsuario = async () => {
  const api = 'http://home.mydealer.ec:8000/api/user/perfil';
  try {
    const response = await axios.get(api);
    return response;
  } catch (error) {
    const titulo = "Error al momento de consultar los datos del perfil de usuario: \n";
    throw titulo + error;
  }
}

export const updatePerfilUsuario = async (codigo, formData1) => {
  const api = `http://home.mydealer.ec:8000/api/user/perfil`;
  try {
    const response = await axios.put(`${api}/${codigo}`, formData1);
    return response.data;
  } catch (error) {
    const titulo = `Error al momento de actualizar los datos del perfil ${Object.keys(formData1)}: \n`;
    throw titulo + error;
  }
}

export const deletePerfil = async (perfil) => {
  const api = `http://home.mydealer.ec:8000/api/user/perfil`;
  try {
    const response = await axios.delete(`${api}/${perfil}`);
    return response.data;
  } catch (error) {
    const titulo = `Error al momento de borrar los datos del perfil ${formData.Perfil}: \n`;
    throw titulo + error;
  }
}

/*************************************************************** Cliente */

export const getDatosClientes = async () => {
  const api = 'http://home.mydealer.ec:8000/api/cliente';
  try {
    const response = await axios.get(api);
    return response;
  } catch (error) {
    const titulo = "Error al momento de consultar los datos del cliente: \n";
  }
}

export const createTipoNovedad = async (formData1) => {
  const api = `http://home.mydealer.ec:8000/api/tipo/novedad`;
  try {
    const response = await axios.post(`${api}`, formData1);
    return response.data;
  } catch (error) {
    const titulo = `Error al momento de Crear tipo novedad ${Object.keys(formData1)}: \n`;
    throw titulo + error;
  }
}

export const getTipoNovedad = async () => {
  const api = 'http://home.mydealer.ec:8000/api/tipo/novedad';
  try {
    const response = await axios.get(api);
    return response;
  } catch (error) {
    const titulo = "Error al momento de consultar los datos de tipo novedad: \n";
    throw titulo + error;
  }
}

export const updateTipoNovedad = async (codigo, formData1) => {
  const api = `http://home.mydealer.ec:8000/api/tipo/novedad`;
  try {
    const response = await axios.put(`${api}/${codigo}`, formData1);
    return response.data;
  } catch (error) {
    const titulo = `Error al momento de actualizar los datos de tipo novedad ${Object.keys(formData1)}: \n`;
    throw titulo + error;
  }
}

export const deleteTipoNovedad = async (perfil) => {
  const api = `http://home.mydealer.ec:8000/api/tipo/novedad`;
  try {
    const response = await axios.delete(`${api}/${perfil}`);
    return response.data;
  } catch (error) {
    const titulo = `Error al momento de borrar los datos de tipo noveddad ${formData.Perfil}: \n`;
    throw titulo + error;
  }
}

export const createMenuCabecera = async (formData1) => {
  const api = `http://home.mydealer.ec:8000/api/menu/cabecera`;
  try {
    const response = await axios.post(`${api}`, formData1);
    return response.data;
  } catch (error) {
    const titulo = `Error al momento de Crear menu cabecera ${Object.keys(formData1)}: \n`;
    throw titulo + error;
  }
}

export const getMenuCabecera = async () => {
  const api = 'http://home.mydealer.ec:8000/api/menu/cabecera';
  try {
    const response = await axios.get(api);
    return response;
  } catch (error) {
    const titulo = "Error al momento de consultar los datos de menu cabecera: \n";
    throw titulo + error;
  }
}

export const updateMenuCabecera = async (codigo, formData1) => {
  const api = `http://home.mydealer.ec:8000/api/menu/cabecera`;
  try {
    const response = await axios.put(`${api}/${codigo}`, formData1);
    return response.data;
  } catch (error) {
    const titulo = `Error al momento de actualizar los datos de menu cabecera ${Object.keys(formData1)}: \n`;
    throw titulo + error;
  }
}

export const deleteMenuCabecera = async (perfil) => {
  const api = `http://home.mydealer.ec:8000/api/menu/cabecera`;
  try {
    const response = await axios.delete(`${api}/${perfil}`);
    return response.data;
  } catch (error) {
    const titulo = `Error al momento de borrar los datos de menu cabecera ${formData.Perfil}: \n`;
    throw titulo + error;
  }
}



// Función para obtener los datos filtrados
export const getReporteGpsEstadoFiltro = async (codsupervisor, codvendedor, fecha_inicio, fecha_fin) => {
  const api = 'http://localhost:8000/api/ReGpsEstadoFiltro'; // Cambia la URL si es necesario
  try {
    const response = await axios.get(api, {
      params: {
        codsupervisor: codsupervisor || null, // Si no se proporciona, se envía null
        codvendedor: codvendedor || null, // Si no se proporciona, se envía null
        fecha_inicio,
        fecha_fin,
      },
    });
    return response.data; // Retorna los datos obtenidos
  } catch (error) {
    throw error; // Lanza el error para manejarlo en el componente
  }
};

export const getSupervisor = async () => {
  const api = 'http://localhost:8000/api/ReGpsEstadoSuper'; // Cambia la URL si es necesario
  try {
    const response = await axios.get(api);
    return response.data;
  } catch (error) {
    const titulo = "Error al momento de consultar los datos de menu cabecera: \n";
    throw titulo + error;
  }
};


export const getVendedorPorSupervisor= async (codsupervisor) => {
   const api = ` http://localhost:8000/api/ReGpsEstadoVenSuper/${codsupervisor}`; // Cambia la URL si es necesario
  try {
    const response = await axios.get(api, {
      params: {
        codsupervisor: codsupervisor || null, // Si no se proporciona, se envía null
       
      },
    });
    return response.data; // Retorna los datos obtenidos
  } catch (error) {
    throw error; // Lanza el error para manejarlo en el componente
  }
};

export const getDatosMovilVendedorVF = async (codvendedor, nombreVendedor) => {
  const apiInfoMovil = 'http://localhost:8000/api/vendedor/datosmoviles/';
  try {
    const response = await axios.get(`${apiInfoMovil}${codvendedor}?page=1`);
    const size = response.data.datos.data.length;
    if ((size - 1) >= 0) {
      response.data.datos.data[size - 1].nombreVendedor = nombreVendedor;
    }
    return response.data;
  } catch (error) {
    const titulo = "Error al momento de consultar los datos moviles del vendedor: \n";
    throw titulo + error;
  }
}

export const getReporteCorreos = async (filtros) => {
  const api = "http://home.mydealer.ec:8000/api/reporte/correos";
  try {
    const response = await axios.get(api, { params: filtros });
    return response.data.data || []; // Retorna los datos o un array vacío si no hay datos
  } catch (error) {
    const titulo = "Error al momento de consultar el reporte de correos: \n";
    throw titulo + error;
  }
};

export const getPedidoDetalle = async (orden) => {
  const api = "http://home.mydealer.ec:8000/api/reporte/pedidos/${orden}";
  try {
    const response = await axios.get(api);
    return response.data.datos || [];
  } catch (error) {
    console.error("Error al buscar el detalle del pedido:", error);
    throw "No se pudo encontrar el detalle del pedido.";
  }
};

export const getReportePedidosPorFiltros = async (filters) => {
  const apiUrl = "http://home.mydealer.ec:8000/api/reporte/pedidos";
  try {
    const response = await axios.post(apiUrl, {
      fecha_inicio: filters.fecha_inicio || "",
      fecha_fin: filters.fecha_fin || "",
    });
    return response.data.datos || [];
  } catch (error) {
    console.error("Error al obtener pedidos por filtros:", error);
    throw error;
  }
};

export const getReporteGestion = async (filtros) => {
  const apiUrl = "http://home.mydealer.ec:8000/api/reporte/gestion";
  try {
    const response = await axios.get(apiUrl, { params: filtros });
    return response.data.datos || [];
  } catch (error) {
    console.error("Error al obtener el reporte de gestión:", error);
    throw error;
  }
};

export const getReportePedidos = async (orden) => {
  const apiUrl = `http://home.mydealer.ec:8000/api/reporte/pedidos/${orden}`;
  try {
    const response = await axios.get(apiUrl);
    return response.data.datos || [];
  } catch (error) {
    console.error("Error al obtener reporte de pedidos:", error);
    throw error;
  }
};

export const getGeorreferenciacionCliente = async (page) => {
  const api = `http://home.mydealer.ec:8000/api/direccion/envio/gps?page=${page}`;
  try {
    const response = await axios.get(api);
    console.log("Respuesta completa de la API:", response.data);

    // Manejar ambos casos: API devuelve array directo o datos paginados
    if (Array.isArray(response.data)) {
      console.log("API devolvió un array directamente.");
      return { data: response.data, last_page: 1, current_page: page };
    } else if (response.data && response.data.datos && Array.isArray(response.data.datos.data)) {
      console.log("API devolvió datos paginados.");
      return {
        data: response.data.datos.data,
        last_page: response.data.datos.last_page || 1,
        current_page: response.data.datos.current_page || page,
      };
    } else {
      console.error("Estructura inesperada en la respuesta de la API:", response.data);
      return { data: [], last_page: 1, current_page: page };
    }
  } catch (error) {
    console.error("Error en la API:", error);
    throw new Error(`Error al consultar dirección de envío: ${error.message}`);
  }
};

const BASE_URL = "http://127.0.0.1:8000/api"; // Asegúrate de que sea la correcta

export const getReporteVendedores = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/vendedor/coordenadas/reporte`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener el reporte de vendedores:", error);
    throw error;
  }
};
export const getUbicacionVendedores = async () => {
  try {
      const response = await axios.get(`${BASE_URL}/vendedor/coordenadas`);
      console.log("Respuesta completa de la API:", response.data);

      // Verificamos que la API devuelva datos válidos
      if (response.data && response.data.datos && Array.isArray(response.data.datos)) {
          return response.data.datos; // Retornamos solo el array de vendedores
      } else {
          console.error("Estructura inesperada en la API:", response.data);
          return [];
      }
  } catch (error) {
      console.error("Error al obtener ubicaciones:", error);
      return [];
  }
};
