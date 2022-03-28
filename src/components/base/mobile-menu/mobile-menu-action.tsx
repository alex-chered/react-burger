// third-party libraries
import classNames from 'classnames';
// components
import { Paragraph } from 'components/base';
import { Icon, IconNameType } from 'components/icons';
// css
import styles from './mobile-menu.module.css';

// PROPS
interface MobileMenuActionProps {
  text: string;
  icon?: IconNameType;
  onClick?: () => void;
}

// COMPONENT
export const MobileMenuAction = (props: MobileMenuActionProps) => {
  const {
    text,
    icon,
    onClick
  } = props;

  // css
  const classes = classNames(
    styles['mobile-menu-item'],
    {
      [styles['mobile-menu-item--height_small']]: !icon
    }
  );

  // RENDER
  return (
    <div
      className={classes}
      role="button"
      tabIndex={0}
      onClick={onClick}
    >
      {
        icon && (
          <Icon
            className={styles['mobile-menu-item__icon']}
            name={icon}
          />
        )
      }
      <Paragraph
        className={styles['mobile-menu-item__text']}
        size="small"
        text={text}
      />
    </div>
  );
};
