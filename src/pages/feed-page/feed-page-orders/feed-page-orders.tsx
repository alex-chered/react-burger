// third-party libraries
import classNames from 'classnames';
// components
import { FeedOrders } from 'components/feed';
// css
import styles from './feed-page-orders.module.css';

// COMPONENT
export const FeedPageOrders = () => {
  // css
  const classes = classNames(
    styles['feed-page__section-orders']
  );

  // RENDER
  return (
    <section className={classes}>
      <FeedOrders />
    </section>
  );
};
