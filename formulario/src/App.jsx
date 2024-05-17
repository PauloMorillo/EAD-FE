import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PaginaFormulario from './Components/PaginaFormulario';
import Pagina2 from './Components/Pagina2';
import Questions from './Components/questions/Questions';
import Layout from './Components/layout/Layout';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PaginaFormulario />} />
        <Route path="/pagina2" element={<Pagina2 />} />
        <Route path="/questions" element={<Questions />} />
        <Route path="/layout" element={<Layout />} />
      </Routes>
    </Router>
  );
}

export default App;