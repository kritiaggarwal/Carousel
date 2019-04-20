import React from 'react';

const Button = ({ direction, clickFunction, label }) => (
    <button
        className={`button-class ${direction}`}
        onClick={clickFunction}
        tabIndex='0'
        aria-label={`${label}`}>
        {label}
    </button>
);

export default Button;
