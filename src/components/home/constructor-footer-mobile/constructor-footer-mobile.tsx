// components
import { Price, Button } from 'components/base';
import { OrderDetailsModal } from 'components/modals';
// store
import { useAppSelector } from 'store';
import { burgerConstructorSelectors } from 'store/burger-constructor';
import { ordersSelectors } from 'store/orders';
// types
import { IRejectedValue } from 'store/types';
// hooks
import { useToggle } from 'hooks/common';
import { useCreateOrder } from 'hooks/orders';
import { useConstructorActions } from 'hooks/constructor';
import { useToasts } from 'hooks/toasts';
// css
import styles from './constructor-footer-mobile.module.css';

// Get required selectors
const {
  totalSumSelector
} = burgerConstructorSelectors;
const { loadingSelector } = ordersSelectors;

interface ConstructorFooterMobileProps{
  onClose?: () => void;
}

// COMPONENT
export const ConstructorFooterMobile = (props: ConstructorFooterMobileProps) => {
  const { onClose } = props;

  const { totalSum } = useAppSelector(totalSumSelector);

  // Empty the burger constructor
  const { clearBurger } = useConstructorActions();

  // Get the function to create an order
  const { createOrder } = useCreateOrder();

  // Get the create order status
  const { loading } = useAppSelector(loadingSelector);

  // Get functions for notifications
  const { toastError } = useToasts();

  // Get the state and functions to handle with modal windows
  const {
    state: isModalOpen,
    on: showModal,
    off: hideModal
  } = useToggle(false);

  const createOrderExt = async () => {
    try {
      // create order
      const result = await createOrder();
      if (!result) {
        return;
      }

      // remove all ingredients from the constructor
      clearBurger();
      // show modal window "OrderDetails"
      showModal();
    } catch (err: unknown) {
      const message = (err as IRejectedValue).error;
      toastError(message);
    }
  };

  const closeModalExt = () => {
    // hide modal "OrderDetails"
    hideModal();
    // close this window
    onClose && onClose();
  };

  // RENDER
  return (
    <>
      <div className={styles['constructor-footer']}>

        {/* PRICE */}
        <Price
          price={totalSum}
        />

        {/* SHOW ORDER */}
        <Button
          className={styles['constructor-footer__create-order']}
          text="Заказать"
          size="small"
          loading={loading}
          onClick={createOrderExt}
        />

      </div>

      {/* Modal window "OrderDetailsModal" */}
      <OrderDetailsModal
        show={isModalOpen}
        onClose={closeModalExt}
      />
    </>
  );
};
