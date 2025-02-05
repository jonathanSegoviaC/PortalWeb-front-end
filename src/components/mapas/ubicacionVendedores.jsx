import React, { useEffect, useState } from 'react';
import { getUbicacionVendedores } from '../../../services/services';

const MapaVendedores = () => {
    const [vendedores, setVendedores] = useState([]);

    useEffect(() => {
        const initMap = async () => {
            try {
                const data = await getUbicacionVendedores();
                console.log("Datos de la API:", data);

                if (!data || data.length === 0) {
                    console.error("No hay datos de ubicación.");
                    return;
                }

                setVendedores(data);

                // Centro del mapa con la primera ubicación
                const centro = { 
                    lat: parseFloat(data[0].latitud), 
                    lng: parseFloat(data[0].longitud) 
                };

                // Inicialización del mapa
                const map = new window.google.maps.Map(document.getElementById('map'), {
                    zoom: 13,
                    center: centro,
                });

                // Agregar marcadores de vendedores
                data.forEach((ubicacion) => {
                    const marker = new window.google.maps.Marker({
                        position: {
                            lat: parseFloat(ubicacion.latitud),
                            lng: parseFloat(ubicacion.longitud),
                        },
                        map: map,
                        title: `Vendedor: ${ubicacion.codvendedor}`,
                    });

                    const infoWindow = new window.google.maps.InfoWindow({
                        content: `<h3>Vendedor: ${ubicacion.codvendedor}</h3>
                                  <p>Fecha: ${ubicacion.fecha}</p>
                                  <p>Latitud: ${ubicacion.latitud}</p>
                                  <p>Longitud: ${ubicacion.longitud}</p>
                                  <p>Batería: ${ubicacion.bateria}%</p>`,
                    });

                    marker.addListener('click', () => {
                        infoWindow.open(map, marker);
                    });
                });

            } catch (error) {
                console.error("Error en la solicitud:", error);
            }
        };

        const loadScript = (url) => {
            const script = document.createElement('script');
            script.src = url;
            script.async = true;
            script.defer = true;
            document.head.appendChild(script);

            script.onload = () => {
                initMap();
            };
        };

        loadScript(
            'https://maps.googleapis.com/maps/api/js?key=AIzaSyDy9dRTRDBConVlFlejv-GBFnSKsabAFEU'
        );

    }, []);

    return (
        <div>
            <h1>Mapa de Vendedores</h1>
            <div id="map" style={{ height: '100vh', width: '100%' }}></div>
        </div>
    );
};

export default MapaVendedores;
