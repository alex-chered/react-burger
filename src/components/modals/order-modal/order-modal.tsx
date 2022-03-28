// store
import { useAppSelector } from 'store';
import { feedSelectors } from 'store/feed';
import { ordersSelectors } from 'store/orders';
import { commonSelectors } from 'store/common';
// hooks
import { useFeedActions } from 'hooks/feed';
import { useProfileActions } from 'hooks/profile';
// aux.
import { OrderModalMobile } from './order-modal-mobile';
import { OrderModalDesktop } from './order-modal-desktop';
import { Modal } from '../modal';

// Get selectors
const { currentOrderSelector: currentFeedSelector } = feedSelectors;
const { currentOrderSelector: currentProfileSelector } = ordersSelectors;
const { modeSelector } = commonSelectors;

// PROPS
interface OrderModalProps {
  mode: 'feed' | 'profile';
}

// COMPONENT
export const OrderModal = (props: OrderModalProps) => {
  const { mode } = props;

  // Get current order in feed and profile states
  const { currentOrder: currentFeed } = useAppSelector(currentFeedSelector);
  const { order: currentProfile } = useAppSelector(currentProfileSelector);

  // Get functions to clear order in fedd and profile states
  const { clearCurrentOrder: clearFeed } = useFeedActions();
  const { clearCurrentOrder: clearProfile } = useProfileActions();

  const { mode: appMode } = useAppSelector(modeSelector);

  // Select the current order depending on mode
  const currentOrder = mode === 'profile'
    ? currentProfile
    : currentFeed;

  // Select action depending on mode
  const clearCurrentOrder = mode === 'profile'
    ? clearProfile
    : clearFeed;

  // No current feed-order
  if (!currentOrder) {
    return null;
  }

  // RENDER
  return (
    <Modal
      hasOwnRoute
      header="Детали заказа"
      onClose={clearCurrentOrder}
    >

      {/* FOR MOBILE */}
      { appMode === 'mobile' && <OrderModalMobile order={currentOrder} /> }

      {/* FOR DESKTOP */}
      { appMode === 'desktop' && <OrderModalDesktop order={currentOrder} /> }

    </Modal>
  );
};
