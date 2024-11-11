import { useParams, NavLink, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import clsx from 'clsx';
import styles from '../MovieDetailsPage/MovieDetailsPage.module.css';
import axios from 'axios';

const buildLinkClass = ({ isActive }) => {
  return clsx(styles.link, isActive && styles.active);
};

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const backLink = useRef(location.state?.from || '/movies');
  const [movieData, setMovieData] = useState(null);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}`, {
          headers: {
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmNWM3ZWM4NjAzNjExMTM5ZWEwZGRkNzJhOWVmMTFkOCIsIm5iZiI6MTcyOTQxMjU1MC4yNDUwNDcsInN1YiI6IjY3MTM4OGVjZDViNzkyNmU5NDZmYWFmNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.I8IAmpe-Zn3PzmY7ony2u8l6h7nY0f-a0j_ELoDH_Co',
          },
        });
        setMovieData(response.data);
      } catch (error) {
        if (error.response && error.response.status === 404) {
          navigate('/not-found');
        } else {
          setError('Failed to fetch movie details. Please try again later.');
        }
      }
    };

    fetchMovieDetails();
  }, [movieId, navigate]);

  if (error) return <div>{error}</div>;
  if (!movieData) return <p>Loading...</p>;

  const handleGoBack = () => {
    navigate(backLink.current);
  };

   const defaultImg = 'https://dl-media.viber.com/10/share/2/long/vibes/icon/image/0x0/95e0/5688fdffb84ff8bed4240bcf3ec5ac81ce591d9fa9558a3a968c630eaba195e0.jpg';

  return (
    <div className={styles.blocMovie}>
      <button onClick={handleGoBack}>Go back</button>
      <h1 className={styles.titleMovie}>{movieData.title}</h1>
      <div className={styles.detailsMovie}>
        <img
          className={styles.imgMovie}
          src={movieData.poster_path ? `https://image.tmdb.org/t/p/w500${movieData.poster_path}` : defaultImg}
          alt={movieData.title}
        />
        <div>
          <p><strong>Overview:</strong> {movieData.overview}</p>
          <p><strong>Release Date:</strong> {movieData.release_date}</p>
          <p><strong>Rating:</strong> {movieData.vote_average} / 10</p>
          <p><strong>Genres:</strong> {movieData.genres.map(genre => genre.name).join(', ')}</p>
        </div>
      </div>
      <div className={styles.castReviewsMovie}>
        <ul>
          <li><NavLink to={"cast"} className={buildLinkClass}>Cast</NavLink></li>
          <li><NavLink to={"reviews"} className={buildLinkClass}>Reviews</NavLink></li>
        </ul>
      </div>
      <Outlet context={{ movieId }} />
    </div>
  );
};

export default MovieDetailsPage;