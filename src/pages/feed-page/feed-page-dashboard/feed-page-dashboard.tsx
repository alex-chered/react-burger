import { memo } from 'react';
// third-party libraries
import classNames from 'classnames';
// store
import { useAppSelector } from 'store';
import { feedSelectors } from 'store/feed';
// components
import { OrderNumbers } from 'components/base';
import { FeedTotal } from 'components/feed';
// css
import styles from './feed-page-dashboard.module.css';

// Get required selectors
const { totalSelector, orderNumbersSelector } = feedSelectors;

// COMPONENT
export const FeedPageDashboard = memo(() => {
  const { total, totalToday } = useAppSelector(totalSelector);
  const { completedOrders, pendingOrders } = useAppSelector(orderNumbersSelector);

  // css
  const classes = classNames(
    styles['feed-page__section-dashboard']
  );

  // RENDER
  return (
    <section className={classes}>

      <div className={styles['feed-page__dashboard-orders']}>
        <OrderNumbers
          className={styles['feed-page__dashboard-orders-group']}
          header="Готовы:"
          orders={completedOrders}
          theme="success"
        />
        <OrderNumbers
          className={styles['feed-page__dashboard-orders-group']}
          header="В работе:"
          orders={pendingOrders}
        />
      </div>

      {/* Total - all time */}
      <FeedTotal
        className={styles['feed-page__dashboard-total']}
        text="Выполнено за все время:"
        total={total}
      />

      {/* Total - today */}
      <FeedTotal
        className={styles['feed-page__dashboard-total']}
        text="Выполнено за сегодня:"
        total={totalToday}
      />

    </section>
  );
});
