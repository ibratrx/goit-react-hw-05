import { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import axios from 'axios';
import styles from './MovieCast.module.css';

const MovieCast = () => {
  const { movieId } = useOutletContext();
  const [cast, setCast] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCast = async () => {
      setLoading(true);
      if (!movieId) return;
      try {
        const response = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}/credits`, {
          headers: {
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmNWM3ZWM4NjAzNjExMTM5ZWEwZGRkNzJhOWVmMTFkOCIsIm5iZiI6MTcyOTQxMjU1MC4yNDUwNDcsInN1YiI6IjY3MTM4OGVjZDViNzkyNmU5NDZmYWFmNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.I8IAmpe-Zn3PzmY7ony2u8l6h7nY0f-a0j_ELoDH_Co',
          },
        });
        setCast(response.data.cast);
      } catch (error) {
        setError('Failed to fetch cast. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchCast();
  }, [movieId]);

  if (error) return <div>{error}</div>;

  const defaultImg = 'https://dl-media.viber.com/10/share/2/long/vibes/icon/image/0x0/95e0/5688fdffb84ff8bed4240bcf3ec5ac81ce591d9fa9558a3a968c630eaba195e0.jpg';

  return (
    <div>
      {loading && <p>Loading...</p>}
      <ul className={styles.castList}>
        {cast.map(actor => (
          <li key={actor.id} className={styles.castItem}> 
            <img
              src={actor.profile_path ? `https://image.tmdb.org/t/p/w500${actor.profile_path}` : defaultImg}
              alt={actor.name}
              className={styles.actorImage}
            />
            <div className={styles.actorItem}>
              <p>{actor.name}</p>
              <p>Role: {actor.character}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieCast;