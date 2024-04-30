import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import PaginaFormulario from './Components/PaginaFormulario'
import Layout from './Components/layout/Layout'

import React from 'react';

function App() {
  return (
    <>
   <Layout titulo = 'Escala abreviada de Desarrollo' color={2} tituloRight='Datos del paciente' >
    <PaginaFormulario/>
   </Layout>

    </>
  );
}

export default App
