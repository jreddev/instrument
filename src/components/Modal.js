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
                    <img src={`/instrument/images/${instrument.name.toLowerCase()}.png`} alt={instrument.name} className="instrument-image"/>
                    <div className="instrument-details">
                        <h2>{instrument.name}</h2>
                        <p><strong>Instrument Class</strong>: {instrument.type}</p>
                        <p><strong>Price Range</strong>: {instrument.price_range}</p>
                        <p><strong>Average Rent Cost</strong>: {instrument.avg_rent_cost}</p>
                        <p><strong>Weight</strong>: {instrument.weight}</p>
                        <p><strong>Size</strong>: {instrument.size}</p>
                        <p><strong>Minimum Hands Required</strong>: {instrument.hands}</p>
                        <p><strong>Groups</strong>: {instrument.groups.join(', ')}</p>
                        <p><strong>Genres</strong>: {instrument.genres.join(', ')}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Modal;
