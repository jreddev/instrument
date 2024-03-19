import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Header from "./components/Header";
import './css/App.css'
import Footer from "./components/Footer";

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
    const [isContentScrollable, setContentScrollable] = useState(false);

    useEffect(() => {
        const content = document.querySelector('.content');

        const handleScroll = () => {
            const isScrollable = content.scrollHeight > window.innerHeight;
            setContentScrollable(isScrollable);
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll(); // Check scrollability on initial render

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <ThemeProvider theme={theme}>
            <Router>
                <div>
                    <Header/>
                    <Routes>
                        <Route path="/" element={<Home/>}/>
                    </Routes>
                    <Footer/>
                </div>
            </Router>
        </ThemeProvider>
    );
}

export default App;
