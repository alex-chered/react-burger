import { ReactNode } from 'react';
// third-party libraries
import classNames from 'classnames';
// css
import styles from './header-menu.module.css';

// PROPS
interface HeaderMenuProps {
  children: ReactNode;
  className?: string;
}

// COMPONENT
export const HeaderMenu = (props: HeaderMenuProps) => {
  const { children, className } = props;

  // css
  const classes = classNames(
    styles['header-menu'],
    className
  );

  // RENDER
  return (
    <div className={classes}>
      {children}
    </div>
  );
};
