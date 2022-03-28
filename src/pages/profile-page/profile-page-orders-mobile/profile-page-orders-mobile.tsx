import { useEffect, memo } from 'react';
// router
import { useLocation, useHistory } from 'react-router-dom';
// components
import { Paragraph } from 'components/base';
import { ProfileOrders } from 'components/profile';
// css
import styles from './profile-page-orders-mobile.module.css';

interface LocationStateInterface {
  command?: string;
  orderId?: string;
}

// COMPONENT
export const ProfilePageOrdersMobile = memo(() => {
  // Get location data
  const location = useLocation<LocationStateInterface>();
  const command = location.state && location.state.command;
  const orderId = (location.state && location.state.orderId) || '';
  // Get history data
  const history = useHistory();
  const { action, push } = history;

  useEffect(() => {
    // Handle just "REPLACE" actions
    if (action !== 'REPLACE') {
      return;
    }
    //
    if (!orderId) {
      return;
    }
    // Handle "openOrderModal" command
    if (command === 'openOrderModal') {
      // push to new url
      push(`/profile/orders/${orderId}`, { backgroundProfile: location });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [action, command, orderId]);

  // RENDER
  return (
    <section className={styles['profile-page__section-orders']}>

      {/* HEADER */}
      <Paragraph
        className={styles['profile-page__orders-header']}
        text="История заказов"
        size="large"
      />

      {/* ORDERS */}
      <div className={styles['profile-page__orders-content']}>
        <ProfileOrders />
      </div>

    </section>
  );
});
