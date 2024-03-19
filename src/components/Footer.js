import React, { useEffect, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';

function Footer() {
    const [showFooter, setShowFooter] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const isScrolled = window.innerHeight < document.body.scrollHeight;
            setShowFooter(isScrolled);
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll(); // Check initial state
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <AppBar id="footer" position="relative" style={{ top: 'auto', bottom: showFooter ? 0 : -9999 }}>
            <Toolbar>
                {/* Add your footer content here */}
            </Toolbar>
        </AppBar>
    );
}

export default Footer;
