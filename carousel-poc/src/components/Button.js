import React from 'react';
import PropTypes from 'prop-types';

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

Button.propTypes = {
    direction: PropTypes.string.isRequired, // class name to be attached to button to change styling
    clickFunction: PropTypes.func,  // click function to be bound to button element rendered
    label: PropTypes.string.isRequired, // label to shown inside button
};