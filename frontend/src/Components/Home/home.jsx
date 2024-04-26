import React, { useEffect, useState } from 'react';
import { useUserId } from '../../App';
import { Link } from 'react-router-dom';
import { getReviewsByUserId, getRestaurantById, updateReview } from '../../utils'; // Import the functions from utils.js

const ModifyReviewForm = ({ review, onUpdate }) => {
  const [modifiedReview, setModifiedReview] = useState(review.Review);
  const [modifiedRating, setModifiedRating] = useState(review.rating);

  const handleReviewChange = (event) => {
    setModifiedReview(event.target.value);
  };

  const handleRatingChange = (event) => {
    setModifiedRating(parseInt(event.target.value));
  };

  const handleSubmit = async () => {
    try {
      await updateReview(review._id, review.USER_ID, review.RESTAURANT_ID, modifiedReview, modifiedRating);
      onUpdate();
    } catch (error) {
      console.error('Error updating review:', error);
    }
  };

  return (
    <div>
      <h2>Modify Review</h2>
      <label htmlFor="modifiedReview">Review:</label>
      <textarea id="modifiedReview" value={modifiedReview} onChange={handleReviewChange} />
      <label htmlFor="modifiedRating">Rating:</label>
      <input type="number" id="modifiedRating" value={modifiedRating} onChange={handleRatingChange} />
      <button onClick={handleSubmit}>Update</button>
    </div>
  );
};

const Home = () => {
  const userId = useUserId();
  const [reviews, setReviews] = useState([]);
  const [restaurantNames, setRestaurantNames] = useState({});
  const [selectedReview, setSelectedReview] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const reviews = await getReviewsByUserId(userId);
        setReviews(reviews);

        const restaurantIds = reviews.map(review => review.RESTAURANT_ID);
        const namesPromises = restaurantIds.map(id => getRestaurantById(id));
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

  const handleModifyClick = (review) => {
    setSelectedReview(review);
  };

  const handleCloseForm = () => {
    setSelectedReview(null);
  };

  const handleReviewUpdate = async () => {
    await handleCloseForm();
    // Optionally, refetch reviews or update the state as needed
  };

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
              <td><button onClick={() => handleModifyClick(review)}>Modify</button></td>
              <td><button><Link to={`/RestInfoPage?ID=${encodeURIComponent(review.RESTAURANT_ID)}`}>View Restaurant</Link></button></td>
            </tr>
          ))}
        </tbody>
      </table>
      {selectedReview && (
        <ModifyReviewForm
          review={selectedReview}
          onUpdate={handleReviewUpdate}
        />
      )}
    </div>
  );
};

export default Home;

