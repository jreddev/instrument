import React, { useState } from 'react';
import Modal from './Modal';
import Card from './Card';
import '../css/Home.css';
import { instrumentsData } from './instruments';
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import TextField from '@mui/material/TextField';
import { useCurrentInstrumentContext } from './CurrentInstrumentContext';


const Home = () => {
    const [selectedClassFilters, setSelectedClassFilters] = useState([]); // State to store selected class filters
    const [selectedSizeFilters, setSelectedSizeFilters] = useState([]); // State to store selected size filters
    const [selectedGroupFilters, setSelectedGroupFilters] = useState([]);
    const [minPrice, setMinPrice] = useState(''); // State to store minimum price
    const [maxPrice, setMaxPrice] = useState(''); // State to store maximum price
    const [classFiltersVisible, setClassFiltersVisible] = useState(true); // State to track visibility of class filters
    const [sizeFiltersVisible, setSizeFiltersVisible] = useState(true); // State to track visibility of size filters
    const [groupFiltersVisible, setGroupFiltersVisible] = useState(true);
    const [priceFiltersVisible, setPriceFiltersVisible] = useState(true); // State to track visibility of price filters
    const [isHovered, setIsHovered] = useState(false);
    const {setCurrentInstrument, currentInstrument } = useCurrentInstrumentContext();
    const [sortBy, setSortBy] = useState("name");

    const handleHover = (value) => {
        setIsHovered(value);
    };

    const toggleClassFiltersVisibility = () => {
        setClassFiltersVisible(!classFiltersVisible);
    };

    const toggleSizeFiltersVisibility = () => {
        setSizeFiltersVisible(!sizeFiltersVisible);
    };

    const toggleGroupFiltersVisibility = () => {
        setGroupFiltersVisible(!groupFiltersVisible);
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

    const toggleGroupFilter = (filter) => {
        if (selectedGroupFilters.includes(filter)) {
            setSelectedGroupFilters(selectedGroupFilters.filter(item => item !== filter));
        } else {
            setSelectedGroupFilters([...selectedGroupFilters, filter]);
        }
    };

    const clearAllFilters = () => {
        setSelectedClassFilters([]);
        setSelectedSizeFilters([]);
        setSelectedGroupFilters([]);
        setMinPrice('');
        setMaxPrice('');
    };

    const handleMinPriceChange = (event) => {
        setMinPrice(event.target.value);
    };

    const handleMaxPriceChange = (event) => {
        setMaxPrice(event.target.value);
    };

    const openModal = (instrument) => {
        setCurrentInstrument(instrument);
    };

    const closeModal = () => {
        setCurrentInstrument(null);
    };

    const filteredInstruments = instrumentsData.instruments.filter(instrument => {
        const classMatch = selectedClassFilters.length === 0 || selectedClassFilters.includes(instrument.type);
        const sizeMatch = selectedSizeFilters.length === 0 || selectedSizeFilters.includes(instrument.size);
        const groupMatch = selectedGroupFilters.length === 0 || selectedGroupFilters.some(group => instrument.groups.includes(group));
        return classMatch && sizeMatch && groupMatch;
    }).filter(instrument => {
        const price = parseFloat(instrument.price_range.split(' - ')[1].replace('$', '').replace(',', ''));
        const min = minPrice !== '' ? parseFloat(minPrice) : 0;
        const max = maxPrice !== '' ? parseFloat(maxPrice) : Infinity;
        return price >= min && price <= max;
    });

    const sortInstruments = (instruments, sortBy) => {
        switch (sortBy) {
            case 'name':
                return instruments.sort((a, b) => a.name.localeCompare(b.name));
            case 'priceLowToHigh':
                return instruments.sort((a, b) => a.avg_price - b.avg_price);
            case 'priceHighToLow':
                return instruments.sort((a, b) => b.avg_price - a.avg_price);
            case 'size':
                return instruments.sort((a, b) => a.weight - b.weight);
            default:
                return instruments;
        }
    }

    const sortedInstruments = filteredInstruments.sort((a, b) => a.name.localeCompare(b.name));

    return (
        <div className="home">
            <div className='filter-container'>
                <h3>Instrument Filters</h3>
                <div className="dropdown-header" onClick={toggleClassFiltersVisibility}>
                    <h4>Class</h4>
                    {classFiltersVisible ? <IoIosArrowDown className="arrow-icon" /> : <IoIosArrowUp className="arrow-icon" />}
                </div>
                {classFiltersVisible && (
                    <div className={`filter-group ${isHovered ? 'hovered' : ''}`} onMouseEnter={() => handleHover(true)} onMouseLeave={() => handleHover(false)}>
                        {['String', 'Brass', 'Woodwind', 'Wind', 'Keyboard', 'Percussion'].map((filter, index) => (
                            <div className="filter" key={index}>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={selectedClassFilters.includes(filter)}
                                            onChange={() => toggleClassFilter(filter)}
                                            color="primary" // Specify the color here
                                        />
                                    }
                                    label={filter}
                                />
                            </div>
                        ))}
                    </div>
                )}

                <div className="dropdown-header" onClick={toggleSizeFiltersVisibility}>
                    <h4>Size</h4>
                    {sizeFiltersVisible ? <IoIosArrowDown className="arrow-icon" /> : <IoIosArrowUp className="arrow-icon" />}
                </div>
                {sizeFiltersVisible && (
                    <div className={`filter-group ${isHovered ? 'hovered' : ''}`} onMouseEnter={() => handleHover(true)} onMouseLeave={() => handleHover(false)}>
                        {['Small', 'Medium', 'Large'].map((filter, index) => (
                            <div className="filter" key={index}>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={selectedSizeFilters.includes(filter)}
                                            onChange={() => toggleSizeFilter(filter)}
                                            color="primary"
                                        />
                                    }
                                    label={filter}
                                />
                            </div>
                        ))}
                    </div>
                )}

                <div className="dropdown-header" onClick={toggleGroupFiltersVisibility}>
                    <h4>Groups</h4>
                    {groupFiltersVisible ? <IoIosArrowDown className="arrow-icon" /> : <IoIosArrowUp className="arrow-icon" />}
                </div>
                {groupFiltersVisible && (
                    <div className={`filter-group ${isHovered ? 'hovered' : ''}`} onMouseEnter={() => handleHover(true)} onMouseLeave={() => handleHover(false)}>
                        {['Solo', 'Orchestra', 'Concert Band', 'Marching Band', 'Rock Band', 'Jazz Ensemble'].map((filter, index) => (
                            <div className="filter" key={index}>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={selectedGroupFilters.includes(filter)}
                                            onChange={() => toggleGroupFilter(filter)}
                                            color="primary"
                                        />
                                    }
                                    label={filter}
                                />
                            </div>
                        ))}
                    </div>
                )}

                <div className="dropdown-header" onClick={() => setPriceFiltersVisible(!priceFiltersVisible)}>
                    <h4>Price</h4>
                    {priceFiltersVisible ? <IoIosArrowDown className="arrow-icon" /> : <IoIosArrowUp className="arrow-icon" />}
                </div>
                {priceFiltersVisible && (
                    <div className="price-inputs">
                        <div className="price-input">
                            <TextField
                                type="number"
                                label="Min Price"
                                variant="standard"
                                value={minPrice}
                                onChange={handleMinPriceChange}
                                InputLabelProps={{
                                    style: {
                                        display: "flex",
                                        fontSize: 12,
                                        alignItems: 'center',
                                        height: '20px', // Adjust the line height to match the height of the TextField
                                    },
                                }}
                                InputProps={{
                                    style: {
                                        height: '25px', // Adjust the height as needed
                                    },
                                }}
                            />
                        </div>
                        <div className="price-input">
                            <TextField
                                type="number"
                                label="Max Price"
                                variant="standard"
                                value={maxPrice}
                                onChange={handleMaxPriceChange}
                                InputLabelProps={{
                                    style: {
                                        display: "flex",
                                        fontSize: 12,
                                        alignItems: 'center',
                                        height: '20px', // Adjust the line height to match the height of the TextField
                                    },
                                }}
                                InputProps={{
                                    style: {
                                        height: '25px', // Adjust the height as needed
                                    },
                                }}
                            />
                        </div>
                    </div>
                )}

                <button onClick={clearAllFilters} className="clear-filter-btn">Clear All Filters</button>
            </div>
            <div className="content">
                <div className="card-container">
                    {sortedInstruments.map((instrument, index) => (
                        <Card key={index} instrument={instrument} openModal={openModal} />
                    ))}
                </div>
            </div>
            <div className="modal-stuffs">
                {currentInstrument && (
                    <Modal
                        instrument={currentInstrument}
                        closeModal={closeModal}
                    />
                )}
            </div>
        </div>
    );
};

export default Home;
