// third-party libraries
import classNames from 'classnames';
// css
import styles from './side-menu.module.css';

// PROPS
interface SideMenuProps {
  children: JSX.Element[] | JSX.Element;
  className?: string;
}

// COMPONENT
export const SideMenu = (props: SideMenuProps) => {
  const { children, className = '' } = props;

  // css
  const classes = classNames(
    styles['side-menu'],
    className
  );

  // RENDER
  return (
    <nav className={classes}>
      { children }
    </nav>
  );
};
