import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PaginaFormulario from './Components/PaginaFormulario';
import Pagina2 from './Components/Pagina2';
import Pagina3 from './Components/Pagina3';
import Resultados from './Components/Resultados';  // Importa el nuevo componente

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PaginaFormulario />} />
        <Route path="/pagina2" element={<Pagina2 />} />
        <Route path="/pagina3" element={<Pagina3 />} />
        <Route path="/resultados" element={<Resultados />} /> 
      </Routes>
    </Router>
  );
}

export default App;