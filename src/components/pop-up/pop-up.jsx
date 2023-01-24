import React from 'react'

import './pop-up.styles.scss'

function PopUp({ toggle, content }) {
  return (
    <>
        <div className={ toggle ? 'dark' : null }></div>
        <div className='modal-one'>
            <div className='modal-content'>
                <span className='close' onClick={toggle}>x</span>
                <div>{content}</div>
            </div>
        </div>
    </>
  )
}

export default PopUp