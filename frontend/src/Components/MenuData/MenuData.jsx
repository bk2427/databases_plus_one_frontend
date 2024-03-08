import React, { useEffect, useState } from 'react';
import propTypes from 'prop-types';
import axios from 'axios';

import { BACKEND_URL } from '../../constants';

const USERMENU_ENDPOINT = `${BACKEND_URL}/user_menu`;


function MenuData() {
    const [error, setError] = useState('');
    const [menuItems, setMenuItems] = useState([]);

    const fetchUserMenu = () => {
        axios.get(USERMENU_ENDPOINT)
        .then((response) => {
            const menuChoices = response.data.Choices; //pulling from choices array
            const keys = Object.keys(menuChoices); //gets keys for each from array
            const menuItemsArray = keys.map((key) => menuChoices[key]); //maps
			setMenuItems(menuItemsArray); //sets into array

        })
        .catch((e) => {
            setError('There was a problem fetching the user menu.');
        });
    };

    useEffect(() => {
        fetchUserMenu();
    }, []);

    return (
        <div className="wrapper">
            <h1>User Menu</h1>
            
            {error && (
                <div className="error-message">
                    {error}
                </div>
            )}
            <div><h2>Options:</h2></div>
            {menuItems.map((menuItem) => (
                <div key={menuItem.text} className="user-container">
                    <p>{menuItem.text}</p>
                </div>
            ))}
        </div>
    );
}

export default MenuData;
