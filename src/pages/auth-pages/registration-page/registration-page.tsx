// components
import { Paragraph } from 'components/base';
import {
  RegistrationForm,
  LinkPanel,
  LinkPanelElement
} from 'components/auth';
// css
import styles from '../auth-page.module.css';

// COMPONENT
export const RegistrationPage = () => {
  return (
    <div className={styles['auth-page']}>
      <div className={styles['auth-page__content']}>

        {/* HEADER */}
        <Paragraph
          className={styles['auth-page__header']}
          text="Регистрация"
          size="large"
        />

        {/* FORM */}
        <RegistrationForm
          className={styles['auth-page__form']}
        />

        {/* LINK PANEL */}
        <LinkPanel className={styles['auth-page__link-panel']}>
          <LinkPanelElement
            question="Уже зарегистрированы?"
            linkText="Войти"
            to="/login"
          />
        </LinkPanel>

      </div>
    </div>
  );
};
