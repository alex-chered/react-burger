import { ReactNode } from 'react';
// third-party libraries
import classNames from 'classnames';
// css
import styles from './modal-footer.module.css';

// PROPS
interface ModalFooterProps {
  children: ReactNode;
  className?: string;
}

// COMPONENT
export const ModalFooter = (props: ModalFooterProps) => {
  const { children, className } = props;

  // css
  const classes = classNames(
    styles['modal__footer'],
    className
  );

  // RENDER
  return (
    <footer className={classes}>
      {children}
    </footer>
  );
};
