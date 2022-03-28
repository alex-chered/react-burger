// third-party libraries
import classNames from 'classnames';
// components
import { Paragraph, ParagraphDigits } from 'components/base';
// types
import { OrderModel } from 'models';
// images
// eslint-disable-next-line import/extensions
import imageDone from 'assets/images/done.png';
// css
import styles from './order-details.module.css';

// PROPS
interface OrderDetailsProps {
  order: OrderModel;
  className?: string;
}

// COMPONENT
export const OrderDetails = (props: OrderDetailsProps) => {
  const { order, className = '' } = props;

  // css
  const classes = classNames(
    styles['order-details'],
    className
  );

  // RENDER
  return (
    <div className={classes}>

      {/* Order Number */}
      <ParagraphDigits
        className={styles['order-details__number']}
        size="large"
        text={order.orderNumber}
        shadowed
      />

      {/* Identificator */}
      <Paragraph
        className={styles['order-details__identificator']}
        size="medium"
        text="Идентификатор заказа"
      />

      {/* Image "Done" */}
      <img
        className={styles['order-details__image']}
        alt="Done"
        src={imageDone}
      />

      {/* Notification 1 */}
      <Paragraph
        className={styles['order-details__notification1']}
        text="Ваш заказ начали готовить"
      />

      {/* Notification 2 */}
      <Paragraph
        className={styles['order-details__notification2']}
        text="Дождитесь готовности на орбитальной станции"
      />

    </div>
  );
};
