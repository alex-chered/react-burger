import { ReactNode } from 'react';
// css
import styles from '../app-header.module.css';

// PROPS
interface AppHeaderInnerProps {
  children: ReactNode;
}

// COMPONENT
export const AppHeaderInner = (props: AppHeaderInnerProps) => {
  const { children } = props;

  // RENDER
  return (
    <div className={styles['app-header__inner']}>
      {children}
    </div>
  );
};
