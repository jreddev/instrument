import React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Header from "./components/Header";
import './css/App.css'
import Footer from "./components/Footer";
import Home from "./components/Home";

const theme = createTheme({
    palette: {
        primary: {
            main: '#602020',
            light: '#882e2e',
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
            <div className="app-wrapper">
                <Header/>
                <Home/>
                <Footer/>
            </div>
        </ThemeProvider>
    );
}

export default App;
