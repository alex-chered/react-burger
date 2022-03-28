// components
import { Paragraph } from 'components/base';
import {
  LoginForm,
  LinkPanel,
  LinkPanelElement
} from 'components/auth';
// css
import styles from '../auth-page.module.css';

// COMPONENT
export const LoginPage = () => {
  return (
    <div className={styles['auth-page']}>
      <div className={styles['auth-page__content']}>

        {/* HEADER */}
        <Paragraph
          className={styles['auth-page__header']}
          text="Вход"
          size="large"
        />

        {/* FORM */}
        <LoginForm
          className={styles['auth-page__form']}
        />

        {/* LINK PANEL */}
        <LinkPanel className={styles['auth-page__link-panel']}>
          <LinkPanelElement
            question="Вы - новый пользователь?"
            linkText="Зарегистрироваться"
            to="/register"
          />
          <LinkPanelElement
            question="Забыли пароль?"
            linkText="Восстановить пароль"
            to="forgot-password"
          />
        </LinkPanel>

      </div>
    </div>
  );
};
