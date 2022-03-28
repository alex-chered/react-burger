// third-party libraries
import classNames from 'classnames';
// components
import { Paragraph, OrderStatus } from 'components/base';
// types
import { OrderModel } from 'models';
// aux.
import { OrderInfoList } from '../order-info-list';
import { OrderInfoTotal } from '../order-info-total';
// css
import styles from './order-info-desktop.module.css';

// PROPS
interface OrderInfoDesktopProps {
  order: OrderModel;
  className?: string;
}

// COMPONENT
export const OrderInfoDesktop = (props: OrderInfoDesktopProps) => {
  const {
    order: {
      name,
      status,
      creationDate,
      price,
      ingredients
    },
    className
  } = props;

  // css
  const classes = classNames(
    styles['order-info'],
    className
  );

  // RENDER
  return (
    <div className={classes}>

      {/* NAME */}
      <Paragraph
        className={styles['order-info__name']}
        size="medium"
        text={name}
      />

      {/* STATUS */}
      <OrderStatus
        className={styles['order-info__status']}
        status={status}
      />

      {/* CONTENT HEADER */}
      <Paragraph
        className={styles['order-info__content-header']}
        text="Состав:"
        size="medium"
      />

      {/* CONTENT */}
      <div className={styles['order-info__content']}>
        <OrderInfoList ingredients={ingredients} />
      </div>

      {/* ORDER TOTAL */}
      <OrderInfoTotal
        className={styles['order-info__total']}
        date={creationDate}
        price={price}
      />

    </div>
  );
};
