import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/system';
import logo from '../assets/clef.png';

const LogoImg = styled('img')({
    height: 45, // Adjust the height as needed
    marginRight: '16px', // Adjust margin as needed
});

function Header() {

    return (
        <AppBar position="static">
            <Toolbar>
                <LogoImg src={logo} alt="Logo" />
                <Typography variant="h6">
                    Musical Instrument Guide
                </Typography>
            </Toolbar>
        </AppBar>
    );
}

export default Header;
