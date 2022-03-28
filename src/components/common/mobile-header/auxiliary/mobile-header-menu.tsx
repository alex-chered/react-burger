// router
import { useRouteMatch } from 'react-router-dom';
// third-party libraries
import classNames from 'classnames';
// components
import {
  MobileMenu,
  MobileMenuGroup,
  MobileMenuItem,
  MobileMenuAction,
  CloseIcon,
  Overlay
} from 'components/base';
// hooks
import { useAuth } from 'hooks/auth';
import { useToggle } from 'hooks/common';
import { useToasts } from 'hooks/toasts';
// store
import { useAppSelector } from 'store';
import { authSelectors } from 'store/auth';
// css
import styles from '../mobile-header.module.css';

// Get selectors
const { userSelector } = authSelectors;

// PROPS
interface MobileHeaderMenuProps {
  show?: boolean;
  onClose?: () => void;
}

// COMPONENT
export const MobileHeaderMenu = (props: MobileHeaderMenuProps) => {
  const { onClose, show = true } = props;

  const { logoutUser } = useAuth();

  const { toastSuccess, toastError } = useToasts();

  // Get current user
  const { user } = useAppSelector(userSelector);

  // Define if the current route is profile
  const profileMacth = useRouteMatch('/profile');
  const isProfileRoute = profileMacth?.isExact || false;

  const profileOrdersMacth = useRouteMatch('/profile/orders');
  const isProfileOrdersRoute = profileOrdersMacth?.isExact || false;

  const isProfile = isProfileRoute
    || isProfileOrdersRoute;

  const {
    state: isProfileOpen,
    toggle: toggleProfile
  } = useToggle(isProfile);

  const logoutUserExt = () => {
    logoutUser()
      .then(() => {
        toastSuccess('Вы вышли из системы');
        onClose && onClose();
      })
      .catch(() => {
        toastError('Возникла ошибка при операции');
      });
  };

  // css
  const classes = classNames(
    styles['mobile-header__menu'],
    {
      [styles['mobile-header__menu--show']]: show
    }
  );

  // RENDER
  return (
    <>
      { show && <Overlay onClick={onClose} /> }

      <div
        className={classes}
      >
        {/* Menu Header */}
        <div className={styles['mobile-header__menu-top']}>
          <p className={styles['mobile-header__menu-header']}>
            Меню
          </p>
          <CloseIcon onClick={onClose} />
        </div>

        {/* Menu */}
        <MobileMenu>

          {/* Group - Profile */}
          <MobileMenuGroup
            text="Личный кабинет"
            icon="ProfileIcon"
            active={isProfile}
            isOpen={isProfileOpen}
            onClick={toggleProfile}
          >
            <MobileMenuItem
              text="Профиль"
              url="/profile"
              onClick={onClose}
            />
            <MobileMenuItem
              text="История заказов"
              url="/profile/orders"
              onClick={onClose}
            />
            {
              user && (
                <MobileMenuAction
                  text="Выход"
                  onClick={logoutUserExt}
                />
              )
            }
          </MobileMenuGroup>

          <MobileMenuItem
            text="Конструктор бургеров"
            url="/"
            icon="BurgerIcon"
            onClick={onClose}
          />

          <MobileMenuItem
            text="Лента заказов"
            url="/feed"
            icon="ListIcon"
            onClick={onClose}
          />
        </MobileMenu>
      </div>
    </>
  );
};
