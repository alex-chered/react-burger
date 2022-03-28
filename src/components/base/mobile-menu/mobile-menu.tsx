import { ReactNode } from 'react';
// third-party libraries
import classNames from 'classnames';
// css
import styles from './mobile-menu.module.css';

// PROPS
interface MobileMenuProps {
  children: ReactNode;
  className?: string;
}

// COMPONENT
export const MobileMenu = (props: MobileMenuProps) => {
  const { children, className } = props;

  // css
  const classes = classNames(
    styles['mobile-menu'],
    className
  );

  // RENDER
  return (
    <nav className={classes}>
      {children}
    </nav>
  );
};
