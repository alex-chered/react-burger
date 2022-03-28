// models
import { OrderModel } from 'models';
// store
import { useAppSelector } from 'store';
import { commonSelectors } from 'store/common';
// aux.
import { OrderInfoDesktop } from './order-info-desktop';
import { OrderInfoMobile } from './order-info-mobile';

// Get selectors
const { modeSelector } = commonSelectors;

// PROPS
interface OrderInfoProps {
  order: OrderModel;
  className?: string;
}

// COMPONENT
export const OrderInfo = (props: OrderInfoProps) => {
  const {
    order,
    className
  } = props;

  const { mode } = useAppSelector(modeSelector);

  // RENDER
  return (
    <>

      {/* FOR DESKTOP */}
      { mode === 'desktop' && (
        <OrderInfoDesktop
          className={className}
          order={order}
        />
      ) }

      {/* FOR MOBILE */}
      { mode === 'mobile' && (
        <OrderInfoMobile
          className={className}
          order={order}
        />
      ) }

    </>
  );
};
