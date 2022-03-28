import { ReactNode } from 'react';
// third-party libraries
import classNames from 'classnames';
// css
import styles from './footer.module.css';

// PROPS
interface FooterProps {
  children: ReactNode;
  className?: string;
}

// COMPONENT
export const Footer = (props: FooterProps) => {
  const { children, className } = props;

  // css
  const classes = classNames(
    styles['footer'],
    className
  );

  // RENDER
  return (
    <div className={classes}>
      {children}
    </div>
  );
};
