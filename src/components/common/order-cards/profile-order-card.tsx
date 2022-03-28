import { memo } from 'react';
// router
import { useRouteMatch, useLocation, Link } from 'react-router-dom';
// third-party libraries
import classNames from 'classnames';
// store
import { useAppSelector } from 'store';
import { ordersSelectors } from 'store/orders';
// hooks
import { useProfileActions } from 'hooks/profile';
// сomponents
import { Price, ParagraphDigits } from 'components/base';
// aux.
import {
  OrderCardTop,
  OrderCardDate,
  OrderCardDescription,
  OrderCardStatus,
  OrderCardBottom,
  OrderCardPreview
} from './auxiliary';
// css
import styles from './order-card.module.css';

// Get required selectors
const { orderByIdSelector } = ordersSelectors;

// PROPS
interface ProfileOrderCardProps {
  orderId: string;
  className?: string;
}

// COMPONENT
export const ProfileOrderCard = memo((props: ProfileOrderCardProps) => {
  const { orderId, className } = props;

  // Get the parameters of the current url
  const { url } = useRouteMatch();
  // Get the current location
  const location = useLocation();

  // Get the order by id
  const { order } = useAppSelector(orderByIdSelector(orderId));

  // Get function to set current order
  const { setCurrentOrder } = useProfileActions();

  // No order
  if (!order) {
    return null;
  }

  // Get fields of the current feed-order
  const {
    orderNumber,
    creationDate,
    name,
    ingredients,
    price,
    status
  } = order;

  // css
  const classesRoot = classNames(
    styles['order-card'],
    className
  );

  // RENDER
  return (
    <Link
      className={classesRoot}
      to={{
        pathname: `${url}/${orderNumber}`,
        state: { backgroundProfile: location }
      }}
      onClick={() => setCurrentOrder(order)}
    >
      {/* Top */}
      <OrderCardTop>
        {/* Number */}
        <ParagraphDigits
          text={`#${orderNumber}`}
        />
        {/* Date */}
        <OrderCardDate
          creationDate={creationDate}
        />
      </OrderCardTop>

      {/* Name */}
      <OrderCardDescription
        description={name}
      />

      {/* Status */}
      <OrderCardStatus
        status={status}
      />

      {/* Bottom */}
      <OrderCardBottom>
        {/* Order Ingredients Logos */}
        <OrderCardPreview
          ingredients={ingredients}
        />
        {/* Order Sum */}
        <Price
          price={price}
        />
      </OrderCardBottom>

    </Link>
  );
});
