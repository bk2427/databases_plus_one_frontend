import React from 'react';
import { Link } from 'react-router-dom';

const PAGES = [
    { label: 'Home', destination: '/' },
    { label: 'Users', destination: '/Users' },
    { label: 'Restaurants', destination: '/Restaurants' },
    { label: 'hello', destination: '/Hello' },
];

function Navbar() {

    const mapper = (page) => (
        <li>
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