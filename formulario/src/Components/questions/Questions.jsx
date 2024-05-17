import React, { useEffect, useState } from 'react'
import Layout from '../layout/Layout'
import './questions.css'
const arrayQuestions = [
  { id: 78, age_range: 1, item: 1, question: 'Se sobresalta con un ruido.', component: 'AUDICIÓN_LENGUAJE', response: false },
  { id: 79, age_range: 1, item: 2, question: 'Contempla momentáneamente a una persona.', component: 'AUDICIÓN_LENGUAJE', response: false },
  { id: 106, age_range: 1, item: 3, question: 'Llora para expresar necesidades.', component: 'AUDICIÓN_LENGUAJE', response: false },
  { id: 81, age_range: 2, item: 4, question: 'Se tranquiliza con la voz humana.', component: 'AUDICIÓN_LENGUAJE', response: false },
  { id: 82, age_range: 2, item: 5, question: 'Produce sonidos guturales indiferenciados.', component: 'AUDICIÓN_LENGUAJE', response: false },
  { id: 83, age_range: 2, item: 6, question: 'Busca el sonido con la mirada.', component: 'AUDICIÓN_LENGUAJE', response: false },
  { id: 84, age_range: 3, item: 7, question: 'Busca diferentes sonidos con la mirada.', component: 'AUDICIÓN_LENGUAJE', response: false },
  { id: 85, age_range: 3, item: 8, question: 'Pone atención a la conversación.', component: 'AUDICIÓN_LENGUAJE', response: false },
  { id: 86, age_range: 3, item: 9, question: 'Produce cuatro o más sonidos diferentes.', component: 'AUDICIÓN_LENGUAJE', response: false },
  { id: 87, age_range: 4, item: 10, question: 'Pronuncia tres o más sílabas.', component: 'AUDICIÓN_LENGUAJE', response: false },
  { id: 88, age_range: 4, item: 11, question: 'Reacciona cuando se le llama por su nombre.', component: 'AUDICIÓN_LENGUAJE', response: false },
  { id: 89, age_range: 4, item: 12, question: 'Reacciona a tres palabras familiares.', component: 'AUDICIÓN_LENGUAJE', response: false },
  { id: 90, age_range: 5, item: 13, question: 'Reacciona a la palabra no.', component: 'AUDICIÓN_LENGUAJE', response: false },
  { id: 91, age_range: 5, item: 14, question: 'Llama al cuidador.', component: 'AUDICIÓN_LENGUAJE', response: false },
  { id: 92, age_range: 5, item: 15, question: 'Responde a una instrucción sencilla.', component: 'AUDICIÓN_LENGUAJE', response: false },
  { id: 93, age_range: 6, item: 16, question: 'Aproximación a una palabra con intención comunicativa.', component: 'AUDICIÓN_LENGUAJE', response: false },
  { id: 94, age_range: 6, item: 17, question: 'Reconoce al menos 6 objetos o imágenes.', component: 'AUDICIÓN_LENGUAJE', response: false },
  { id: 95, age_range: 6, item: 18, question: 'Sigue instrucciones de dos pasos.', component: 'AUDICIÓN_LENGUAJE', response: false },
  { id: 96, age_range: 7, item: 19, question: 'Nombra cinco objetos de una imagen.', component: 'AUDICIÓN_LENGUAJE', response: false },
  { id: 97, age_range: 7, item: 20, question: 'Utiliza más de 20 palabras.', component: 'AUDICIÓN_LENGUAJE', response: false },
  { id: 98, age_range: 7, item: 21, question: 'Usa frase de dos palabras.', component: 'AUDICIÓN_LENGUAJE', response: false },
  { id: 99, age_range: 8, item: 22, question: 'Dice su nombre completo.', component: 'AUDICIÓN_LENGUAJE', response: false },
  { id: 100, age_range: 8, item: 23, question: 'Dice frases de 3 palabras.', component: 'AUDICIÓN_LENGUAJE', response: false },
  { id: 101, age_range: 8, item: 24, question: 'Reconoce cualidades de los objetos.', component: 'AUDICIÓN_LENGUAJE', response: false },
  { id: 102, age_range: 9, item: 25, question: 'Define por su uso cinco objetos.', component: 'AUDICIÓN_LENGUAJE', response: false },
  { id: 103, age_range: 9, item: 26, question: 'Hace comparativos.', component: 'AUDICIÓN_LENGUAJE', response: false },
  { id: 104, age_range: 9, item: 27, question: 'Describe el dibujo.', component: 'AUDICIÓN_LENGUAJE', response: false },
  { id: 105, age_range: 10, item: 28, question: 'Reconoce 5 colores.', component: 'AUDICIÓN_LENGUAJE', response: false },
  { id: 107, age_range: 10, item: 29, question: 'Responde tres preguntas sobre un relato.', component: 'AUDICIÓN_LENGUAJE', response: false },
  { id: 108, age_range: 10, item: 30, question: 'Elabora un relato a partir de una imagen.', component: 'AUDICIÓN_LENGUAJE', response: false },
  { id: 109, age_range: 11, item: 31, question: 'Expresa opiniones.', component: 'AUDICIÓN_LENGUAJE', response: false },
  { id: 110, age_range: 11, item: 32, question: 'Repite palabras con pronunciación correcta.', component: 'AUDICIÓN_LENGUAJE', response: false },
  { id: 111, age_range: 11, item: 33, question: 'Absurdos visuales.', component: 'AUDICIÓN_LENGUAJE', response: false },
  { id: 112, age_range: 12, item: 34, question: 'Identifica palabras que inician con sonidos parecidos.', component: 'AUDICIÓN_LENGUAJE', response: false },
  { id: 113, age_range: 12, item: 35, question: 'Conoce: ayer, hoy y mañana.', component: 'AUDICIÓN_LENGUAJE', response: false }
]
const Questions = ({ initialItem = 10 }) => {
  const [questions, setQuestions] = useState(arrayQuestions);
  const getInitialItem = ()=>{
    let preguntaInicial = questions.find(pregunta => pregunta.item == initialItem)
    if (preguntaInicial) {
      return questions.indexOf(preguntaInicial);
    } else {
      console.log("Elemento no encontrado");
    }
  }
  const [indice, setIndice] = useState(()=>getInitialItem());
  const [questionShow, setQuestionShow] = useState(questions[indice]);
  

  const handleAnswer = (respuesta) => {
    if (respuesta == "Si") {
      setIndice(prevIndice => {
        const nuevoIndice = prevIndice + 1;
        setQuestionShow(questions[nuevoIndice]);
        return nuevoIndice;
      });
    } else {
      setIndice(prevIndice => {
        const nuevoIndice = prevIndice - 1;
        setQuestionShow(questions[nuevoIndice]);
        return nuevoIndice;
      });
    }
  }


  return (
    <div>
      <Layout titulo='Nombre Paciente' tituloRight='Questions' >
        <div>
          <h2>Pregunta:</h2>
          <p className='questionText'>{questionShow.question}</p>
          <div className='buttonContainer'>
            <button className='buttonQuestion' onClick={() => handleAnswer("Si")}>Si</button>
            <button className='buttonQuestion' onClick={() => handleAnswer("No")}>No</button>
          </div>
        </div>
      </Layout>
    </div>
  )
}

export default Questions
