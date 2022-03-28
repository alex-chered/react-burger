// router
import { useRouteMatch, useHistory } from 'react-router-dom';
// components
import {
  SideMenu,
  SideMenuElement,
  SideMenuElementAction
} from 'components/base';
// hooks
import { useAuth } from 'hooks/auth';
import { useToasts } from 'hooks/toasts';
// types
import { IRejectedValue } from 'store/types';
// css
import styles from './profile-page-menu.module.css';

// COMPONENT
export const ProfilePageMenu = () => {
  const { logoutUser } = useAuth();

  const match1 = useRouteMatch('/profile');
  const match2 = useRouteMatch('/profile/orders');
  const match3 = useRouteMatch('/profile/orders/:orderId');

  const history = useHistory();

  // Get functions for notifications
  const { toastError } = useToasts();

  // Define when to show menu
  const showMenu = match1?.isExact
    || match2?.isExact
    || (match3 && history.action === 'PUSH');

  // console.log(history);

  // NO RENDER
  if (!showMenu) {
    return null;
  }

  // Function to logout from the system and notify user of a failure
  const logout = async () => {
    try {
      await logoutUser();
    } catch (err: unknown) {
      const message = (err as IRejectedValue).error;
      toastError(message);
    }
  };

  // RENDER
  return (
    <SideMenu className={styles['profile-page__side-menu']}>
      <SideMenuElement
        text="Профиль"
        to="/profile"
      />
      <SideMenuElement
        text="История заказов"
        to="/profile/orders"
      />
      <SideMenuElementAction
        text="Выход"
        onClick={logout}
      />
    </SideMenu>
  );
};
