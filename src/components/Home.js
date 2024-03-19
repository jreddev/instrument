import React, { useState } from 'react';
import Card from './Card';
import '../css/Home.css';
import { instrumentsData } from './instruments'; // Assuming instrumentsData is exported from instrument.js

const Home = () => {
    const [filterType, setFilterType] = useState(''); // State to store the filter type

    // Filter function to filter cards based on their type
    const filteredInstruments = instrumentsData.instruments.filter(instrument => {
        if (filterType === '') {
            return true; // If no filter is applied, return all instruments
        } else if (filterType === 'Other') {
            // Return instruments that don't match any other type
            return !['String', 'Brass', 'Woodwind', 'Percussion', 'Keyboard'].includes(instrument.type);
        } else {
            return instrument.type === filterType; // Filter by type
        }
    });

    // Sorting function to sort instruments alphabetically by name
    const sortedInstruments = filteredInstruments.sort((a, b) => a.name.localeCompare(b.name));

    return (
        <div className="home">
            <div className="filter-buttons">
                <button className={!filterType ? 'active' : ''} onClick={() => setFilterType('')}>All</button>
                <button className={filterType === 'String' ? 'active' : ''} onClick={() => setFilterType('String')}>String</button>
                <button className={filterType === 'Brass' ? 'active' : ''} onClick={() => setFilterType('Brass')}>Brass</button>
                <button className={filterType === 'Woodwind' ? 'active' : ''} onClick={() => setFilterType('Woodwind')}>Woodwind</button>
                <button className={filterType === 'Percussion' ? 'active' : ''} onClick={() => setFilterType('Percussion')}>Percussion</button>
                <button className={filterType === 'Keyboard' ? 'active' : ''} onClick={() => setFilterType('Keyboard')}>Keyboards</button>
                <button className={filterType === 'Other' ? 'active' : ''} onClick={() => setFilterType('Other')}>Other</button>
            </div>
            <div className="card-container">
                {sortedInstruments.map((instrument, index) => (
                    <Card key={index} instrument={instrument} />
                ))}
            </div>
        </div>
    );
};

export default Home;
