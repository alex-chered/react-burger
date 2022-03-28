// store
import { useAppSelector } from 'store';
import { commonSelectors } from 'store/common';
// aux.
import { ProfilePageDesktop } from './profile-page-desktop';
import { ProfilePageMobile } from './profile-page-mobile';

const {
  modeSelector
} = commonSelectors;

export const ProfilePage = () => {
  const { mode } = useAppSelector(modeSelector);

  // RENDER
  return (
    <>
      {/* FOR DESKTOP */}
      { mode === 'desktop' && <ProfilePageDesktop /> }
      {/* FOR MOBILE */}
      { mode === 'mobile' && <ProfilePageMobile /> }
    </>
  );
};
