import React, { useEffect, useState } from 'react';
import propTypes from 'prop-types';
import axios from 'axios';



function AddRestaurantForm({ setError, fetchRestaurants, cancel }) {
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [description, setDescription] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [addedRestaurantId, setAddedRestaurantId] = useState(null); // State variable to store the ID of the added restaurant

  const changeName = (event) => { setName(event.target.value); };
  const changeDescription = (event) => { setDescription(event.target.value); };
  const changeType = (event) => { setType(event.target.value); };
  const changeAddress = (event) => { setAddress(event.target.value); };
  const changeCity = (event) => { setCity(event.target.value); };
  const changeState = (event) => { setState(event.target.value); };
  const changeZipCode = (event) => { setZipCode(event.target.value); };

  const addRestaurant = (event) => {
    event.preventDefault();
    axios.post('http://localhost:8000/restaurants', {
      name: name, 
      restaurant_type: type,
      description: description,
      address: address,
      city: city,
      state: state,
      zip_code: zipCode
    })
    .then((response) => {
      const newRestaurantId = response.data.ID; // Assuming the API response contains the restaurant ID
      setAddedRestaurantId(newRestaurantId); // Set the ID of the added restaurant
      setError('');
      fetchRestaurants();
    })
    .catch((error) => {
      setError(error.response.data.message);
    });
  };


  return (
    <div>
    <form>
      <label htmlFor="name">Name</label>
      <input type="text" id="name" value={name} onChange={changeName}/>
      <label htmlFor="type">type</label>
      <input type="text" id="type" value={type} onChange={changeType}/>
      <label htmlFor="description">Description</label>
      <input type="text" id="description" value={description} onChange={changeDescription}/>
      <label htmlFor="address">Address</label>
      <input type="text" id="address" value={address} onChange={changeAddress}/>
      <label htmlFor="city">City</label>
      <input type="text" id="city" value={city} onChange={changeCity}/>
      <label htmlFor="state">State</label>
      <input type="text" id="state" value={state} onChange={changeState}/>
      <label htmlFor="zipCode">Zip Code</label>
      <input type="text" id="zipCode" value={zipCode} onChange={changeZipCode}/>
      <button type="submit" onClick={addRestaurant}>Submit</button>
      <button type="button" onClick={cancel}>Cancel</button>
    </form>
    <p>Successfully Added. Newest ID:{addedRestaurantId}</p></div> ///prints added id
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
      const restaurantsObject = response.data.DATA;
      const restaurantsArray = Object.values(restaurantsObject);
      setRestaurants(restaurantsArray);
    })
    .catch((error) => {
      console.error(error);
      setError(`Something went wrong: ${error.message}`);
    });
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
      <AddRestaurantForm setError={setError} fetchRestaurants={fetchRestaurants} />
      {restaurants.map((restaurant, index) => (
        <div className="restaurant-container" key={index}>
          <h2>{restaurant.name}</h2>
          <p>{restaurant.description}</p>
          <p>{restaurant.address}</p>
          <p>{restaurant.city}, {restaurant.state} {restaurant.zip_code}</p>
        </div>
      ))}
    </div>
  );
}

export default Restaurants;


