import { memo } from 'react';
// components
import { Paragraph } from 'components/base';
// aux.
import { FeedPageDashboard } from '../feed-page-dashboard';
import { FeedPageOrders } from '../feed-page-orders';
// css
import styles from './feed-page-desktop.module.css';

// COMPONENT
export const FeedPageDesktop = memo(() => {
  // RENDER
  return (
    <div className={styles['feed-page']}>

      {/* HEADER */}
      <Paragraph
        className={styles['feed-page__header']}
        size="large"
        text="Лента заказов"
      />

      <div className={styles['feed-page__content']}>

        {/* Orders */}
        <FeedPageOrders />

        {/* Dashboard */}
        <FeedPageDashboard />

      </div>

    </div>
  );
});
