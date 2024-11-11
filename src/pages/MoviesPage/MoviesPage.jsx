import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import MovieList from '../../components/MovieList/MovieList';
import SearchForm from '../../components/SearchForm/SearchForm';
import axios from 'axios';

const MoviesPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [movies, setMovies] = useState([]);
  const query = searchParams.get('query') || '';
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [searchPerformed, setSearchPerformed] = useState(false);

  useEffect(() => {
    if (!query) return;

    const fetchMovies = async () => {
      setLoading(true);
      setSearchPerformed(true);
      try {
        const response = await axios.get(`https://api.themoviedb.org/3/search/movie?query=${query}`, {
          headers: {
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmNWM3ZWM4NjAzNjExMTM5ZWEwZGRkNzJhOWVmMTFkOCIsIm5iZiI6MTcyOTQxMjU1MC4yNDUwNDcsInN1YiI6IjY3MTM4OGVjZDViNzkyNmU5NDZmYWFmNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.I8IAmpe-Zn3PzmY7ony2u8l6h7nY0f-a0j_ELoDH_Co', // Use your token
          },
        });
        setMovies(response.data.results);
      } catch (error) {
        setError('Failed to fetch movies. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [query]);

  if (error) return <div>{error}</div>;

  const handleSearch = (value) => {
    setSearchParams({ query: value });
    setMovies([]);
    setError(null);
    setSearchPerformed(false);
  };

  return (
    <div>
      <SearchForm onSearch={handleSearch} />
      {loading && <p>Loading...</p>}
      {!loading && searchPerformed && movies.length === 0 && <p>We don't have any movies with that name</p>}
      {!loading && movies.length > 0 && <MovieList movies={movies} />}
    </div>
  );
};

export default MoviesPage;