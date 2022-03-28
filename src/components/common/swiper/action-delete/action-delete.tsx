import { RefObject } from 'react';
// components
import { Paragraph } from 'components/base';
import { Icon } from 'components/icons';
// css
import styles from './action-delete.module.css';

// PROPS
interface ActionDeleteProps {
  elementRef?: RefObject<HTMLDivElement>;
}

// COMPONENT
export const ActionDelete = (props: ActionDeleteProps) => {
  const { elementRef } = props;

  // RENDER
  return (
    <div
      className={styles['swiper__actions-delete']}
      ref={elementRef}
    >
      <Icon
        name="DeleteIcon"
        type="primary"
      />
      <Paragraph
        text="Удалить"
        size="small"
      />
    </div>
  );
};
