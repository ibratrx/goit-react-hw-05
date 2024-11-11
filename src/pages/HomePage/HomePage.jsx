import { useEffect, useState } from 'react';
import MovieList from '../../components/MovieList/MovieList';
import styles from '../HomePage/HomePage.module.css';
import axios from 'axios';

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchTrendingMovies = async () => {
      setLoading(true);
      try {
        const response = await axios.get('https://api.themoviedb.org/3/trending/movie/week?language=en-US', {
          headers: {
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmNWM3ZWM4NjAzNjExMTM5ZWEwZGRkNzJhOWVmMTFkOCIsIm5iZiI6MTcyOTQxMjU1MC4yNDUwNDcsInN1YiI6IjY3MTM4OGVjZDViNzkyNmU5NDZmYWFmNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.I8IAmpe-Zn3PzmY7ony2u8l6h7nY0f-a0j_ELoDH_Co'
          }
        });
        setMovies(response.data.results);
      } catch (error) {
        setError('Failed to fetch movies. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchTrendingMovies();
  }, []);

  if (error) return <div>{error}</div>;

  return (
    <>
      {loading && <p>Loading...</p>}
      {!error && <h2 className={styles.title}>Trends of the week</h2>}
      <MovieList movies={movies} />
    </>
  );
};

export default HomePage;