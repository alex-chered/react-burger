// components
import { HeaderMenu, HeaderMenuItem } from 'components/base';
// css
import styles from '../app-header.module.css';

// COMPONENT
export const AppHeaderMainMenu = () => {
  // RENDER
  return (
    <HeaderMenu className={styles['app-header__main-menu']}>
      <HeaderMenuItem
        text="Конструктор"
        url="/"
        icon="BurgerIcon"
      />
      <HeaderMenuItem
        text="Лента заказов"
        url="/feed"
        icon="ListIcon"
      />
    </HeaderMenu>
  );
};
