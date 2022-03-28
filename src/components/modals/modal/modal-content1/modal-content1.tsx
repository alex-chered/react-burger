import { ReactNode } from 'react';
// components
import { Container } from 'components/base';
// store
import { useAppSelector } from 'store';
import { commonSelectors } from 'store/common';
// css
import styles from './modal-content1.module.css';

// Get selectors
const { modeSelector } = commonSelectors;

// PROPS
interface ModalContent1Props {
  children: ReactNode;
}

// COMPONENT
export const ModalContent1 = (props: ModalContent1Props) => {
  const { children } = props;

  const { mode } = useAppSelector(modeSelector);

  // RENDER
  return (
    <>

      {/* MOBILE */}
      { mode === 'mobile' && (
        <div className={styles['modal__content1']}>
          <Container className={styles['modal__container']}>
            { children }
          </Container>
        </div>
      ) }

      {/* DESKTOP */}
      { mode === 'desktop' && (
        <div className={styles['modal__content1']}>
          { children }
        </div>
      ) }

    </>
  );
};
