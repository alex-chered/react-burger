// third-party libraries
import classNames from 'classnames';
// components
import { Paragraph, ParagraphDigits, OrderStatus } from 'components/base';
// types
import { OrderModel } from 'models';
// aux.
import { OrderInfoList } from '../order-info-list';
// css
import styles from './order-info-mobile.module.css';

// PROPS
interface OrderInfoMobileProps {
  order: OrderModel;
  className?: string;
}

// COMPONENT
export const OrderInfoMobile = (props: OrderInfoMobileProps) => {
  const {
    order: {
      orderNumber,
      name,
      status,
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

      {/* NUMBER */}
      <ParagraphDigits
        className={styles['order-info__number']}
        text={`#${orderNumber}`}
      />

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

    </div>
  );
};
