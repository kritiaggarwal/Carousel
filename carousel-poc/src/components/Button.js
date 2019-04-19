import React from 'react';

const Button = ({ direction, clickFunction, label }) => (
    <button
        className={`button-class ${direction}`}
        onClick={clickFunction}>
        {label}
    </button>
);

export default Button;
