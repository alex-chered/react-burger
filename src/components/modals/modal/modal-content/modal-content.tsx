import { ReactNode } from 'react';
// components
import { Container } from 'components/base';
// store
import { useAppSelector } from 'store';
import { commonSelectors } from 'store/common';
// css
import styles from './modal-content.module.css';

// Get selectors
const { modeSelector } = commonSelectors;

// PROPS
interface ModalContentProps {
  children: ReactNode;
}

// COMPONENT
export const ModalContent = (props: ModalContentProps) => {
  const { children } = props;

  const { mode } = useAppSelector(modeSelector);

  // RENDER
  return (
    <>

      {/* MOBILE */}
      { mode === 'mobile' && (
        <div className={styles['modal__content']}>
          <Container className={styles['modal__container']}>
            { children }
          </Container>
        </div>
      ) }

      {/* DESKTOP */}
      { mode === 'desktop' && (
        <div className={styles['modal__content']}>
          { children }
        </div>
      ) }

    </>
  );
};
