import React, { useEffect, useState } from "react";
import propTypes from "prop-types";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Restaurants.css";

const restaurantTypes = ["Bar", "Bakery", "Fast Food", "Restaurant"];

function AddRestaurantForm({ setError, fetchRestaurants, cancel }) {
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [description, setDescription] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [addedRestaurantId, setAddedRestaurantId] = useState(null); // State variable to store the ID of the added restaurant

  const changeName = (event) => {
    setName(event.target.value);
  };
  const changeDescription = (event) => {
    setDescription(event.target.value);
  };
  const changeType = (event) => {
    setType(event.target.value);
  };
  const changeAddress = (event) => {
    setAddress(event.target.value);
  };
  const changeCity = (event) => {
    setCity(event.target.value);
  };
  const changeState = (event) => {
    setState(event.target.value);
  };
  const changeZipCode = (event) => {
    setZipCode(event.target.value);
  };

  const clearError = () => {
    setError("");
  };

  const addRestaurant = (event) => {
    event.preventDefault();
    axios
      .post(
        "https://databases-plus-one-b6341ffdbbfd.herokuapp.com/restaurants",
        {
          name: name,
          restaurant_type: type,
          description: description,
          address: address,
          city: city,
          state: state,
          zip_code: zipCode,
        }
      )
      .then(() => {
        setError("");
        fetchRestaurants();
      })
      .catch((error) => {
        if (
          error.response &&
          error.response.data &&
          error.response.data.message
        ) {
          setError(error.response.data.message);
        } else {
          setError("There was a problem adding a user");
        }
      });
  };

  return (
    <div className="form-container">
      <form>
        <div>
          <label htmlFor="name">Name</label>
          <input type="text" id="name" value={name} onChange={changeName} />
        </div>
        <div>
          <label htmlFor="type">Type</label>
          <select id="type" value={type} onChange={changeType}>
            <option value="">Select a type</option>
            {restaurantTypes.map((type, index) => (
              <option key={index} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="description">Description</label>
          <input
            type="text"
            id="description"
            value={description}
            onChange={changeDescription}
          />
        </div>
        <div>
          <label htmlFor="address">Address</label>
          <input
            type="text"
            id="address"
            value={address}
            onChange={changeAddress}
          />
        </div>
        <div>
          <label htmlFor="city">City</label>
          <input type="text" id="city" value={city} onChange={changeCity} />
        </div>
        <div>
          <label htmlFor="state">State</label>
          <input type="text" id="state" value={state} onChange={changeState} />
        </div>
        <div>
          <label htmlFor="zipCode">Zip Code</label>
          <input
            type="text"
            id="zipCode"
            value={zipCode}
            onChange={changeZipCode}
          />
        </div>
        <div>
          <button type="submit" onClick={addRestaurant}>
            Submit
          </button>
          <button
            type="button"
            onClick={() => {
              cancel();
              clearError();
            }}
          >
            Cancel
          </button>
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

const filterRestaurantsByType = (
  restaurantType,
  setFilteredRestaurants,
  setError
) => {
  // Ensure restaurantType is provided
  if (!restaurantType) {
    setError("Please provide a restaurant type for filtering.");
    return;
  }

  // Make a GET request to your Flask backend's search endpoint
  axios
    .get(
      `https://databases-plus-one-b6341ffdbbfd.herokuapp.com/restaurants/search?restaurant_type=${encodeURIComponent(
        restaurantType
      )}`
    )
    .then((response) => {
      const { DATA } = response.data;
      setFilteredRestaurants(DATA); // Update state with filtered restaurants
    })
    .catch((error) => {
      console.error("Error filtering restaurants:", error);
      setError("Error filtering restaurants. Please try again.");
    });
};

function FilterByTypeForm({
  setError,
  setFilteredRestaurants,
  filteredRestaurants,
}) {
  const [selectedType, setSelectedType] = useState("");

  const handleTypeChange = (event) => {
    setSelectedType(event.target.value);
  };

  const handleFilterByType = () => {
    filterRestaurantsByType(selectedType, setFilteredRestaurants, setError);
  };

  return (
    <div className="form-container">
      <h2>Filter</h2>
      {/* Select input for restaurant type */}
      <select value={selectedType} onChange={handleTypeChange}>
        <option value="">Select a type</option>
        {restaurantTypes.map((type, index) => (
          <option key={index} value={type}>
            {type}
          </option>
        ))}
      </select>
      {/* Button to apply filter */}
      <button onClick={handleFilterByType}>Filter</button>
      {/* Display filtered restaurants */}
      <div>
        <h2>Filtered Restaurants:</h2>
        {filteredRestaurants.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Type</th>
                <th>Description</th>
                <th>Location</th>
              </tr>
            </thead>
            <tbody>
              {filteredRestaurants.map((restaurant, index) => (
                <tr key={index}>
                  <td>{restaurant.name}</td>
                  <td>{restaurant.restaurant_type}</td>
                  <td>{restaurant.description}</td>
                  <td>
                    {restaurant.city}, {restaurant.state}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No restaurants found for the selected type.</p>
        )}
      </div>
    </div>
  );
}

FilterByTypeForm.propTypes = {
  setError: propTypes.func.isRequired,
  setFilteredRestaurants: propTypes.func.isRequired,
  filteredRestaurants: propTypes.array.isRequired, // Ensure this is an array
  filterRestaurants: propTypes.func.isRequired,
};

function Restaurants() {
  const [error, setError] = useState("");
  const [restaurants, setRestaurants] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [searchingByState, setSearchingByState] = useState(false);
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  const [searchingByType, setSearchingByType] = useState(false);

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  const fetchRestaurants = () => {
    axios
      .get("https://databases-plus-one-b6341ffdbbfd.herokuapp.com/restaurants")
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

  useEffect(() => {
    fetchRestaurants();
  }, []);

  const handleRowClick = (restaurant) => {
    setSelectedRestaurant(restaurant);
  };

  const handleSearchByState = () => {
    setSearchingByState(true);
    setSearchingByType(false); // Ensure search by type is disabled
    setFilteredRestaurants([]);
  };

  const handleSearchByType = () => {
    setSearchingByType(true);
    setSearchingByState(false); // Ensure search by state is disabled
    setFilteredRestaurants([]);
  };

  const handleShowAll = () => {
    setFilteredRestaurants([]); // Clear filtered results
    setSearchingByState(false); // Ensure search by state is not active
    setSearchingByType(false); // Ensure search by type is not active
    setShowForm(false); // Hide the Add Restaurant form
  };

  return (
    <div className="wrapper">
      <h1>Restaurants</h1>
      {error && <div className="error-message">{error}</div>}
      <button onClick={toggleForm}>
        {showForm ? "Hide Form" : "Add Restaurant"}
      </button>
      <button onClick={searchingByState ? handleShowAll : handleSearchByState}>
        {searchingByState ? "Show all Restaurants" : "Search by State"}
      </button>
      <button onClick={searchingByType ? handleShowAll : handleSearchByType}>
        {searchingByType ? "Show all Restaurants" : "Search by Type"}
      </button>
      {showForm && (
        <AddRestaurantForm
          setError={setError}
          fetchRestaurants={fetchRestaurants}
          cancel={toggleForm}
        />
      )}
      {searchingByState ? (
        <FormWrapper setFilteredRestaurants={setFilteredRestaurants} />
      ) : (
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Type</th>
                <th>Description</th>
                <th>Location</th>
              </tr>
            </thead>
            <tbody>
              {(searchingByState ? filteredRestaurants : restaurants).map(
                (restaurant, index) => (
                  <tr key={index} onClick={() => handleRowClick(restaurant)}>
                    <td>{restaurant.name}</td>
                    <td>{restaurant.restaurant_type}</td>
                    <td>{restaurant.description}</td>
                    <td>
                      {restaurant.city}, {restaurant.state}
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
          {selectedRestaurant && (
            <div className="selected-restaurant-details">
              <h2>{selectedRestaurant.name}</h2>
              <p>Description: {selectedRestaurant.description}</p>
              <p>
                Address: {selectedRestaurant.address}, {selectedRestaurant.city}
                , {selectedRestaurant.state} {selectedRestaurant.zip_code}
              </p>
              <Link
                to={`/RestInfoPage?ID=${encodeURIComponent(
                  selectedRestaurant._id
                )}`}
              >
                View Details
              </Link>
            </div>
          )}
        </div>
      )}

      {searchingByType ? (
        <FilterByTypeForm
          setError={setError}
          setFilteredRestaurants={setFilteredRestaurants}
          filteredRestaurants={filteredRestaurants} // Pass filteredRestaurants as prop
          filterRestaurants={filterRestaurantsByType}
        />
      ) : (
        <div className="table-container" type="weird">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Type</th>
                <th>Description</th>
                <th>Location</th>
              </tr>
            </thead>
            <tbody>
              {(searchingByType ? filteredRestaurants : restaurants).map(
                (restaurant, index) => (
                  <tr key={index} onClick={() => handleRowClick(restaurant)}>
                    <td>{restaurant.name}</td>
                    <td>{restaurant.restaurant_type}</td>
                    <td>{restaurant.description}</td>
                    <td>
                      {restaurant.city}, {restaurant.state}
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
          {selectedRestaurant && (
            <div className="selected-restaurant-details">
              <h2>{selectedRestaurant.name}</h2>
              <p>Description: {selectedRestaurant.description}</p>
              <p>
                Address: {selectedRestaurant.address}, {selectedRestaurant.city}
                , {selectedRestaurant.state} {selectedRestaurant.zip_code}
              </p>
              <Link
                to={`/RestInfoPage?ID=${encodeURIComponent(
                  selectedRestaurant._id
                )}`}
              >
                View Details
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function fieldsToAnswers(fields) {
  const answer = {};
  fields.forEach(({ fld_nm }) => {
    answer[fld_nm] = "";
  });
  return answer;
}

function Form({ fields, handleSubmit }) {
  const [answer, setAnswers] = useState(fieldsToAnswers(fields));

  const answerQuestion = (fld_nm, value) => {
    answer[fld_nm] = value;
    setAnswers({ ...answer });
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit(answer);
      }}
    >
      {fields.map(({ fld_nm, type }) => (
        <div>
          <label>Search State</label>
          <input
            key={fld_nm}
            type={type}
            onChange={(e) => answerQuestion(fld_nm, e.target.value)}
          />
        </div>
      ))}
      <button type="submit">Submit</button>
    </form>
  );
}

Form.propTypes = {
  fields: propTypes.arrayOf(
    propTypes.shape({
      fieldName: propTypes.string,
      type: propTypes.string,
    })
  ).isRequired,
  handleSubmit: propTypes.func.isRequired,
};

function FormWrapper() {
  const [fields, setFields] = useState([]);
  const [restaurants, setRestaurants] = useState([]);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  // Fetch the form data from the backend
  useEffect(() => {
    fetch(
      "https://databases-plus-one-b6341ffdbbfd.herokuapp.com/restaurants/state"
    )
      .then((response) => response.json())
      .then((data) => {
        setFields(data);
      })
      .catch((error) => {
        console.error("Error fetching form data:", error);
      });
  }, []);

  // Handle form submission
  const handleSubmit = (answers) => {
    setHasSubmitted(true); // Set the form submission state to true
    // Send a GET request to /restaurants with the state as a query parameter
    fetch(
      `https://databases-plus-one-b6341ffdbbfd.herokuapp.com/restaurants?state=${encodeURIComponent(
        answers.state
      )}`
    )
      .then((response) => response.json())
      .then((data) => {
        // Store the list of restaurants in state
        const restaurantsObject = data.DATA;
        const restaurantsArray = Object.values(restaurantsObject);
        setRestaurants(restaurantsArray);
      })
      .catch((error) => {
        console.error("Error fetching restaurants:", error);
      });
  };

  // Render the form and the list of restaurants
  return (
    <div>
      {fields.length > 0 ? (
        <Form fields={fields} handleSubmit={handleSubmit} />
      ) : (
        <p>Loading form...</p>
      )}
      {/* Display the list of restaurants */}
      <div>
        <h2>Restaurants:</h2>
        {restaurants.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Type</th>
                <th>Description</th>
                <th>Location</th>
              </tr>
            </thead>
            <tbody>
              {restaurants.map((restaurant, index) => (
                <tr key={index}>
                  <td>{restaurant.name}</td>
                  <td>{restaurant.restaurant_type}</td>
                  <td>{restaurant.description}</td>
                  <td>
                    {restaurant.city}, {restaurant.state}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          hasSubmitted && <p>No restaurants found in the specified state.</p>
        )}
      </div>
    </div>
  );
}

export default Restaurants;
