// components
import { OrderInfo, OrderInfoTotal } from 'components/common';
import { ModalContent, ModalFooter } from 'components/modals/modal';
// types
import { OrderModel } from 'models';
// css
import styles from './order-modal-mobile.module.css';

// PROPS
interface OrderModalMobileProps {
  order: OrderModel;
}

// COMPONENT
export const OrderModalMobile = (props: OrderModalMobileProps) => {
  const { order } = props;

  // RENDER
  return (
    <>
      <ModalContent>
        <OrderInfo order={order} />
      </ModalContent>

      <ModalFooter className={styles['modal__order-total']}>
        <OrderInfoTotal
          date={order.creationDate}
          price={order.price}
        />
      </ModalFooter>
    </>
  );
};
