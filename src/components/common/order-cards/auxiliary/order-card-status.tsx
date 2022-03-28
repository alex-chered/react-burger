// components
import { OrderStatus } from 'components/base';
// models
import { OrderStatusType } from 'models';
// css
import styles from '../order-card.module.css';

// PROPS
interface OrderCardStatusProps {
  status: OrderStatusType;
}

// COMPONENT
export const OrderCardStatus = (props: OrderCardStatusProps) => {
  const { status } = props;

  // RENDER
  return (
    <OrderStatus
      className={styles['order-card__status']}
      status={status}
    />
  );
};
