import { ReactNode } from 'react';
// third-party libraries
import classNames from 'classnames';
// hooks
import { useKeyPress } from 'hooks/common';
// css
import styles from './overlay.module.css';

// PROPS
interface OverlayProps {
  children?: ReactNode;
  className?: string;
  onClick?: () => void;
}

// COMPONENT
export const Overlay = (props: OverlayProps) => {
  const { children, className, onClick } = props;

  // Define the handler for clicking "Escape"
  useKeyPress({
    key: 'escape',
    keyUpHandler: onClick
  });

  // css
  const classes = classNames(
    styles['overlay'],
    className
  );

  // RENDER
  return (
    <div
      className={classes}
      onClick={onClick}
      role="presentation"
    >
      {children}
    </div>
  );
};
