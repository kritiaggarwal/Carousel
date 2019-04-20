import React from 'react';
import arrow from '../assets/arrow.svg';

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
