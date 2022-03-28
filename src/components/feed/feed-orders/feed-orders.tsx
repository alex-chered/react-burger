import { memo } from 'react';
// third-party libraries
import classNames from 'classnames';
// components
import { FeedOrderCard } from 'components/common';
// store
import { useAppSelector } from 'store';
import { feedSelectors } from 'store/feed';
// css
import styles from './feed-orders.module.css';

// Get required selectors
const { dataSelector } = feedSelectors;

// PROPS
interface FeedOrdersProps {
  className?: string;
}

// COMPONENT
export const FeedOrders = memo((props: FeedOrdersProps) => {
  const { className } = props;

  // Get orders from the feed
  const { orders } = useAppSelector(dataSelector);

  // NO DATA
  if (orders.length === 0) {
    return null;
  }

  // css
  const classes = classNames(
    styles['feed-orders'],
    className
  );

  // RENDER
  return (
    <div className={classes}>
      {
        orders.map((order) => (
          <FeedOrderCard
            key={order.id}
            orderId={order.id}
          />
        ))
      }
    </div>
  );
});
