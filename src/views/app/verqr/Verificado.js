import React from 'react'
import './verificado.css'
import verificadoImg from 'assets/img/verificado/verificado.png'

function Verificado() {
  return (
    <div className="tarjeta">
        <span className="ribbon-1"/>
        <div className="flexbox">            
            <img src={ verificadoImg } alt="verify" style={{ height: '12rem', width: "13rem" }} />
        </div>        
    </div>
  )
}

export default Verificado