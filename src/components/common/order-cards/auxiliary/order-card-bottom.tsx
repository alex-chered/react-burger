import { ReactNode } from 'react';
// css
import styles from '../order-card.module.css';

// PROPS
interface OrderCardBottomProps {
  children: ReactNode;
}

// COMPONENT
export const OrderCardBottom = (props: OrderCardBottomProps) => {
  const { children } = props;

  // RENDER
  return (
    <div className={styles['order-card__bottom']}>
      { children }
    </div>
  );
};
