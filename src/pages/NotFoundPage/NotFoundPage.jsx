import { Link } from 'react-router-dom';
import styles from '../NotFoundPage/NotFoundPage.module.css';

const NotFoundPage = () => {
  return (
    <div className={styles.container}>
      <h1>404 - Page not found</h1>
      <p>
        Sorry, but we could not find this page.
      </p>
      <Link to="/" className={styles.link}>
        Return to the home page
      </Link>
    </div>
  );
};

export default NotFoundPage;