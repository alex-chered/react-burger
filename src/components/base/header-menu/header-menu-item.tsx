// router
import { NavLink } from 'react-router-dom';
// third-party libraries
import classNames from 'classnames';
// components
import { Paragraph } from 'components/base';
import { Icon, IconNameType } from 'components/icons';
// css
import styles from './header-menu.module.css';

// PROPS
export interface HeaderMenuItemProps {
  text: string;
  url: string;
  icon: IconNameType;
  className?: string;
}

// COMPONENT
export const HeaderMenuItem = (props: HeaderMenuItemProps) => {
  const {
    text,
    icon,
    url,
    className = ''
  } = props;

  // css
  const classes = classNames(
    styles['menu-item'],
    className
  );

  // RENDER
  return (
    <NavLink
      className={classes}
      activeClassName={styles['menu-item--active']}
      exact
      to={url}
    >

      <Icon
        className={styles['menu-item__icon']}
        name={icon}
      />

      {/* Text */}
      <Paragraph
        className={styles['menu-item__text']}
        text={text}
      />

    </NavLink>
  );
};
