import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useUserId } from '../../App';





const Home = () => {
  const userId = useUserId();
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/reviews');
        const allReviews = response.data.DATA;
        const reviewsArray = Object.values(allReviews);
        const filteredReviews = reviewsArray.filter(review => review.USER_ID === userId);
        setReviews(filteredReviews);
      } catch (error) {
        console.error('Error fetching reviews:', error);
      }
    };

    fetchData();
  }, [userId]);

  return (
    <div>
      <h1>My Reviews:</h1>
      <ul>
        {reviews.map((review, index) => (
          <li key={index}>
            <h3>{review.Review}</h3>
            <p>Rating: {review.rating}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
