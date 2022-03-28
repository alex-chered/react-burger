// third-party libraries
import classNames from 'classnames';
// components
import { Icon } from 'components/icons';
import { ParagraphDigits } from 'components/base';
// utils
import { formatNumber } from 'utils';
// css
import styles from './price.module.css';

// PROPS
interface PriceProps {
  price: number;
  num?: number;
  size?: 'regular' | 'medium' | 'large';
  className?: string;
}

// COMPONENT
export const Price = (props: PriceProps) => {
  const {
    price,
    num = 0,
    size = 'regular',
    className = ''
  } = props;

  // If price isn't set
  if (price === 0) {
    return null;
  }

  // css
  const classes = classNames(
    styles['price'],
    className
  );

  // RENDER
  return (
    <div className={classes}>

      {/* Value */}
      <ParagraphDigits
        className={styles['price__number']}
        size={size}
      >
        { num === 0 && formatNumber(price) }
        { num !== 0 && `${num} x ${formatNumber(price)}` }
      </ParagraphDigits>

      {/* Currency Icon */}
      <Icon
        name="CurrencyIcon"
        type="primary"
      />

    </div>
  );
};
