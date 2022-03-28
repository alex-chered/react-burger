import { ReactNode } from 'react';
// third-party libraries
import classNames from 'classnames';
// css
import styles from './link-panel.module.css';

// PROPS
interface LinkPanelProps {
  children: ReactNode;
  className?: string;
}

// COMPONENT
export const LinkPanel = (props: LinkPanelProps) => {
  const { children, className } = props;

  // css
  const classes = classNames(
    styles['link-panel'],
    className
  );

  // RENDER
  return (
    <div className={classes}>
      { children }
    </div>
  );
};
