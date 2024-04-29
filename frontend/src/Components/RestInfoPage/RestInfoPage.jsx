import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { useUserId } from '../../App';
import { getReviewsByUserId, getRestaurantById, updateReview, getUserById, doesReviewExist, calculateAverageRating } from '../../utils';

function RestInfoPage() {
  const userId = useUserId();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const ID = searchParams.get('ID');
  const [RestData, setRestData] = useState(null);
  const [review, setReview] = useState('');
  const [rating, setRating] = useState(0);
  const [showForm, setShowForm] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [reviewExists, setReviewExists] = useState(false); // New state to track if review exists
  const [averageRating, setAverageRating] = useState(null);

  useEffect(() => {
    const fetchRestData = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/restaurants');
        const RestData = response.data.DATA;
        const Restaurant = Object.values(RestData).find(Restaurant => Restaurant._id === ID);
        setRestData(Restaurant);
        
        // Check if review exists for the current user and restaurant
        const reviewExists = await doesReviewExist(userId, Restaurant._id);
        setReviewExists(reviewExists);

        //get average rating
        const rating = await calculateAverageRating(Restaurant._id);
        setAverageRating(rating);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    if (ID) {
      fetchRestData();
    }
  }, [ID]);

  const handleSubmitReview = async (event) => {
    event.preventDefault();
    try {
      await axios.post('http://127.0.0.1:8000/reviews', {
        USER_ID: userId,
        RESTAURANT_ID: ID,
        Review: review,
        rating: rating
      });
      // Clear form fields after successful submission
      setReview('');
      setRating(0);
      setShowForm(false);
      setShowSuccessMessage(true);
      setTimeout(() => {
        setShowSuccessMessage(false);
      }, 5000); // Hide success message after 5 seconds
    } catch (error) {
      console.error('Error submitting review:', error);
      alert('Failed to submit review. Please try again later.');
    }
  };

  return (
    <div>
      {RestData ? (
        <div>
          <h2>{RestData.name}</h2>
          <p>{RestData.restaurant_type}</p>
          <p>{RestData.address} {RestData.city}, {RestData.state}</p>
          <p>Average rating: {averageRating}</p>
          {/* Add additional fields as needed */}
          {reviewExists ? (
            <p>Already Reviewed</p> // Display if review exists
          ) : (
            <button onClick={() => setShowForm(true)}>Add Review</button> // Display if review doesn't exist
          )}
          {showForm && (
            <div>
              <h2>Add Review</h2>
              <form onSubmit={handleSubmitReview}>
                <div>
                  <label htmlFor="review">Review:</label>
                  <input
                    type="text"
                    id="review"
                    value={review}
                    onChange={(event) => setReview(event.target.value)}
                  />
                </div>
                <div>
                  <label htmlFor="rating">Rating:</label>
                  <select
                    id="rating"
                    value={rating}
                    onChange={(event) => setRating(parseInt(event.target.value))}
                  >
                    <option value="0">Select Rating</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                  </select>
                </div>
                <button type="submit">Submit Review</button>
              </form>
            </div>
          )}
          {showSuccessMessage && <p>Review submitted successfully!</p>}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default RestInfoPage;
