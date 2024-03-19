import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import LinkMui from '@mui/material/Link';
import { styled } from '@mui/system';
import logo from '../assets/clef.png';

const LogoImg = styled('img')({
    height: 45, // Adjust the height as needed
    marginRight: '16px', // Adjust margin as needed
});

const TitleLink = styled(Link)(
    ({ theme }) => ({
        flexGrow: 1,
        textDecoration: 'none',
        color: theme.palette.common.white, // Use the default text color
    }),
);

const NavLink = styled(LinkMui)(
    ({ theme, is_current }) => ({
        marginRight: theme.spacing(2),
        textDecoration: 'none',
        color: theme.palette.common.white, // Use the default text color
        transition: 'color 0.3s',
        '&:hover': {
            color: theme.palette.accent.main,
        },
        position: 'relative',
        '&::after': {
            content: '""',
            position: 'absolute',
            left: 0,
            bottom: -4,
            width: '100%',
            borderBottom: `3px solid ${is_current ? theme.palette.accent.main : 'transparent'}`,
            transition: 'border-color 0.3s',
        },
    }),
);

function Header() {
    const location = useLocation();

    return (
        <AppBar position="static">
            <Toolbar>
                <LogoImg src={logo} alt="Logo" />
                <TitleLink to="/">
                    <Typography variant="h6">
                        Musical Instrument Guide
                    </Typography>
                </TitleLink>
                <NavLink>
                    <NavLink component={Link} to="/" is_current={location.pathname === '/'}>
                        Instrument List
                    </NavLink>
                </NavLink>
            </Toolbar>
        </AppBar>
    );
}

export default Header;
