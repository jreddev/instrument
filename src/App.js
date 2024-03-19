import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Header from "./components/Header";

const theme = createTheme({
    palette: {
        primary: {
            main: '#264A66',
            light: '#3F79AB',

        },
        accent: {
            main: '#FFAA00',
            light: '#FFC757',
            greyish: '#E6D0AC',
        },
    },
});

function App() {
    return (
        <ThemeProvider theme={theme}>
            <Router>
                <div>
                    <Header/>
                    <Routes>
                        <Route path="/" element={<Home />} />
                    </Routes>
                </div>
            </Router>
        </ThemeProvider>
    );
}

export default App;
