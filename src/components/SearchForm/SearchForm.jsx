import { useState } from 'react';
import styles from '../SearchForm/SearchForm.module.css';

const SearchForm = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    onSearch(query);
  };

  return (
    <form onSubmit={handleSubmit} className={styles.formSearch}>
      <input
        className={styles.inputSearch}
        name="query"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for movies..."
      />
      <button className={styles.btnSearch} type="submit">
        Search
      </button>
    </form>
  );
};

export default SearchForm;