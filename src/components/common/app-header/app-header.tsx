// router
import { Link } from 'react-router-dom';
// third-party libraries
import classNames from 'classnames';
// components
import { Container } from 'components/base';
import { Logo } from 'components/yandex';
// aux. components
import {
  AppHeaderInner,
  AppHeaderLeft,
  AppHeaderMainMenu,
  AppHeaderProfileMenu
} from './auxiliary';
// css
import styles from './app-header.module.css';

// PROPS
interface AppHeaderProps {
  className?: string;
}

// COMPONENT
export const AppHeader = (props: AppHeaderProps) => {
  const { className } = props;

  // css
  const classes = classNames(
    styles['app-header'],
    className
  );

  // RENDER
  return (
    <header className={classes}>
      <Container>
        <AppHeaderInner>

          <AppHeaderLeft>
            {/* Main Menu */}
            <AppHeaderMainMenu />
            {/* Logo */}
            <Link to="/">
              <Logo />
            </Link>
          </AppHeaderLeft>

          {/* Profile Menu */}
          <AppHeaderProfileMenu />

        </AppHeaderInner>
      </Container>
    </header>
  );
};
