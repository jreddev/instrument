// Card.js
import React from 'react';
import '../css/Card.css';
import {useCurrentInstrumentContext} from "./CurrentInstrumentContext"; // Import the CSS file


const Card = ({ instrument }) => {
    const { setCurrentInstrument } = useCurrentInstrumentContext(); // Consume context to set current instrument

    const toggleModal = () => {
        setCurrentInstrument(instrument)
    };

    return (
        <div className="card-wrapper">
            <div className="card" onClick={toggleModal}>
                <img src={`/instrument/images/${instrument.name.toLowerCase()}.png`} alt={instrument.name} className="instrument-image"/>
                <p>{instrument.name}</p>
            </div>
        </div>
    );
};

export default Card;
