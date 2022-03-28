import { ReactNode } from 'react';
// css
import styles from '../order-card.module.css';

// PROPS
interface OrderCardTopProps {
  children: ReactNode;
}

// COMPONENT
export const OrderCardTop = (props: OrderCardTopProps) => {
  const { children } = props;

  // RENDER
  return (
    <div className={styles['order-card__top']}>
      { children }
    </div>
  );
};
