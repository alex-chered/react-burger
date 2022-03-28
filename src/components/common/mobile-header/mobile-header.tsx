// router
import { Link } from 'react-router-dom';
// components
import { LogoIcon, MenuBurgerIcon } from 'components/base';
// hooks
import { useToggle } from 'hooks/common';
// aux.
import { MobileHeaderMenu } from './auxiliary';
// css
import styles from './mobile-header.module.css';

// COMPONENT
export const MobileHeader = () => {
  const {
    state: menuIsOpen,
    on: showMenu,
    off: closeMenu
  } = useToggle(false);

  // RENDER
  return (
    <header className={styles['mobile-header']}>
      <Link to="/">
        <LogoIcon />
      </Link>

      {/* Toggle Menu */}
      <MenuBurgerIcon
        onClick={showMenu}
      />

      {/* Menu */}
      <MobileHeaderMenu
        show={menuIsOpen}
        onClose={closeMenu}
      />
    </header>
  );
};
