import { ReactNode } from 'react';
// third-party libraries
import classNames from 'classnames';
// components
import { Paragraph } from 'components/base';
import { Icon, IconNameType } from 'components/icons';
// css
import styles from './mobile-menu.module.css';

// PROPS
interface MobileMenuGroupProps {
  children: ReactNode;
  text: string;
  icon: IconNameType;
  active?: boolean;
  isOpen?: boolean;
  onClick: () => void;
}

// COMPONENT
export const MobileMenuGroup = (props: MobileMenuGroupProps) => {
  const {
    children,
    text,
    icon,
    isOpen = true,
    active = false,
    onClick
  } = props;

  // css
  const classesItem = classNames(
    styles['mobile-menu-item'],
    {
      [styles['mobile-menu-item--active']]: active
    }
  );

  // RENDER
  return (
    <div className={styles['mobile-menu-group']}>
      <div
        className={classesItem}
        role="button"
        tabIndex={0}
        onClick={onClick}
      >
        <Icon
          className={styles['mobile-menu-item__icon']}
          name={icon}
        />
        <Paragraph
          className={styles['mobile-menu-item__text']}
          size="small"
          text={text}
        />
        <Icon
          className={styles['mobile-menu-item__arrow']}
          name={isOpen ? 'ArrowDown' : 'ArrowUp'}
        />
      </div>

      {/* Children */}
      { isOpen && (
        <div className={styles['mobile-menu-group__children']}>
          { children }
        </div>
      ) }
    </div>
  );
};
