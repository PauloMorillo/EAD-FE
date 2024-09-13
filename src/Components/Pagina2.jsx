<<<<<<< HEAD:src/Components/Pagina2.jsx
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './EstilosPagina2.css';
=======
import React, { useState, useEffect, useContext } from "react";
import { EadContext } from "../Context/EadContext.jsx";
import { useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import "./EstilosPagina2.css";
>>>>>>> 5b3b187f (feature: context):formulario/src/Components/Pagina2.jsx

export default function Pagina2() {
  const {
    idPatient,
    setIdPatient,
    selectedOption,
    setSelectedOption,
    initialPoint,
    setInitialPoint,
    evaluateKid,
  } = useContext(EadContext);
  const location = useLocation();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [buttonText, setButtonText] = useState('Selecciona una opción');
  const [edad, setEdad] = useState(null);
  const [rangoEdad, setRangoEdad] = useState(null);
  const [preguntas, setPreguntas] = useState([]);
  const [questionResponse, setquestionResponse] = useState([]);
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

<<<<<<< HEAD
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
                // const filteredQuestions = data.Questions.filter(question => question.age_range === data.age_range);
                const filteredQuestions = data.Questions
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
=======
  const fetchQuestions = (componente) => {
    const birthDate = location.state.birth_date; // Obtener la fecha de nacimiento del estado
    fetch(`http://18.189.81.6:9000/api/questions/?birth_date=${birthDate}&componente=${componente}&format=json&semanas_gestacion=40`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Error en la respuesta del servidor');
>>>>>>> 9dee8090 (resolucion hallazgos logica preguntas)
        }
        return response.json();
      })
      .then(data => {
        setEdad(data.age);
        setRangoEdad(data.age_range);
        // const filteredQuestions = data.Questions.filter(question => question.age_range === data.age_range);
        const filteredQuestions = data.Questions
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
  }, [questionResponse]);

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
  setIdPatient(location.state && location.state.id);

  const handleContinues = async () => {
    const response = await evaluateKid(
      "http://18.189.81.6:9000/api/result",
      idPatient,
      initialPoint,
      selectedOption
    );
    console.log(response);
    if (selectedOption) {
      navigate('/pagina3', { state: { selectedOption: buttonText, name, edad, rangoEdad, preguntas } });
    }
  };

  const handleAnswer = (answer) => {
    // if (answer) {
    //     if (currentQuestionIndex < preguntas.length - 1) {
    //         setCurrentQuestionIndex(prevIndex => prevIndex + 1);
    //     } else {
    //         console.log('Se completaron todas las preguntas');
    //     }
    // } else {
    //     if (currentQuestionIndex > 0) {
    //         setCurrentQuestionIndex(prevIndex => prevIndex - 1);
    //     } else {
    //         console.log('No se puede retroceder más');
    //     }
    // }

    let questionSelect = currentQuestion.question;
    let filterQuestion = preguntas.find(x => x.question === questionSelect)
    let id = filterQuestion.item;
    let idQuestion = filterQuestion.id
    saveAnswer(id, answer, questionSelect, idQuestion)
    validCase(id);
  };

  const saveAnswer = (id, answer, question, idQuestion) => {

    let idPatient = idPatientResponse;
    let answerN;
    if (answer === true) {
      answerN = 1;
    } else {
      answerN = 0;
    }
    /*   Se hace el llamado al metodo de postResponse que envia al backend la respuesta de la pregunta que se ira reguistrando al id del paciente 
      que se envie  */
    postResponse(idQuestion, idPatient, answerN)
    setquestionResponse([...questionResponse, {
      'idQuestion': idQuestion,
      'question': question,
      'answer': answer,
      'item': id
    }])
    // questionResponse.push(
    //     {
    //         'idQuestion': idQuestion,
    //         'question': question,
    //         'answer': answer,
    //         'item': id
    //     }
    // );
    let positionArray;
    for (let i = 0; i <= preguntas.length - 1; i++) {

      if (preguntas[i].item === id) {
        positionArray = i;
      }
    }
    /*   Una vez almacenada la respuesta y enviada al back se cambian los valores, a isrenponse y response con sus respectivos valores. */
    preguntas[positionArray].isResponse = true
    preguntas[positionArray].response = answer
  }



  const postResponse = (idQuestions, idPatient, answer) => {

    fetch('http://18.189.81.6:9000/api/patients_questions/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        answer: answer,
        patient: idPatient,
        Question: idQuestions
      })
    })
      .then(response => response.json())
      .then(data => {
      })
      .catch(error => {
      });

  }

  const validCase = (id) => {
    let positionArray;
    let filterQuestion = preguntas.filter(x => x.item === id);
    for (let i = 0; i <= preguntas.length - 1; i++) {
      if (preguntas[i].item === filterQuestion[0].item) {
        positionArray = i;
      }
    }
    /* Existen 3 casos con reglas diferentes, el primero de ellos es cuando el paciente inicia en el age range 1, ya que al no tener rangos anteriores tiene unas reglas diferentes
        - Si el paciente asi responda si o no en la primera pregunta siempre va avanzar
        - Si el paciente responde 2 veces seguidas que no, sin importar que aun no exista un punto de inicio se desplegara un msj que indica que el paciente 
        aun no esta listo para ese examen */

    if (filterQuestion[0].age_range == 1 && filterQuestion[0].item != 3) {
      if (preguntas[positionArray].response) {
        let tempPonitI = ponitI;
        if (positionArray != 0) {
          if (preguntas[positionArray - 1].response || preguntas[positionArray + 1].response) {
            tempPonitI = 1;
            setInitialPoint(1);
            if (preguntas[positionArray].item == 2) {

              let resultados = preguntas.find((e) => !e.hasOwnProperty("isResponse") && e.item != 1)
              searchQuestion(resultados.item)
            }
          }
          if (!preguntas[positionArray + 1].isResponse) {
            searchQuestion(preguntas[positionArray + 1].item)
          }
        }
        if (preguntas[positionArray + 1].isResponse && tempPonitI == 0) {
          if (preguntas[positionArray].item != 1) {
            searchQuestion(preguntas[positionArray - 1].item)
          } else {
            console.log(preguntas[positionArray + 2].response);
            console.log(preguntas[positionArray + 3].response);
            console.log(preguntas);
            if (preguntas[positionArray].item == 1) {
              if (!(preguntas[positionArray + 2].response) && !(preguntas[positionArray + 3].response)) {
                let confirmEv = confirm('Desea evaluar al paciente ? ')
                if (confirmEv) {
                  setTimeout('seeResult(patienSession.id,pointInitial)', 500)
                } else {
                }
              }
            }
            setInitialPoint(1);
            let resultados = preguntas.find((e) => !e.hasOwnProperty("isResponse"))
            searchQuestion(resultados.item)
          }
        }
      } else {
        if (positionArray != 0) {
          if (!preguntas[positionArray - 1].response) {
            alert('El paciente aun no esta listo para este examen')
            newPatien();
          } else {
            searchQuestion(preguntas[positionArray + 1].item)
          }
        } else {
          searchQuestion(preguntas[positionArray + 1].item)
        }
      }

      /*   el segundo caso atipico es cuando se llega a la ultima pregunta ya que si se llega a la ultima pregunta y aun no se a encontrado un punto de cierre 
      de igual forma se indica que ya no existen mas preguntas y que se debe terminar el proceso. */
    } else if (positionArray === 35) {
      alert('no existen mas preguntas para este paciente')
      setTimeout('seeResult(patienSession.id,pointInitial)', 500)
      /*   Por ultimo el caso que abarca la mayor cantidad de interacciones, ya que este valida sus preguntas adyacentes y evalua si debe aumentar o disminuir la posicion o en caso 
      tal sabe a que pregunta retornar  */
    } else {

      // si el paciente responde que si 
      if (preguntas[positionArray].response) {
        //busca si hay o no punto de inicio evalunado la pregunta siguiente y la anterior
        if (preguntas[positionArray - 1].response || preguntas[positionArray + 1].response) {
          setInitialPoint(1);
        }
        //valida si ya respondio la siguiente pregunta y pasa a la siguietne si la respuesta es "false"
        if (!preguntas[positionArray + 1].isResponse) {
          searchQuestion(preguntas[positionArray + 1].item)
          //valida si la pregunta siguiente ya tiene una respuesta si la respuesta es true
        } else if (preguntas[positionArray + 1].isResponse) {

          //cuando se devuelve
          if (preguntas[positionArray + 1].response) {
            //Filtra el array y trae todas las preguntas que ya se respondieron para ver a que pregunta debe volver
            let findQuestionNext = preguntas.filter(x => x.isResponse === true);
            //si comenzo con una respuesta negativa y al momento de volver nuevamente ingresa una respuesta negativa termina el proceso 
            if (!findQuestionNext[findQuestionNext.length - 1].response && !findQuestionNext[findQuestionNext.length - 2].response) {
              let confirmEv = confirm(' A llegado al punto de cieerre Desea evaluar al paciente ? ')
              if (confirmEv) {
                setTimeout('seeResult(patienSession.id,pointInitial)', 500)
              } else {
              }
            } else {
              searchQuestion(findQuestionNext[findQuestionNext.length - 1].item + 1);
            }
          } else {
            //manda para arriba en el orden de las preguntas, cuando la pregunta siguente fue negativa 
            searchQuestion(preguntas[positionArray - 1].item)
          }
        }
        //////////////////////////////////////////////////////
        // si el paciente responde que no
      } else if (!preguntas[positionArray].response) {
        // valida si la pregunta anterior ya tiene una respuesta de lo contrario envia a un pregunta superiro en el orden establecido
        if (!preguntas[positionArray - 1].isResponse) {
          searchQuestion(preguntas[positionArray - 1].item)
        }

        if (preguntas[positionArray - 1].isResponse) {
          /*     Si la pregunta anterior es verdadera y aun no se define el punto de incio lo devuelve 2 
              posiciones y si ya hay un punto de inicio avanza en el orden establecido */
          if (preguntas[positionArray - 1].response) {
            if (initialPoint !== 1) {
              let prueba = false;
              for (let i = positionArray; i > 0; i--) {
                if (!preguntas[i - 1].isResponse) {
                  prueba = true
                } else {
                  prueba = false
                }
              }
              if (prueba) {
                searchQuestion(preguntas[positionArray - 2].item)
              } else {
                searchQuestion(preguntas[positionArray + 1].item)
              }
            } else {
              searchQuestion(preguntas[positionArray + 1].item)
            }
            //si la pregunta anterior tiene respuesta negativa y nuevamente ingreso una respuesta negativa llega al punto de cierre y termina el proceso
          } else {
            let confirmEv = confirm('Desea evaluar al paciente ? ')
            if (confirmEv) {
              setTimeout('seeResult(patienSession.id,pointInitial)', 500)
            } else {
            }
          }
        }
      }
    }
  }

  const searchQuestion = (id) => {
    /*   como el servicio trae todas las praguntas aqui se filtra por el (initial_item) que se recibe por parametro y 
    se implrime en el html  en el componente "questionb" */
    let filterQuestion = preguntas.filter(x => x.item === id)
    let questionSelect = filterQuestion[0].item;
    setCurrentQuestionIndex(questionSelect - 1)
  }

  const currentQuestion = preguntas[currentQuestionIndex];

<<<<<<< HEAD
                        <p id="n">Edad:</p>
                        <p id="no">{edad}</p>
                    </div>
                )}
                <p id="n">Nombre: </p>
<<<<<<< HEAD
                <p id="n">{name}xczv</p>
=======
                <p id="no">{name}</p>
>>>>>>> 3cbb2487 (correcion errores 2)
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
=======
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
        <div className="dropdown">
          <h1 id="titulo10">Selecciona el área a evaluar</h1>
          <div>
            <button onClick={toggleDropdown} className="dropdown-toggle">
              {buttonText} <FontAwesomeIcon icon={faCaretDown} />
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
>>>>>>> 9dee8090 (resolucion hallazgos logica preguntas)
        </div>
        <p id="pq">Pregunta:</p>
        {currentQuestion && (
          <div className="pregunta-actual">
            <h2>{currentQuestion.question}</h2>
            <button onClick={() => handleAnswer(true)} className="answer-button">Sí</button>
            <button onClick={() => handleAnswer(false)} className="answer-button">No</button>
          </div>
        )}
        <button onClick={handleContinues} className="continue-button">
          Continuar
        </button>
      </div>
    </div>
  );
}