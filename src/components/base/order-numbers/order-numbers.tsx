// third-party libraries
import classNames from 'classnames';
// components
import { Paragraph, ParagraphDigits } from 'components/base';
// css
import styles from './order-numbers.module.css';

// PROPS
interface OrderNumbersProps {
  header: string;
  orders: string[];
  theme?: 'default' | 'success';
  className?: string;
}

// COMPONENT
export const OrderNumbers = (props: OrderNumbersProps) => {
  const {
    header,
    orders,
    theme = 'default',
    className = ''
  } = props;

  // css
  const classes = classNames(
    styles['order-numbers'],
    className
  );
  // css for items
  const classesItem = classNames({
    [`${styles['order-numbers__item--success']}`]: theme === 'success'
  });

  // RENDER
  return (
    <div className={classes}>

      {/* Header */}
      <Paragraph
        size="medium"
        text={header}
      />

      {/* Content */}
      <div className={styles['order-numbers__content']}>
        {
          orders.map((order) => (
            <ParagraphDigits
              key={order}
              className={classesItem}
              text={order}
            />
          ))
        }
      </div>

    </div>
  );
};
