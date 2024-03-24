import React, { createContext, useContext, useState } from 'react';

const CurrentInstrumentContext = createContext();

export const CurrentInstrumentProvider = ({ children }) => {
    const [currentInstrument, setCurrentInstrument] = useState(null);

    return (
        <CurrentInstrumentContext.Provider value={{ currentInstrument, setCurrentInstrument }}>
            {children}
        </CurrentInstrumentContext.Provider>
    );
};

export const useCurrentInstrumentContext = () => useContext(CurrentInstrumentContext);
