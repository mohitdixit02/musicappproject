import React from 'react'
import {useNavigate} from 'react-router-dom'

function Button() {
  
  let navg =useNavigate();

  return (
    <>
        <div className="bttn_nav">
        <i className="bi bi-chevron-left" onClick={()=>navg(-1)} ></i>
        <i className="bi bi-chevron-right" onClick={()=>navg(+1)} ></i>
        </div>
    </>
  )
}

export default Button
