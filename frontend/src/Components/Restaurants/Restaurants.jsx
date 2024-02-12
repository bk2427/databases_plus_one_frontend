import React, { useEffect, useState } from 'react';
import propTypes from 'prop-types';
import axios from 'axios';

function AddRestaurantForm({ setError, fetchRestaurants, cancel, visible }) {
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');

  const changeName = (event) => { setName(event.target.value); };
  const changeLocation = (event) => { setLocation(event.target.value); };

  const addRestaurant = (event) => {
    event.preventDefault();
    axios.post('http://localhost:8000/restaurants', { name: name, location: location })
    .then(() => {
      setError('');
      fetchRestaurants();
    })
    .catch((error) => {
      setError(error.response.data.message);
    });
  };

  return (
    <form>
      <label htmlFor="name">Name</label>
      <input type="text" id="name" value={name} onChange={changeName}/>
      <label htmlFor="location">Location</label>
      <input type="text" id="location" value={location} onChange={changeLocation}/>
      <button type="submit" onClick={addRestaurant}>Submit</button>
      <button type="button" onClick={cancel}>Cancel</button>
    </form>
  );
}

AddRestaurantForm.propTypes = {
  visible: propTypes.bool.isRequired,
  cancel: propTypes.func.isRequired,
  fetchRestaurants: propTypes.func.isRequired,
  setError: propTypes.func.isRequired,
};

function Restaurants() {
  const [error, setError] = useState('');
  const [restaurants, setRestaurants] = useState([]);

  const fetchRestaurants = () => {
    axios.get('http://localhost:8000/restaurants')
    .then((response) => {
      const restaurantsObject = response.data.Data;
      const keys = Object.keys(restaurantsObject);
      const restaurantsArray = keys.map((key) => restaurantsObject[key]);
      setRestaurants(restaurantsArray);
      console.log(response);
    })
    .catch(() => { setError('Something went wrong'); });
  };

  useEffect(
    fetchRestaurants,
    [],
  );

  return (
  <div className="wrapper">
    <h1>Restaurants</h1>
    {error && (
      <div className="error-message">
      {error}
      </div>
    )}
    <AddRestaurantForm setError={setError} fetchRestaurants={fetchRestaurants}/>
    {restaurants.map((restaurant) => (
      <div className="restaurant-container">
        <h2>{restaurant.name}</h2>
        <p>{restaurant.location}</p>
      </div>
    ))}
  </div>
  );
}

export default Restaurants;
