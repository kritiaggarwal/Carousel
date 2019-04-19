import React from 'react';
import arrow from '../assets/arrow.svg';

const Arrow = ({ direction, clickFunction }) => (
    <div
        className={`slide-arrow ${direction}`}
        onClick={clickFunction}>
        <img src={arrow} className={direction} alt="arrow" />
    </div>
);

export default Arrow;
