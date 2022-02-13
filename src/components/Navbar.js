import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    const navstyle = {
        color: 'white',
        textDecoration: 'none'
    }

    return (
        <div className='navbar'>
            <h2>SpaceX Launcher</h2>
            <ul className='nav-link'>
                <Link style={navstyle} to="/">
                    <li>Upcoming</li>
                </Link>
                <Link style={navstyle} to="/countdown">
                    <li>Countdown</li>
                </Link>
                <Link style={navstyle} to="/favorites">
                    <li>Favorites</li>
                </Link>
            </ul>
        </div>
    )
}

export default Navbar;