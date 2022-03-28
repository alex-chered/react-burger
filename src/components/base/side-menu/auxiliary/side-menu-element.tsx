// router
import { Link, useRouteMatch } from 'react-router-dom';
// third-party libraries
import classNames from 'classnames';
// components
import { Paragraph } from 'components/base';
// css
import styles from '../side-menu.module.css';

// PROPS
interface SideMenuElementProps {
  text: string;
  to: string;
}

// COMPONENT
export const SideMenuElement = (props: SideMenuElementProps) => {
  const { text, to } = props;

  const match = useRouteMatch({
    path: to,
    exact: true
  });

  const active = match?.isExact || false;
  // css
  const classesRoot: string = classNames(
    styles['side-menu-element'],
    {
      [`${styles['side-menu-element--active']}`]: active
    }
  );

  // RENDER
  return (
    <Link
      className={classesRoot}
      to={to}
    >
      <Paragraph
        className={styles['side-menu-element__text']}
        size="medium"
        text={text}
      />
    </Link>
  );
};
