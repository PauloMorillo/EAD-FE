import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './Resultados.css';

export default function Resultados() {
    const location = useLocation();
    const { name, edad, rangoEdad } = location.state || {};
    const [resultData, setResultData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://18.189.81.6:9000/api/result/?patient=1092&age_range=6&componente=PERSONAL_SOCIAL');
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const data = await response.json();
                console.log('API response:', data); 
                if (Array.isArray(data) && data.length > 0) {
                    setResultData(data[0]); 
                } else {
                    throw new Error('No data found');
                }
            } catch (error) {
                console.error('Error fetching data:', error);
                setError(error.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="caja">
            <div className="caja1">
                {edad && rangoEdad && (
                    <div>
                        <p id="re">Rango de Edad:</p>
                        <p id="re">{rangoEdad}</p>
                    
                        <p id="n">Edad:</p>
                        <p id="no">{edad}</p>
                    </div>
                )}
                <p id="n">Nombre: </p>
                <p id="no">{name}</p>
            </div>
            <div className="caja2">
                <p id="resultados" className="titulo">Resultados</p>
                {isLoading ? (
                    <p>Cargando...</p>
                ) : error ? (
                    <p>Error: {error}</p>
                ) : resultData ? (
                    <div className="resultado-detalle">
                        <p id="componente" className="componente-text">Personal Social</p>
                        <p id="puntaje-directo" className="puntaje-text">El puntaje directo es: {resultData.direct_score}</p>
                        <p id="color" className="color-text">{resultData.color}</p>
                        <hr className="linea-azul" /> {}
                    </div>
                ) : (
                    <p>No se encontraron datos.</p>
                )}
            </div>
        </div>
    );
}