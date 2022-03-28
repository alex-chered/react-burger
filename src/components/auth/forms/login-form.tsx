import {
  useState,
  memo,
  ChangeEvent
} from 'react';
// router
import { Redirect, useLocation } from 'react-router-dom';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Location } from 'history';
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

// PROPS
interface LocationStateInterface {
  from: Location<LocationStateInterface>
}

// VALIDATION RULES
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
interface LoginFormProps {
  className?: string;
}

// COMPONENT
export const LoginForm = memo((props: LoginFormProps) => {
  const { className } = props;

  // Determine where the request came from
  const location = useLocation<LocationStateInterface>();
  const from = (location.state && location.state.from.pathname) || '/profile';

  // Email
  const [email, setEmail] = useState<string>('');
  // Password
  const [password, setPassword] = useState<string>('');

  // This states store data:
  // - if the fields are correct
  // - the error text
  const [
    emailValidationState,
    setEmailValidationState
  ] = useState<ValidationResultType>(validateInput(email, emailValidations));
  const [
    passwordValidationState,
    setPasswordValidationState
  ] = useState<ValidationResultType>(validateInput(password, passwordValidations));

  // This states store the flags whether errors should be displayed or not
  const [showEmailError, setShowEmailError] = useState<boolean>(false);
  const [showPasswordError, setShowPasswordError] = useState<boolean>(false);

  // Get auth data and methods
  const { loginUser } = useAuth();
  const { loading } = useAppSelector(loadingSelector);
  const { user: currentUser } = useAppSelector(userSelector);

  // Get functions for notifications
  const { toastError } = useToasts();

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
    setShowEmailError(true);
    setShowPasswordError(true);

    // Return if the email isn't correct
    if (!emailValidationState.valid) {
      return;
    }
    // Return if the email isn't correct
    if (!passwordValidationState.valid) {
      return;
    }

    try {
      await loginUser({ email, password, name: '' });
    } catch (err: unknown) {
      const message = (err as IRejectedValue).error;
      toastError(message);
    }
  };

  // If the current user is authorized in the system,
  // redirect to the home page
  if (currentUser) {
    return <Redirect to={from} />;
  }

  // RENDER
  return (
    <AuthForm
      className={className}
      actionText="Войти"
      loading={loading}
      onSubmit={onSubmitFormHandler}
    >

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

    </AuthForm>
  );
});
