import { memo } from 'react';
// router
import { useRouteMatch, useLocation, Link } from 'react-router-dom';
// third-party libraries
import classNames from 'classnames';
// components
import { Price, ParagraphDigits } from 'components/base';
// store
import { useAppSelector } from 'store';
import { feedSelectors } from 'store/feed';
// hooks
import { useFeedActions } from 'hooks/feed';
// aux.
import {
  OrderCardTop,
  OrderCardBottom,
  // OrderCardNumber,
  OrderCardDate,
  OrderCardDescription,
  OrderCardPreview
} from './auxiliary';
// css
import styles from './order-card.module.css';

// Get required selectors
const { orderByIdSelector } = feedSelectors;

// PROPS
interface FeedOrderCardProps {
  orderId: string;
  className?: string;
}

// COMPONENT
export const FeedOrderCard = memo((props: FeedOrderCardProps) => {
  // Props
  const {
    orderId,
    className = ''
  } = props;

  // Get the parameters of the current url
  const { url } = useRouteMatch();
  // Get the current location
  const location = useLocation();

  // Get a feed-order from the store
  const { order: feedOrder } = useAppSelector(orderByIdSelector(orderId));
  // Get the function to set the current feed-order
  const { setCurrentOrder } = useFeedActions();

  // No feed-order
  if (!feedOrder) {
    return null;
  }

  // Get fields of the current feed-order
  const {
    orderNumber,
    creationDate,
    name,
    ingredients,
    price
  } = feedOrder;

  // css
  const classes = classNames(
    styles['order-card'],
    className
  );

  // RENDER
  return (
    <Link
      className={classes}
      to={{
        pathname: `${url}/${orderNumber}`,
        state: { background: location }
      }}
      onClick={() => setCurrentOrder(feedOrder)}
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
