// third-party libraries
import classNames from 'classnames';
// components
import { Paragraph } from 'components/base';
// models
import { OrderStatusType } from 'models';
// aux
import { getStatusText } from './utils';
// css
import styles from './order-status.module.css';

// PROPS
interface OrderStatusProps {
  status: OrderStatusType;
  className?: string;
}

// COMPONENT
export const OrderStatus = (props: OrderStatusProps) => {
  const { status, className = '' } = props;

  // css
  const classes = classNames(
    {
      [`${styles['order-status--done']}`]: status === 'done'
    },
    className
  );

  // RENDER
  return (
    <Paragraph
      className={classes}
      text={getStatusText(status)}
    />
  );
};
