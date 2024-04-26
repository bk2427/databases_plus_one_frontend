import React, { useEffect, useState } from 'react';
import propTypes from 'prop-types';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Restaurants.css';

const restaurantTypes = ["Bar", "Bakery", "Fast Food", "Restaurant"];

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

  const clearError = () => {
    setError('');
  };

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
    .then(() => {
      setError('');
      fetchRestaurants();
    })
    .catch((error) => {
      if (error.response && error.response.data && error.response.data.message) {
        setError(error.response.data.message);
      } else {
          setError('There was a problem adding a user');
      }
    });
  };


  return (
    <div className="form-container">
      <form>
        <div>
          <label htmlFor="name">Name</label>
          <input type="text" id="name" value={name} onChange={changeName}/>
        </div>
        <div>
          <label htmlFor="type">Type</label>
          <select id="type" value={type} onChange={changeType}>
            <option value="">Select a type</option>
            {restaurantTypes.map((type, index) => (
              <option key={index} value={type}>{type}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="description">Description</label>
          <input type="text" id="description" value={description} onChange={changeDescription}/>
        </div>
        <div>
          <label htmlFor="address">Address</label>
          <input type="text" id="address" value={address} onChange={changeAddress}/>
        </div>
        <div>
          <label htmlFor="city">City</label>
          <input type="text" id="city" value={city} onChange={changeCity}/>
        </div>
        <div>
          <label htmlFor="state">State</label>
          <input type="text" id="state" value={state} onChange={changeState}/>
        </div>
        <div>
          <label htmlFor="zipCode">Zip Code</label>
          <input type="text" id="zipCode" value={zipCode} onChange={changeZipCode}/>
        </div>
        <div>
          <button type="submit" onClick={addRestaurant}>Submit</button>
          <button type="button" onClick={() => {cancel();clearError();}}>Cancel</button>
        </div>
      </form>
    </div>

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
  const [showForm, setShowForm] = useState(false);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);

  const toggleForm = () => {
    setShowForm(!showForm);
  };

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

  const handleRowClick = (restaurant) => {
    setSelectedRestaurant(restaurant);
  };

  return (
    <div className="wrapper">
      <h1>Restaurants</h1>
      {error && (
        <div className="error-message">
          {error}
        </div>
      )}
      <button onClick={toggleForm}>{showForm ? 'Hide Form' : 'Add Restaurant'}</button>
      {showForm && (
        <AddRestaurantForm setError={setError} fetchRestaurants={fetchRestaurants} cancel={toggleForm} />
      )}
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Address</th>
              <th>City</th>
              <th>State</th>
              <th>Zip Code</th>
            </tr>
          </thead>
          <tbody>
            {restaurants.map((restaurant, index) => (
              <tr key={index} onClick={() => handleRowClick(restaurant)}>
                <td>{restaurant.name}</td>
                <td>{restaurant.description}</td>
                <td>{restaurant.address}</td>
                <td>{restaurant.city}</td>
                <td>{restaurant.state}</td>
                <td>{restaurant.zip_code}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {selectedRestaurant && (
          <div className="selected-restaurant-details">
            <h2>{selectedRestaurant.name}</h2>
            <p>Description: {selectedRestaurant.description}</p>
            <p>Address: {selectedRestaurant.address}, {selectedRestaurant.city}, {selectedRestaurant.state} {selectedRestaurant.zip_code}</p>
            <Link to={`/RestInfoPage?ID=${encodeURIComponent(selectedRestaurant._id)}`}>View Details</Link>

          </div>
        )}
      </div>
    </div>
  );
}

export default Restaurants;


