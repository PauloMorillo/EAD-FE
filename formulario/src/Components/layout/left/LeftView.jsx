import React from 'react'
import './leftview.css'

function LeftView({ titulo, nombre = false, edad = false, color = 2 }) {
    return (
        <div className='backgroundLeft'>
        <div className='mainLeft'>
            {color==1?
            <h1 className='tituloLeft'>{titulo}</h1>
            :
            <h1 className='titulo2Left'>{titulo}</h1>
        }
            <div>
                {nombre && (
                    <>
                        <h2 className='subTituloLeft'>Nombre:</h2>
                        <p className='parrafoLeft'>{nombre}</p>
                    </>
                )
                }
            </div>
            <div>
                {edad && (
                    <>
                        <h2 className='subTituloLeft'>Edad:</h2>
                        <p className='parrafoLeft'>14 meses y  7 días</p>
                    </>
                )
                }
            </div>
        </div>
        </div>
    )
}

export default LeftView
