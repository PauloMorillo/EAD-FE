import React, { Children } from 'react'
import LeftView from './left/LeftView'
import RightView from './right/RightView'
import PaginaFormulario from '../PaginaFormulario'
import './layout.css'

function Layout({titulo='',color=1,tituloRight='',children,nombre='',edad=''}){
    return (
        <div className='layout'>
            <div className='leftview'>
                <LeftView titulo={titulo} color={color} nombre={nombre} edad={edad}/>
            </div>
            <div className='rightview'>
                <RightView tituloRight={tituloRight}>
                    {children}
                </RightView>
            </div>
        </div>
    )
}
export default Layout
