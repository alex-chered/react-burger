import { memo, ReactNode } from 'react';
// components
import { Container } from 'components/base';
import { AppHeader } from 'components/common';
// store
import { useAppSelector } from 'store';
import { commonSelectors } from 'store/common';
// css
import styles from './main-layout.module.css';

// Get selectors
const { modeSelector } = commonSelectors;

// PROPS
interface MainLayoutProps {
  children: ReactNode;
}

// COMPONENT
export const MainLayout = memo((props: MainLayoutProps) => {
  const { children } = props;

  const { mode } = useAppSelector(modeSelector);

  // This layout can only be rendered in 'desktop' mode
  if (mode !== 'desktop') {
    return null;
  }

  // RENDER
  return (
    <div className={styles['main-layout']}>

      {/* HEADER */}
      <AppHeader />

      {/* MAIN */}
      <main>
        <Container>
          {children}
        </Container>
      </main>

    </div>
  );
});
