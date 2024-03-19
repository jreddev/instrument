import React, { useState } from 'react';
import Card from './Card';
import '../css/Home.css';
import { instrumentsData } from './instruments';
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";

const Home = () => {
    const [selectedClassFilters, setSelectedClassFilters] = useState([]); // State to store selected class filters
    const [selectedSizeFilters, setSelectedSizeFilters] = useState([]); // State to store selected size filters
    const [minPrice, setMinPrice] = useState(''); // State to store minimum price
    const [maxPrice, setMaxPrice] = useState(''); // State to store maximum price
    const [classFiltersVisible, setClassFiltersVisible] = useState(true); // State to track visibility of class filters
    const [sizeFiltersVisible, setSizeFiltersVisible] = useState(true); // State to track visibility of size filters
    const [priceFiltersVisible, setPriceFiltersVisible] = useState(true); // State to track visibility of price filters

    const toggleClassFiltersVisibility = () => {
        setClassFiltersVisible(!classFiltersVisible);
    };

    const toggleSizeFiltersVisibility = () => {
        setSizeFiltersVisible(!sizeFiltersVisible);
    };

    const toggleClassFilter = (filter) => {
        if (selectedClassFilters.includes(filter)) {
            setSelectedClassFilters(selectedClassFilters.filter(item => item !== filter)); // Remove filter if already selected
        } else {
            setSelectedClassFilters([...selectedClassFilters, filter]); // Add filter if not selected
        }
    };

    const toggleSizeFilter = (filter) => {
        if (selectedSizeFilters.includes(filter)) {
            setSelectedSizeFilters(selectedSizeFilters.filter(item => item !== filter)); // Remove filter if already selected
        } else {
            setSelectedSizeFilters([...selectedSizeFilters, filter]); // Add filter if not selected
        }
    };

    const clearAllFilters = () => {
        setSelectedClassFilters([]);
        setSelectedSizeFilters([]);
        setMinPrice('');
        setMaxPrice('');
    };

    const handleMinPriceChange = (event) => {
        setMinPrice(event.target.value);
    };

    const handleMaxPriceChange = (event) => {
        setMaxPrice(event.target.value);
    };

    const filteredInstruments = instrumentsData.instruments.filter(instrument => {
        const classMatch = selectedClassFilters.length === 0 || selectedClassFilters.includes(instrument.type);
        const sizeMatch = selectedSizeFilters.length === 0 || selectedSizeFilters.includes(instrument.size);
        return classMatch && sizeMatch;
    }).filter(instrument => {
        const price = parseFloat(instrument.price_range.split(' - ')[1].replace('$', '').replace(',', ''));
        const min = minPrice !== '' ? parseFloat(minPrice) : 0;
        const max = maxPrice !== '' ? parseFloat(maxPrice) : Infinity;
        return price >= min && price <= max;
    });

    const sortedInstruments = filteredInstruments.sort((a, b) => a.name.localeCompare(b.name));

    return (
        <div className="home">
            <div className='filter-container'>
                <div className="dropdown-header" onClick={toggleClassFiltersVisibility}>
                    <h3>Instrument Class</h3>
                    {classFiltersVisible ? <IoIosArrowDown className="arrow-icon" /> : <IoIosArrowUp className="arrow-icon" />}
                </div>
                {classFiltersVisible && (
                    <div className="filter-group">
                        {['String', 'Brass', 'Woodwind', 'Wind', 'Keyboard', 'Percussion'].map((filter, index) => (
                            <div className="filter" key={index}>
                                <label>
                                    <input
                                        type="checkbox"
                                        checked={selectedClassFilters.includes(filter)}
                                        onChange={() => toggleClassFilter(filter)}
                                    />
                                    {filter}
                                </label>
                            </div>
                        ))}
                    </div>
                )}

                <div className="dropdown-header" onClick={toggleSizeFiltersVisibility}>
                    <h3>Size</h3>
                    {sizeFiltersVisible ? <IoIosArrowDown className="arrow-icon" /> : <IoIosArrowUp className="arrow-icon" />}
                </div>
                {sizeFiltersVisible && (
                    <div className="filter-group">
                        {['Small', 'Medium', 'Large'].map((filter, index) => (
                            <div className="filter" key={index}>
                                <label>
                                    <input
                                        type="checkbox"
                                        checked={selectedSizeFilters.includes(filter)}
                                        onChange={() => toggleSizeFilter(filter)}
                                    />
                                    {filter}
                                </label>
                            </div>
                        ))}
                    </div>
                )}

                <div className="dropdown-header" onClick={() => setPriceFiltersVisible(!priceFiltersVisible)}>
                    <h3>Price</h3>
                    {priceFiltersVisible ? <IoIosArrowDown className="arrow-icon" /> : <IoIosArrowUp className="arrow-icon" />}
                </div>
                {priceFiltersVisible && (
                    <div className="price-inputs">
                        <div className="price-input">
                            <input
                                type="number"
                                placeholder="Min Price"
                                value={minPrice}
                                onChange={handleMinPriceChange}
                            />
                        </div>
                        <div className="price-input">
                            <input
                                type="number"
                                placeholder="Max Price"
                                value={maxPrice}
                                onChange={handleMaxPriceChange}
                            />
                        </div>
                    </div>
                )}

                <button onClick={clearAllFilters} className="clear-filter-btn">Clear All Filters</button>
            </div>
            <div className="content">
                <div className="card-container">
                    {sortedInstruments.map((instrument, index) => (
                        <Card key={index} instrument={instrument} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Home;
