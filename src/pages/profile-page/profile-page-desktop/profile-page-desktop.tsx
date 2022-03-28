// aux.
import { ProfileRoutes } from '../profile-routes';
import { ProfilePageMenu } from '../profile-page-menu';
// css
import styles from './profile-page-desktop.module.css';

// COMPONENT
export const ProfilePageDesktop = () => {
  // RENDER
  return (
    <div className={styles['profile-page']}>
      <div className={styles['profile-page__content']}>

        {/* Profile Side Menu */}
        <ProfilePageMenu />
        {/* Routes */}
        <ProfileRoutes />

      </div>
    </div>
  );
};
