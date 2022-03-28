// components
import { Paragraph } from 'components/base';
// css
import styles from '../side-menu.module.css';

// PROPS
interface SideMenuElementActionProps {
  text: string;
  onClick: () => void;
}

// COMPONENT
export const SideMenuElementAction = (props: SideMenuElementActionProps) => {
  const { text, onClick } = props;

  // RENDER
  return (
    <div
      className={styles['side-menu-element']}
      onClick={onClick}
      role="button"
      tabIndex={0}
    >
      <Paragraph
        className={styles['side-menu-element__action']}
        size="medium"
        text={text}
      />
    </div>
  );
};
