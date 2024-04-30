import React from 'react'
import './rightview.css'

function RigthView({tituloRight="" ,children}) {
    return (
        <div className='background'>
        <div className='main'>
            <h1 className='titulo'>{tituloRight}</h1>
            {children}
        </div>
        </div>
    )
}

export default RigthView
