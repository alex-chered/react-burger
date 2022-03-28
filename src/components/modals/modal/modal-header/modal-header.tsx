// components
import { Paragraph, ParagraphDigits } from 'components/base';
import { Icon } from 'components/icons';
// css
import styles from './modal-header.module.css';

// PROPS
interface ModalHeaderProps {
  header?: string;
  headerMode?: 'text' | 'digits';
  onClick?: () => void;
}

// COMPONENT
export const ModalHeader = (props: ModalHeaderProps) => {
  const {
    header,
    headerMode = 'text',
    onClick
  } = props;

  // RENDER
  return (
    <div className={styles['modal__header']}>

      {/* HEADER - TEXT */}
      {
        headerMode === 'text' && (
          <Paragraph
            size="large"
            text={header}
          />
        )
      }

      {/* HEADER - DIGITS */}
      {
        headerMode === 'digits' && (
          <ParagraphDigits
            size="medium"
            text={header}
          />
        )
      }

      {/* ICON - CLOSE BUTTON */}
      <Icon
        className={styles['modal__header-close']}
        name="CloseIcon"
        type="primary"
        onClick={onClick}
      />

    </div>
  );
};
