import React, { useEffect, useState } from "react";
import propTypes from "prop-types";
import "./Restaurants.css";

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

export default function FormWrapper() {
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
                <th>Description</th>
                <th>Address</th>
                <th>City</th>
                <th>State</th>
                <th>ZIP Code</th>
              </tr>
            </thead>
            <tbody>
              {restaurants.map((restaurant, index) => (
                <tr key={index}>
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
        ) : (
          hasSubmitted && <p>No restaurants found in the specified state.</p>
        )}
      </div>
    </div>
  );
}
