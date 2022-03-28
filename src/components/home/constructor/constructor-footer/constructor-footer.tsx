// components
import { Price, Button } from 'components/base';
import { OrderDetailsModal } from 'components/modals';
// hooks
import { useToggle } from 'hooks/common';
import { useCreateOrder } from 'hooks/orders';
import { useConstructorActions } from 'hooks/constructor';
import { useToasts } from 'hooks/toasts';
// store
import { useAppSelector } from 'store';
import { burgerConstructorSelectors } from 'store/burger-constructor';
import { ordersSelectors } from 'store/orders';
// types
import { IRejectedValue } from 'store/types';
// css
import styles from './constructor-footer.module.css';

// get required selectors
const { totalSumSelector } = burgerConstructorSelectors;
const { loadingSelector } = ordersSelectors;

// COMPONENT
export const ConstructorFooter = () => {
  // Get total sum of the order
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

  // RENDER
  return (
    <>
      <div className={styles['constructor__footer']}>

        {/* Price */}
        <Price
          className={styles['constructor__footer-price']}
          size="medium"
          price={totalSum}
        />

        {/* Create Order */}
        <Button
          className={styles['constructor__footer-action']}
          text="Оформить заказ"
          size="large"
          loading={loading}
          onClick={createOrderExt}
        />

      </div>

      {/* Modal window "OrderDetailsModal" */}
      <OrderDetailsModal
        show={isModalOpen}
        onClose={hideModal}
      />
    </>
  );
};
