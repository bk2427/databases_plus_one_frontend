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

async function getUserById(userId) {
  try {
    const response = await fetch(`http://127.0.0.1:8000/users`);
    if (!response.ok) {
      throw new Error('Failed to fetch user data');
    }
    const userData = await response.json();
    
    // Find the user data based on the provided user ID
    for (const key in userData.DATA) {
      if (userData.DATA[key]._id === userId) {
        return userData.DATA[key];
      }
    }
    
    // If user with the provided ID is not found
    return null;
  } catch (error) {
    console.error('Error fetching user data:', error);
    return null;
  }
}

const doesReviewExist = async (userId, restaurantId) => {
  try {
    // Fetch the review data from the API
    const response = await axios.get('http://127.0.0.1:8000/reviews');
    const reviewsData = response.data.DATA;

    // Iterate over each review in the reviews data
    for (const reviewKey in reviewsData) {
      const review = reviewsData[reviewKey];
      // Check if the review has matching user and restaurant IDs
      if (review.USER_ID === userId && review.RESTAURANT_ID === restaurantId) {
        return true; // Return true if a matching review is found
      }
    }
    return false; // Return false if no matching review is found
  } catch (error) {
    console.error('Error fetching review data:', error);
    return false; // Return false if an error occurs during fetching
  }
};


export { getRestaurantById, getReviewsByUserId, updateReview, getUserById, doesReviewExist };
