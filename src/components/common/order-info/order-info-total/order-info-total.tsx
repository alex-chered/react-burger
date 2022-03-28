// third-party libraires
import classNames from 'classnames';
// components
import { Paragraph, Price } from 'components/base';
// utils
import { formatDate } from 'utils';
// css
import styles from './order-info-total.module.css';

// PROPS
interface OrderInfoTotalProps {
  date: string;
  price: number;
  className?: string;
}

// COMPONENT
export const OrderInfoTotal = (props: OrderInfoTotalProps) => {
  const { date, price, className } = props;

  // css
  const classes = classNames(
    styles['order-info-total'],
    className
  );

  // RENDER
  return (
    <div className={classes}>
      {/* Date */}
      <Paragraph
        className={styles['order-info-total__date']}
        text={formatDate(date)}
      />
      {/* Price */}
      <Price
        price={price}
      />
    </div>
  );
};
