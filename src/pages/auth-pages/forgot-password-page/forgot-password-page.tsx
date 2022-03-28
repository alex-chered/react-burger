// components
import { Paragraph } from 'components/base';
import {
  ForgetPasswordForm,
  LinkPanel,
  LinkPanelElement
} from 'components/auth';
// css
import styles from '../auth-page.module.css';

// COMPONENT
export const ForgotPasswordPage = () => {
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
        <ForgetPasswordForm
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
