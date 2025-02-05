import React, { useEffect } from 'react';

const Mapa = () => {
    useEffect(() => {
        const initMap = () => {
            const urlParams = new URLSearchParams(window.location.search);
            const lat = parseFloat(urlParams.get('lat'));
            const lng = parseFloat(urlParams.get('lng'));
            const codigo = urlParams.get('codigo');
            const fecha = decodeURIComponent(urlParams.get('fecha'));
            console.log(lat, lng, codigo, fecha);
            if (!lat || !lng) {
                alert('Coordenadas no válidas');
                return;
            }

            const map = new google.maps.Map(document.getElementById('map'), {
                zoom: 15,
                center: { lat, lng },
            });

            const marker = new google.maps.Marker({
                position: { lat, lng },
                map,
                title: `Usuario: ${codigo}`,
            });

            const infoWindow = new google.maps.InfoWindow({
                content: `
                    <div>
                        <p><strong>Código de usuario:</strong> ${codigo}</p>
                        <p><strong>Latitud:</strong> ${lat}</p>
                        <p><strong>Longitud:</strong> ${lng}</p>
                        <p><strong>Fecha:</strong> ${fecha}</p>
                    </div>
                `,
            });

            infoWindow.open({
                anchor: marker,
                map,
                shouldFocus: false,
            });
        };

        const script = document.createElement('script');
        script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyDy9dRTRDBConVlFlejv-GBFnSKsabAFEU&callback=initMap`;
        script.async = true;
        window.initMap = initMap;
        document.head.appendChild(script);

        return () => {
            document.head.removeChild(script);
            delete window.initMap;
        };
    }, []);

    return <div id="map" style={{ height: '100vh', width: '100%' }}></div>;
};

export default Mapa;