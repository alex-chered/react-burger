import {
  useState,
  memo,
  CSSProperties,
  FormEvent,
  ChangeEvent,
  useCallback
} from 'react';
// third-party libraries
import classNames from 'classnames';
// hooks
import { useAuth } from 'hooks/auth';
import { useToasts } from 'hooks/toasts';
// store
import { useAppSelector } from 'store';
import { authSelectors } from 'store/auth';
// components
import { Button, Paragraph, PasswordInput } from 'components/base';
import { Input } from 'components/yandex';
// types
import { IRejectedValue } from 'store/types';
// utils
import {
  validateInput,
  RuleType,
  ValidationResultType
} from 'utils/validation';
import {
  required,
  isEmail,
  areValidChacters,
  isPasswordCorrectLength
} from 'utils/validation/rules';
// css
import styles from './profile-form.module.css';

// Get required selectors
const { userSelector, loadingSelector } = authSelectors;

// PROPS
interface ProfileFormProps {
  className?: string;
}

// VALIDATION RULES
const nameValidations: RuleType[] = [
  required('Имя пользователя'),
];
const emailValidations: RuleType[] = [
  required('Email'),
  isEmail('Email')
];
const passwordValidations: RuleType[] = [
  areValidChacters('Пароль'),
  isPasswordCorrectLength('Пароль', 6, 15)
];

// COMPONENT
export const ProfileForm = memo((props: ProfileFormProps) => {
  const { className } = props;

  // Get auth data
  const { user: currentUser } = useAppSelector(userSelector);
  const { loading } = useAppSelector(loadingSelector);
  // Get auth functions
  const { updateUser } = useAuth();

  // ProfileForm is in ProtectedRoute, so currentUser is never equal to null.
  // So we use exclamation mark operator
  // Name - state
  const [name, setName] = useState<string>(currentUser?.name || '');
  // Email - setEmail
  const [email, setEmail] = useState<string>(currentUser?.email || '');
  // Password - state
  // We can just change a password, not view it
  const [password, setPassword] = useState<string>('');

  // Save initial values of user data
  const [initialName, setInitialName] = useState<string>(currentUser?.name || '');
  const [initialEmail, setInitialEmail] = useState<string>(currentUser?.email || '');

  // In this state we store the flag, that update user operation completed
  // const [updateUserCompleted, setUpdateUserCompleted] = useState<boolean>(false);

  // This states store data:
  // - if the fields are correct
  // - the error text
  const [
    nameValidationState,
    setNameValidationState
  ] = useState<ValidationResultType>(validateInput(name, nameValidations));
  const [
    emailValidationState,
    setEmailValidationState
  ] = useState<ValidationResultType>(validateInput(email, emailValidations));
  const [
    passwordValidationState,
    setPasswordValidationState
  ] = useState<ValidationResultType>(validateInput(password, passwordValidations));

  // This states store the flags whether errors should be displayed or not
  const [showNameError, setShowNameError] = useState<boolean>(false);
  const [showEmailError, setShowEmailError] = useState<boolean>(false);
  const [showPasswordError, setShowPasswordError] = useState<boolean>(false);

  // Get functions for notifications
  const { toastSuccess, toastError } = useToasts();

  // Function cancels changes to user data.
  const cancelChanges = (): void => {
    setName(initialName);
    setEmail(initialEmail);
    setPassword('');
  };

  // Function updates initial values
  const updateInitialValues = useCallback((): void => {
    setInitialName(name);
    setInitialEmail(email);
    setPassword('');
  }, [name, email]);

  // NO CURRENT USER
  if (!currentUser) {
    return null;
  }

  // Define, whether the form changed
  const isChanged = (): boolean => {
    return name !== initialName
      || email !== initialEmail
      || password !== '';
  };

  // If there are no changes,
  // hide the block with actions
  const styleActions: CSSProperties = isChanged()
    ? {}
    : { display: 'none' };

  //
  const isValid = (): boolean => {
    return nameValidationState.valid
      && emailValidationState.valid
        && (password ? passwordValidationState.valid : true);
  };

  // FORM -> onSubmit
  const onSubmitHandler = async (e: FormEvent) => {
    e.preventDefault();

    // Ignore submits while requesting
    if (loading) {
      return;
    }

    // Set the flag to show errors
    setShowNameError(true);
    setShowEmailError(true);
    setShowPasswordError(true && !!password);

    // Return if the data is incorrect
    if (!isValid()) {
      return;
    }

    try {
      // Do a request to update user
      const result = await updateUser({ name, email, password });

      if (!result) {
        return;
      }

      // Notify users about success
      toastSuccess('Данные пользователя успешно обновлены!');

      // Update initial values
      updateInitialValues();
    } catch (err: unknown) {
      const message = (err as IRejectedValue).error;
      toastError(message);
    }
  };

  // USERNAME -> onChange
  const onChangeNameHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setName(value);
    // Check the current value of the field
    setNameValidationState(validateInput(value, nameValidations));
    // Hide the text error when users edit the field
    setShowNameError(false);
  };

  // EMAIL -> onChange
  const onChangeEmailHadnler = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setEmail(value);
    // Check the current value of the field
    setEmailValidationState(validateInput(value, emailValidations));
    // Hide the text error when users edit the field
    setShowEmailError(false);
  };

  // PASSWORD -> onChange
  const onChangePasswordHadnler = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setPassword(value);
    // Check the current value of the field
    setPasswordValidationState(validateInput(value, passwordValidations));
    // Hide the text error when users edit the field
    setShowPasswordError(false);
  };

  // css
  const classes = classNames(
    styles['profile-form'],
    className
  );

  // RENDER
  return (
    <form
      className={classes}
      onSubmit={onSubmitHandler}
    >
      {/* User Name */}
      <Input
        name="name"
        value={name}
        placeholder="Имя пользователя"
        error={showNameError && !nameValidationState.valid}
        errorText={nameValidationState.message}
        onChange={onChangeNameHandler}
      />

      {/* Email */}
      <Input
        name="email"
        value={email}
        placeholder="Email"
        error={showEmailError && !emailValidationState.valid}
        errorText={emailValidationState.message}
        onChange={onChangeEmailHadnler}
      />

      {/* Password */}
      <PasswordInput
        name="password"
        value={password}
        placeholder="Пароль"
        error={showPasswordError && !passwordValidationState.valid}
        errorText={passwordValidationState.message}
        onChange={onChangePasswordHadnler}
      />

      {/* Actions */}
      <div
        className={styles['profile-form__actions']}
        style={styleActions}
      >
        {/* Link "Cancel" */}
        <Paragraph
          className={styles['profile-form__link']}
          onClick={cancelChanges}
          text="Отмена"
        />
        {/* Button "Save" */}
        <Button
          className={styles['profile-form__save']}
          text="Сохранить"
          type="submit"
          loading={loading}
        />
      </div>

    </form>
  );
});
