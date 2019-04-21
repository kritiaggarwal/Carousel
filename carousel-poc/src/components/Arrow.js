import React from 'react';
import arrow from '../assets/arrow.svg';
import PropTypes from 'prop-types';

const Arrow = ({ direction, clickFunction }) => (
    <div
        role="img"
        aria-label={`${direction} arrow`}
        className={`slide-arrow ${direction}`}
        onClick={clickFunction}>
        <img src={arrow} className={direction} alt={`${direction}`} />
    </div>
);

export default Arrow;

Arrow.propTypes = {
    direction: PropTypes.string.isRequired,   // class name to be attached to button to change styling
    clickFunction: PropTypes.func   // click function to be bound to button element rendered
 };