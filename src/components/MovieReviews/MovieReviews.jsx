import { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import axios from 'axios';
import styles from './MovieReviews.module.css';

const MovieReviews = () => {
  const { movieId } = useOutletContext();
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchReviews = async () => {
      setLoading(true);
      if (!movieId) return;
      try {
        const response = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}/reviews`, {
          headers: {
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmNWM3ZWM4NjAzNjExMTM5ZWEwZGRkNzJhOWVmMTFkOCIsIm5iZiI6MTcyOTQxMjU1MC4yNDUwNDcsInN1YiI6IjY3MTM4OGVjZDViNzkyNmU5NDZmYWFmNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.I8IAmpe-Zn3PzmY7ony2u8l6h7nY0f-a0j_ELoDH_Co',
          },
        });
        setReviews(response.data.results);
      } catch (error) {
        setError('Failed to fetch reviews. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [movieId]);

  if (error) return <div>{error}</div>;

  return (
    <div className={styles.reviewBloc}>
      {loading && <p>Loading...</p>}
      {reviews.length === 0 ? (
        <p>We don't have any reviews for this movie</p>
      ) : (
        <ul>
          {reviews.map(review => (
            <li key={review.id} className={styles.reviewItem}>
              <h3>{review.author}</h3>
              <p>{review.content}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MovieReviews;