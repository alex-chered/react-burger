// components
import { Paragraph } from 'components/base';
// utils
import { formatDate } from 'utils';
// css
import styles from '../order-card.module.css';

// PROPS
interface OrderCardDateProps {
  creationDate: string;
}

// COMPONENT
export const OrderCardDate = (props: OrderCardDateProps) => {
  const { creationDate } = props;

  // RENDER
  return (
    <Paragraph
      className={styles['order-card__date']}
      text={formatDate(creationDate)}
    />
  );
};
