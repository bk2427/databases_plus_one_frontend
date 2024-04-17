import React, { useEffect, useState } from 'react';
import { useUserId } from '../../App';
import { Link } from 'react-router-dom';
import { getReviewsByUserId, getRestaurantById, updateReview } from '../../utils'; // Import the functions from utils.js

const Home = () => {
  const userId = useUserId();
  const [reviews, setReviews] = useState([]);
  const [restaurantNames, setRestaurantNames] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const reviews = await getReviewsByUserId(userId); // Use getReviewsByUserId function from utils.js
        setReviews(reviews);

        const restaurantIds = reviews.map(review => review.RESTAURANT_ID);
        const namesPromises = restaurantIds.map(id => getRestaurantById(id)); // Use getRestaurantById function from utils.js
        const resolvedNames = await Promise.all(namesPromises);

        const namesMap = restaurantIds.reduce((acc, id, index) => {
          acc[id] = resolvedNames[index] ? resolvedNames[index].name : 'Restaurant not found';
          return acc;
        }, {});

        setRestaurantNames(namesMap);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [userId]);

  return (
    <div>
      <h1>My Reviews:</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Rating</th>
          </tr>
        </thead>
        <tbody>
          {reviews.map((review, index) => (
            <tr key={index}>
              <td>{restaurantNames[review.RESTAURANT_ID]}</td>
              <td>{review.Review}</td>
              <td>{review.rating}</td>
              <td><button>Modify</button></td>
              <td><button><Link to={`/RestInfoPage?ID=${encodeURIComponent(review.RESTAURANT_ID)}`}>View Restaurant</Link></button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Home;
