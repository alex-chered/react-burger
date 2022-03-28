// components
import { HeaderMenu, HeaderMenuItem } from 'components/base';

// COMPONENT
export const AppHeaderProfileMenu = () => {
  // RENDER
  return (
    <HeaderMenu>
      <HeaderMenuItem
        text="Личный кабинет"
        url="/profile"
        icon="ProfileIcon"
      />
    </HeaderMenu>
  );
};
