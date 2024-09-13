import React from 'react';
import { useLocation } from 'react-router-dom';
import './Estilospagina3.css'; 

export default function Pagina3() {
    const location = useLocation();
    const { selectedOption, name, edad, rangoEdad, preguntas } = location.state || {};

    return (
        <div className="caja">
            <div className="caja1">
                {edad && rangoEdad && (
                    <div>
                        <p id="re">Rango de Edad:</p>
                        <p id="re"> {rangoEdad}</p>
                    
                        <p id="n">Edad:</p>
                        <p id="no">{edad}</p>
                    </div>
                )}
                <p id="n">Nombre: </p>
                <p id="no">{name}</p>
            </div>
            <div className="caja2">
                <h2 id="a">{selectedOption}</h2>
                <p id="pd">El puntaje directo es: <br></br><span className="puntaje">45</span><br></br><span className="puntaje">Desarrollo esperado para la edad</span> </p>
                
                {}
                <hr className="linea-naranja" />
            
                <div className="preguntas">
                <p className="pregunta">Pregunta:</p>
                


                    </div>

                
                
                <button className="pagina3-button">Continuar con la siguiente evaluación</button>
            </div>
        </div>
    );
}