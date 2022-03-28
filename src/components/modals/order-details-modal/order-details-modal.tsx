import { useCallback } from 'react';
// hooks
import { useProfileActions } from 'hooks/profile';
// hoc-s
import { withShow, WithShowProps } from 'hocs';
// store
import { useAppSelector } from 'store';
import { ordersSelectors } from 'store/orders';
import { commonSelectors } from 'store/common';
// components
import { OrderDetails } from 'components/common';
import { Modal, ModalContent } from 'components/modals';
// css
import styles from './order-details-modal.module.css';

// Get selectors
const { currentOrderSelector } = ordersSelectors;
const { modeSelector } = commonSelectors;

// PROPS
interface OrderDetailsModalProps extends WithShowProps {
  onClose?: () => void;
}

// COMPONENT
export const OrderDetailsModal = withShow((props: OrderDetailsModalProps) => {
  const { onClose } = props;

  const { order: currentOrder } = useAppSelector(currentOrderSelector);

  const { mode } = useAppSelector(modeSelector);

  // Get the current order in the store
  const { clearCurrentOrder } = useProfileActions();

  // Handler to close the modal window
  const handleClose = useCallback(() => {
    clearCurrentOrder();
    onClose && onClose();
  }, [clearCurrentOrder, onClose]);

  // NO ORDER
  if (!currentOrder) {
    return null;
  }

  // RENDER
  return (
    <Modal
      onClose={handleClose}
      header={mode === 'mobile' ? 'Заказ оформлен' : ''}
    >
      <ModalContent>
        <OrderDetails
          className={styles['modal__order-details']}
          order={currentOrder}
        />
      </ModalContent>
    </Modal>
  );
});
