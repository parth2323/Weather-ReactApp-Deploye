import React from 'react'

const Modal = (open) => {
    if(!open)return null
  return (
    <div className='overlay'>
        <div className="modalContainer">
    Hello, There...
        </div>   
    </div>
  )
}

export default Modal