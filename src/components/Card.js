// Card.js
import React, { useState } from 'react';
import Modal from './Modal';
import '../css/Card.css'; // Import the CSS file

const Card = ({ instrument }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleModal = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="card-wrapper">
            <div className="card" onClick={toggleModal}>
                <img src={`images/${instrument.name.toLowerCase()}.png`} alt={instrument.name} />
                <p>{instrument.name}</p>
            </div>
            {isOpen && <Modal instrument={instrument} closeModal={toggleModal} />}
        </div>
    );
};

export default Card;
