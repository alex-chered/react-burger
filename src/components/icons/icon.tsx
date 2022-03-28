// third-party libraries
import classNames from 'classnames';
// types
import { IconProps, icons } from './icon.props';
// css
import styles from './icon.module.css';

// COMPONENT
export const Icon = (props: IconProps) => {
  const {
    name = 'BurgerIcon',
    type = 'none',
    large = false,
    onClick,
    className = ''
  } = props;

  // css-classes for the root element
  const classes = classNames(
    styles['icon'],
    {
      [`${styles['icon--large']}`]: large,
      [`${className}`]: !!className
    }
  );

  const IconItem = icons[name];

  // RENDER
  return (
    <span className={classes}>
      <IconItem
        type={type}
        onClick={onClick}
      />
    </span>
  );
};
