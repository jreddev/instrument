import React, { useEffect } from 'react';
import '../css/Modal.css'; // Import CSS file for modal styles

const Modal = ({ instrument, closeModal }) => {
    // Prevent scrolling on the main page when modal is active
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, []);

    return (
        <div className="modal-container">
            <div className="modal-overlay" onClick={closeModal}></div>
            <div className="modal-content">
                <span className="close" onClick={closeModal}>&times;</span>
                <div className="modal-body">
                    <img src={`images/${instrument.name.toLowerCase()}.png`} alt={instrument.name} className="instrument-image"/>
                    <div className="instrument-details">
                        <h2>{instrument.name}</h2>
                        <p>Type: {instrument.type}</p>
                        <p>Price Range: {instrument.price_range}</p>
                        <p>Average Rent Cost: {instrument.avg_rent_cost}</p>
                        <p>Weight: {instrument.weight}</p>
                        <p>Size: {instrument.size}</p>
                        <p>Hands: {instrument.hands}</p>
                        <p>Groups: {instrument.groups.join(', ')}</p>
                        <p>Genres: {instrument.genres.join(', ')}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Modal;
