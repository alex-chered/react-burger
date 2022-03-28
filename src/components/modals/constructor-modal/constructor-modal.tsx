// components
import { ConstructorMobile, ConstructorFooterMobile } from 'components/home';
import { Modal, ModalContent1, ModalFooter } from 'components/modals';
// css
import styles from './constructor-modal.module.css';

// PROPS
interface ConstructorModalProps {
  onClose?: () => void;
}

// COMPONENT
export const ConstructorModal = (props: ConstructorModalProps) => {
  const { onClose } = props;

  // RENDER
  return (
    <Modal
      header="Заказ"
      onClose={onClose}
    >

      {/* CONTENT */}
      <ModalContent1>
        <ConstructorMobile
          className={styles['modal__constructor']}
        />
      </ModalContent1>

      {/* FOOTER */}
      <ModalFooter className={styles['modal__footer']}>
        <ConstructorFooterMobile onClose={onClose} />
      </ModalFooter>

    </Modal>
  );
};
