// aux.
import { ProfileRoutes } from '../profile-routes';
// css
import styles from './profile-page-mobile.module.css';

export const ProfilePageMobile = () => {
  // RENDER
  return (
    <div className={styles['profile-page']}>
      <div className={styles['profile-page__content']}>
        <ProfileRoutes />
      </div>
    </div>
  );
};
