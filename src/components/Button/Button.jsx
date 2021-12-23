import React, { useState } from 'react';
import './Button.scss';

const Button = ({ className, title, handleClick, children }) => {
  return (
    <div className='button-container'>
      <button className={`btn ${className}`} onClick={handleClick}>
        {title} {children}
      </button>
    </div>
  );
};

export default Button;
