import { ReactNode } from 'react';
// css
import styles from '../app-header.module.css';

// PROPS
interface AppHeaderLeftProps {
  children: ReactNode;
}

// COMPONENT
export const AppHeaderLeft = (props: AppHeaderLeftProps) => {
  const { children } = props;

  // RENDER
  return (
    <div className={styles['app-header__left']}>
      {children}
    </div>
  );
};
