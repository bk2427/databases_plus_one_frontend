import React from 'react';
import { Link } from 'react-router-dom';

const PAGES = [
    { label: 'Home', destination: '/home' },
    { label: 'Users', destination: '/Users' },
    { label: 'Restaurants', destination: '/Restaurants' },
    { label: 'User Menu', destination: '/MenuData' },
    
];

function Navbar() {

    const mapper = (page) => (
        <li key={page.destination} className={window.location.pathname === page.destination ? 'active' : ''}>
          <Link to={page.destination}>
            {page.label}
          </Link>
        </li>
    );

    return (
        <nav>
            <ul>
                {PAGES.map(mapper)}
            </ul>
        </nav>
    );
}

export default Navbar;