// components
import { NotFound } from 'components/base';
// css
import styles from './profile-page-not-found.module.css';

// COMPONENT
export const ProfilePageNotFound = () => {
  // RENDER
  return (
    <NotFound className={styles['profile-page__not-found']} />
  );
};
