import React from 'react';
import './button.scss';

function Button({ name, onClick, className }) {
  return (
    <button onClick={onClick} className={`btn ${className}`}>
      {name}
    </button>
  );
}

export default Button;
