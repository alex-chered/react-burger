// router
import { NavLink } from 'react-router-dom';
// third-party libraries
import classNames from 'classnames';
// components
import { Paragraph } from 'components/base';
import { Icon, IconNameType } from 'components/icons';
// css
import styles from './mobile-menu.module.css';

// PROPS
interface MobileMenuItemProps {
  text: string;
  url: string;
  icon?: IconNameType;
  onClick?: () => void;
}

// COMPONENT
export const MobileMenuItem = (props: MobileMenuItemProps) => {
  const {
    text,
    url,
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
    <NavLink
      className={classes}
      activeClassName={styles['mobile-menu-item--active']}
      to={url}
      exact
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
    </NavLink>
  );
};
