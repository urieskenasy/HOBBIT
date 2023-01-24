import React from 'react'

function Blob() {
  return (
    <svg id="sw-js-blob-svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" version="1.1">
        <defs> 
            <linearGradient id="sw-gradient" x1="0" x2="1" y1="1" y2="0">
                <stop id="stop1" stop-color="rgba(118, 167, 140, 1)" offset="0%"></stop>
                <stop id="stop2" stop-color="rgba(255, 255, 255, 1)" offset="100%"></stop>
            </linearGradient>
        </defs>
    <path fill="none" d="M26.4,-25.3C32.2,-20.6,33.5,-10.3,32.9,-0.7C32.2,9,29.6,18,23.8,25.8C18,33.5,9,40.1,-0.2,40.3C-9.3,40.4,-18.6,34.2,-26.4,26.4C-34.1,18.6,-40.3,9.3,-41.5,-1.2C-42.7,-11.7,-38.9,-23.5,-31.2,-28.2C-23.5,-32.9,-11.7,-30.7,-0.7,-29.9C10.3,-29.2,20.6,-30,26.4,-25.3Z" width="100%" height="100%" transform="translate(50 50)" stroke-width="1" style="transition: all 0.3s ease 0s;" stroke="rgba(118, 167, 140, 1)"></path>
    </svg>
  )
}

export default Blob