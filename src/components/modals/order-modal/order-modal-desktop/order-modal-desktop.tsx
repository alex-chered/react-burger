// components
import { OrderInfo } from 'components/common';
import { ModalContent } from 'components/modals/modal';
// types
import { OrderModel } from 'models';

// PROPS
interface OrderModalDesktopProps {
  order: OrderModel;
}

// COMPONENT
export const OrderModalDesktop = (props: OrderModalDesktopProps) => {
  const { order } = props;

  // No current order
  if (!order) {
    return null;
  }

  // RENDER
  return (
    <>
      <ModalContent>
        <OrderInfo
          order={order}
        />
      </ModalContent>
    </>
  );
};
