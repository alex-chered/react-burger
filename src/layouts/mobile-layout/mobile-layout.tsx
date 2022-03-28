/* eslint-disable react/self-closing-comp */

import { memo, ReactNode } from 'react';
// components
import { Container } from 'components/base';
import { MobileHeader } from 'components/common';
// store
import { useAppSelector } from 'store';
import { commonSelectors } from 'store/common';
// css
import styles from './mobile-layout.module.css';

// Get selectors
const { modeSelector } = commonSelectors;

// PROPS
interface MobileLayoutProps {
  children: ReactNode;
}

// COMPONENT
export const MobileLayout = memo((props: MobileLayoutProps) => {
  const { children } = props;

  const { mode } = useAppSelector(modeSelector);

  // This layout can only be rendered in 'desktop' mode
  if (mode !== 'mobile') {
    return null;
  }

  // RENDER
  return (
    <div className={styles['mobile-layout']}>

      {/* HEADER */}
      <MobileHeader />

      {/* MAIN */}
      <main id="content">
        <Container className={styles['mobile-layout__container']}>
          {children}
        </Container>
      </main>

      {/* FOOTER */}
      <footer id="footer"></footer>

    </div>
  );
});
