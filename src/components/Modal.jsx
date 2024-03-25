import React, {useEffect} from 'react';
import '../css/Modal.css';
import { useCurrentInstrumentContext } from './CurrentInstrumentContext';
import { instrumentsData } from "./instruments";

const Modal = ({ instrument, closeModal }) => {
    const { setCurrentInstrument } = useCurrentInstrumentContext(); // Consume context to set current instrument

    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, []);

    const handleSimilarInstrumentClick = (similarInstrumentName) => {
        const similarInstrument = instrumentsData.instruments.find((instrument) => instrument.name === similarInstrumentName);
        setCurrentInstrument(similarInstrument);
    };

    return (
        <div className="modal-container">
            <div className="modal-overlay" onClick={closeModal}></div>
            <div className="modal-content">
                <div className="modal-plus">
                    <div className="modal-inline">
                        <span className="close" onClick={closeModal}>&times;</span>
                        <div className="instrument-header">
                            <h2>{instrument.name}</h2>
                            <div className='modal-circle-image'>
                                <img src={`/instrument/images/${instrument.name.toLowerCase()}.png`}
                                     alt={instrument.name}
                                     className="instrument-image"/>
                            </div>
                        </div>
                        <div className="modal-body">
                            <div className="instrument-details">
                                <h2>Instrument Details</h2>
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
                    <div className="similar-instruments">
                        <h3>Similar Instruments</h3>
                        <div className="similar-cards">
                            {instrument.similar_instruments.map((similarInstrument, index) => (
                                <div className="similar-instrument-wrapper">
                                    <div className="similar-instrument" key={index} onClick={() => handleSimilarInstrumentClick(similarInstrument)}>
                                        <img src={`/instrument/images/${similarInstrument.toLowerCase()}.png`}
                                             alt={similarInstrument} className="similar-instrument-image"/>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Modal;
