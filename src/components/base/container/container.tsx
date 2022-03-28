import { ReactNode } from 'react';
// third-party libraries
import classNames from 'classnames';
// css
import styles from './container.module.css';

// PROPS
interface ContainerProps {
  children: ReactNode;
  className?: string;
}

// COMPONENT
export const Container = (props: ContainerProps) => {
  const { children, className } = props;

  // css
  const classes = classNames(
    styles['container'],
    className
  );

  // RENDER
  return (
    <div className={classes}>
      { children }
    </div>
  );
};
