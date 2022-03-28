// router
import { useHistory, useLocation, Redirect } from 'react-router-dom';
// components
import { Paragraph } from 'components/base';
import {
  ResetPasswordForm,
  LinkPanel,
  LinkPanelElement
} from 'components/auth';
// css
import styles from '../auth-page.module.css';

interface LocationStateInterface {
  from: string
}

// COMPONENT
export const ResetPasswordPage = () => {
  // Get information about how an user get this page
  const { action } = useHistory();
  const location = useLocation<LocationStateInterface>();
  const from = (location.state && location.state.from) || '';

  if (action === 'POP' || from !== 'forget-password') {
    return <Redirect to="/login" />;
  }

  // RENDER
  return (
    <div className={styles['auth-page']}>
      <div className={styles['auth-page__content']}>

        {/* HEADER */}
        <Paragraph
          className={styles['auth-page__header']}
          text="Восстановление пароля"
          size="large"
        />

        {/* FORM */}
        <ResetPasswordForm
          className={styles['auth-page__form']}
        />

        {/* LINK PANEL */}
        <LinkPanel className={styles['auth-page__link-panel']}>
          <LinkPanelElement
            question="Вспомнили пароль?"
            linkText="Войти"
            to="/login"
          />
        </LinkPanel>

      </div>
    </div>
  );
};
