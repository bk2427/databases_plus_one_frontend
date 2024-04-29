import React, { useEffect, useState } from 'react';
import { useUserId } from '../../App';
import { Link } from 'react-router-dom';
import { getReviewsByUserId, getRestaurantById, updateReview, getUserById } from '../../utils'; // Import the functions from utils.js
import './Home.css'; // Import the CSS file

const Home = () => {
  const userId = useUserId();
  const [reviews, setReviews] = useState([]);
  const [userData, setUserData] = useState([]);
  const [restaurantNames, setRestaurantNames] = useState({});
  const [selectedReview, setSelectedReview] = useState(null);
  const [modifiedReview, setModifiedReview] = useState('');
  const [modifiedRating, setModifiedRating] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const reviews = await getReviewsByUserId(userId);
        setReviews(reviews);

        const userData = await getUserById(userId);
        setUserData(userData);

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
    setModifiedReview(review.Review);
    setModifiedRating(review.rating);
  };

  const handleReviewUpdate = async () => {
    try {
      // Ensure the rating is within the range of 0 to 5
      if (modifiedRating < 0 || modifiedRating > 5) {
        console.error('Rating must be between 0 and 5');
        return;
      }
  
      await updateReview(selectedReview.USER_ID, selectedReview.RESTAURANT_ID, modifiedReview, modifiedRating);
      // Refetch reviews data after updating the review
      const updatedReviews = await getReviewsByUserId(userId);
      setReviews(updatedReviews);
      // Clear the selected review state
      setSelectedReview(null);
    } catch (error) {
      console.error('Error updating review:', error);
    }
  };


  return (
    <div>
      <h1>My Profile:</h1>
      <h2>{userData['first name']} {userData['last name']}</h2>
      <h3>{userData.email}</h3>
      <h1>My Reviews:</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Rating</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {reviews.map((review, index) => (
            <tr key={index}>
              <td>{restaurantNames[review.RESTAURANT_ID]}</td>
              <td>{review.Review}</td>
              <td>{review.rating}</td>
              <td>
                <button onClick={() => handleModifyClick(review)}>Modify</button>
                <button><Link to={`/RestInfoPage?ID=${encodeURIComponent(review.RESTAURANT_ID)}`}>View Restaurant</Link></button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {selectedReview && (
        <div className="overlay">
          <div className="popup">
            <h2>Modify Review</h2>
            <label htmlFor="modifiedReview">Review:</label>
            <input
              type="text"
              id="modifiedReview"
              value={modifiedReview}
              onChange={(e) => setModifiedReview(e.target.value)}
            />
            <label htmlFor="modifiedRating">Rating:</label>
            <input
              type="number"
              id="modifiedRating"
              value={modifiedRating}
              min={0}
              max={5}
              onChange={(e) => setModifiedRating(parseInt(e.target.value))}
            />
            <div className="buttons">
              <button onClick={handleReviewUpdate}>Update Review</button>
              <button onClick={() => setSelectedReview(null)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;


