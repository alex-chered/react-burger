import {
  memo,
  useState,
  ChangeEvent
} from 'react';
// router
import { Redirect } from 'react-router-dom';
// hooks
import { useAuth } from 'hooks/auth';
import { useToasts } from 'hooks/toasts';
// store
import { useAppSelector } from 'store';
import { authSelectors } from 'store/auth';
// components
import { Input } from 'components/yandex';
import { PasswordInput } from 'components/base';
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
// aux.
import { AuthForm } from './auth-form';

// Get selectors
const { loadingSelector, userSelector } = authSelectors;

// VALIDATION RULES
const nameValidations: RuleType[] = [
  required('Имя пользователя'),
];
const emailValidations: RuleType[] = [
  required('Email'),
  isEmail('Email')
];
const passwordValidations: RuleType[] = [
  required('Пароль'),
  areValidChacters('Пароль'),
  isPasswordCorrectLength('Пароль', 6, 15)
];

// PROPS
interface RegistrationFormProps {
  className?: string;
}

// COMPONENT
export const RegistrationForm = memo((props: RegistrationFormProps) => {
  const { className } = props;

  // Name
  const [username, setUsername] = useState<string>('');
  // Email
  const [email, setEmail] = useState<string>('');
  // Password
  const [password, setPassword] = useState<string>('');

  // This states store data:
  // - if the fields are correct
  // - the error text
  const [
    usernameValidationState,
    setUsernameValidationState
  ] = useState<ValidationResultType>(validateInput(username, nameValidations));
  const [
    emailValidationState,
    setEmailValidationState
  ] = useState<ValidationResultType>(validateInput(email, emailValidations));
  const [
    passwordValidationState,
    setPasswordValidationState
  ] = useState<ValidationResultType>(validateInput(password, passwordValidations));

  // This states store the flags whether errors should be displayed or not
  const [showUsernameError, setShowUsernameError] = useState<boolean>(false);
  const [showEmailError, setShowEmailError] = useState<boolean>(false);
  const [showPasswordError, setShowPasswordError] = useState<boolean>(false);

  // Get the function to register user
  const { registerUser } = useAuth();
  const { loading } = useAppSelector(loadingSelector);
  const { user: currentUser } = useAppSelector(userSelector);

  // Get functions for notifications
  const { toastError } = useToasts();

  // Checks if data is correct
  const isValid = (): boolean => {
    return usernameValidationState.valid
      && emailValidationState.valid
      && passwordValidationState.valid;
  };

  // USERNAME -> onChange
  const onChangeUsernameHadnler = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setUsername(value);
    // Check the current value of the username
    setUsernameValidationState(validateInput(value, nameValidations));
    // Hide the text error when users edit the field
    setShowUsernameError(false);
  };

  // EMAIL -> onChange
  const onChangeEmailHadnler = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setEmail(value);
    // Check the current value of the email
    setEmailValidationState(validateInput(value, emailValidations));
    // Hide the text error when users edit the 'Email' field
    setShowEmailError(false);
  };

  // PASSWORD -> onChange
  const onChangePasswordHadnler = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setPassword(value);
    // Check the current value of the email
    setPasswordValidationState(validateInput(value, passwordValidations));
    // Hide the text error when users edit the 'Password' field
    setShowPasswordError(false);
  };

  // FORM -> onSubmit
  const onSubmitFormHandler = async () => {
    // Set the flag to show errors
    setShowUsernameError(true);
    setShowEmailError(true);
    setShowPasswordError(true);

    //
    if (!isValid()) {
      return;
    }

    try {
      await registerUser({ email, password, name: username });
    } catch (err: unknown) {
      const message = (err as IRejectedValue).error;
      toastError(message);
    }
  };

  // If the current user is authorized in the system,
  // redirect to the profile page
  if (currentUser) {
    return <Redirect to="/profile" />;
  }

  // RENDER
  return (
    <AuthForm
      className={className}
      actionText="Зарегистрироваться"
      loading={loading}
      onSubmit={onSubmitFormHandler}
    >

      {/* UserName */}
      <Input
        name="username"
        value={username}
        placeholder="Имя пользователя"
        error={showUsernameError && !usernameValidationState.valid}
        errorText={usernameValidationState.message}
        onChange={onChangeUsernameHadnler}
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

      {/* Passsword */}
      <PasswordInput
        name="password"
        value={password}
        placeholder="Пароль"
        error={showPasswordError && !passwordValidationState.valid}
        errorText={passwordValidationState.message}
        onChange={onChangePasswordHadnler}
      />

    </AuthForm>
  );
});
