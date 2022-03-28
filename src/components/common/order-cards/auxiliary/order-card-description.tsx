// components
import { Paragraph } from 'components/base';
// css
import styles from '../order-card.module.css';

// PROPS
interface OrderCardDescriptionProps {
  description: string;
}

// COMPONENT
export const OrderCardDescription = (props: OrderCardDescriptionProps) => {
  const { description } = props;

  // RENDER
  return (
    <Paragraph
      className={styles['order-card__description']}
      text={description}
      size="medium"
    />
  );
};
