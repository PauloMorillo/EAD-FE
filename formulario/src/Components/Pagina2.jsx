import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './EstilosPagina2.css';

export default function Pagina2() {
    const location = useLocation();
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);
    const [buttonText, setButtonText] = useState('Selecciona una opción');
    const [edad, setEdad] = useState(null);
    const [rangoEdad, setRangoEdad] = useState(null);
    const [preguntas, setPreguntas] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

    const options = [
        { name: 'PERSONAL_SOCIAL', label: 'Personal Social' },
        { name: 'AUDICIÓN_LENGUAJE', label: 'Audición Lenguaje' },
        { name: 'MOTRICIDAD_FINOADAPTATIVA', label: 'Motricidad Finoadaptativa' },
        { name: 'MOTRICIDAD_GRUESA', label: 'Motricidad Gruesa' }
    ];

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleOptionClick = (option) => {
        setSelectedOption(option.name);
        setButtonText(option.label);
        setIsOpen(false);
    };

    const fetchQuestions = (componente) => {
        fetch(`http://18.189.81.6:9000/api/questions/?birth_date=2018-07-13&componente=${componente}&format=json&semanas_gestacion=40`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error en la respuesta del servidor');
                }
                return response.json();
            })
            .then(data => {
                setEdad(data.age);
                setRangoEdad(data.age_range);
                const filteredQuestions = data.Questions.filter(question => question.age_range === data.age_range);
                setPreguntas(filteredQuestions);

                // Encontrar la pregunta inicial por 'initial_item'
                const initialQuestionIndex = filteredQuestions.findIndex(question => question.item === data.initial_item);
                setCurrentQuestionIndex(initialQuestionIndex !== -1 ? initialQuestionIndex : 0);
            })
            .catch(error => {
                console.error('Hubo un problema con el request:', error);
            });
    };

    useEffect(() => {
        if (selectedOption) {
            fetchQuestions(selectedOption);
        }
    }, [selectedOption]);

    useEffect(() => {
        if (preguntas.length > 0 && currentQuestionIndex >= preguntas.length) {
            setCurrentQuestionIndex(preguntas.length - 1);
        }
    }, [preguntas]);

    const name = location.state && location.state.name;

    const handleContinue = () => {
        if (selectedOption) {
            navigate('/pagina3', { state: { selectedOption: buttonText, name, edad, rangoEdad, preguntas } });
        }
    };

    const handleAnswer = (answer) => {
        if (answer) {
            if (currentQuestionIndex < preguntas.length - 1) {
                setCurrentQuestionIndex(prevIndex => prevIndex + 1);
            } else {
                console.log('Se completaron todas las preguntas');
            }
        } else {
            if (currentQuestionIndex > 0) {
                setCurrentQuestionIndex(prevIndex => prevIndex - 1);
            } else {
                console.log('No se puede retroceder más');
            }
        }
    };

    const currentQuestion = preguntas[currentQuestionIndex];

    return (
        <div className="caja">
            <div className="caja1">
                {edad && rangoEdad && (
                    <div>
                        <p id="re">Rango de Edad:</p>
                        <p id="re"> {rangoEdad}</p>
                    
                        <p id="n">Edad:</p>
                        <p id="n">{edad}</p>
                    </div>
                )}
                <p id="n">Nombre: </p>
                <p id="n">{name}</p>
            </div>
            <div className="caja2">
                <div className="dropdown">
                    <h1 id="titulo10">Selecciona el área a evaluar</h1>
                    <div>
                        <button onClick={toggleDropdown} className="dropdown-toggle">
                            {buttonText}
                        </button>
                        {isOpen && (
                            <div className="dropdown-menu">
                                {options.map((option, index) => (
                                    <div key={index} onClick={() => handleOptionClick(option)} className="dropdown-item">
                                        {option.label}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
                <p id="pq">Pregunta:</p>
                {currentQuestion && (
                    <div className="pregunta-actual">
                        <h2>{currentQuestion.question}</h2>
                        <button onClick={() => handleAnswer(true)} className="answer-button">Sí</button>
                        <button onClick={() => handleAnswer(false)} className="answer-button">No</button>
                    </div>
                )}
                <button onClick={handleContinue} className="continue-button">Continuar</button>
            </div>
        </div>
    );
}