// components
import { Paragraph } from 'components/base';
import { ProfileForm } from 'components/profile';
// css
import styles from './profile-page-profile-form.module.css';

// COMPONENT
export const ProfilePageProfileForm = () => {
  // RENDER
  return (
    <div className={styles['profile-page__form']}>

      {/* HEADER */}
      <Paragraph
        className={styles['profile-page__form-header']}
        text="Профиль"
        size="large"
      />

      {/* FORM */}
      <ProfileForm />

    </div>
  );
};
