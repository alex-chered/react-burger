import { memo } from 'react';
// components
import { ProfileOrders } from 'components/profile';
// css
import styles from './profile-page-orders-desktop.module.css';

// COMPONENT
export const ProfilePageOrdersDesktop = memo(() => {
  // RENDER
  return (
    <section className={styles['profile-page__section-orders']}>

      {/* ORDERS */}
      <div className={styles['profile-page__orders-content']}>
        <ProfileOrders />
      </div>

    </section>
  );
});
