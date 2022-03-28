import { memo } from 'react';
// third-party libraries
import classNames from 'classnames';
// components
import { ProfileOrderCard } from 'components/common';
// store
import { useAppSelector } from 'store';
import { ordersSelectors } from 'store/orders';
// css
import styles from './profile-orders.module.css';

// Get required selectors
const { dataSelector } = ordersSelectors;

// PROPS
interface ProfileOrdersProps {
  className?: string;
}

// COMPONENT
export const ProfileOrders = memo((props: ProfileOrdersProps) => {
  const { className } = props;

  // Select data about orders
  const { orders } = useAppSelector(dataSelector);

  // NO DATA
  if (orders.length === 0) {
    return null;
  }

  // css
  const classes = classNames(
    styles['profile-orders'],
    className
  );

  // RENDER
  return (
    <div className={classes}>
      {
        orders.map((order) => (
          <ProfileOrderCard
            key={order.id}
            orderId={order.id}
          />
        ))
      }
    </div>
  );
});
