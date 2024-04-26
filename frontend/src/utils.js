import axios from 'axios';

// Function to search for a restaurant by ID
const getRestaurantById = async (restaurantId) => {
  try {
    const response = await axios.get('http://127.0.0.1:8000/restaurants');
    const allRestaurants = response.data.DATA;
    const restaurant = Object.values(allRestaurants).find(restaurant => restaurant._id === restaurantId);
    return restaurant ? restaurant : null;
  } catch (error) {
    console.error('Error fetching restaurant data:', error);
    throw error;
  }
};

// Function to search all reviews given a user ID
const getReviewsByUserId = async (userId) => {
  try {
    const response = await axios.get('http://127.0.0.1:8000/reviews');
    const allReviews = response.data.DATA;
    return Object.values(allReviews).filter(review => review.USER_ID === userId);
  } catch (error) {
    console.error('Error fetching reviews:', error);
    throw error;
  }
};


const updateReview = async (userId, restaurantId, review, rating) => {
  try {
    const response = await axios.put(`http://localhost:8000/reviews/${userId}/${restaurantId}/${encodeURIComponent(review)}/${rating}`);
    return response.data; // Return the updated review data
  } catch (error) {
    throw error; // Throw error if update fails
  }
};



export { getRestaurantById, getReviewsByUserId, updateReview };
