import { useState, memo, ChangeEvent } from 'react';
// router
import { Redirect } from 'react-router-dom';
// components
import { Input } from 'components/yandex';
import { PasswordInput } from 'components/base';
// hooks
import { useAuth } from 'hooks/auth';
import { useToasts } from 'hooks/toasts';
// store
import { useAppSelector } from 'store';
import { authSelectors } from 'store/auth';
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
  areValidChacters,
  isPasswordCorrectLength
} from 'utils/validation/rules';
// aux.
import { AuthForm } from './auth-form';

// Get selectors
const { loadingSelector } = authSelectors;

// PROPS

// VALIDATION RULES
const passwordValidations: RuleType[] = [
  required('Пароль'),
  areValidChacters('Пароль'),
  isPasswordCorrectLength('Пароль', 6, 15)
];
const codeValidations: RuleType[] = [
  required('Код активации')
];

// PROPS
interface ResetPasswordFormProps {
  className?: string;
}

// COMPONENT
export const ResetPasswordForm = memo((props: ResetPasswordFormProps) => {
  const { className } = props;

  // Get auth data and methods
  const { resetPassword } = useAuth();
  const { loading } = useAppSelector(loadingSelector);

  // Get functions for notifications
  const { toastError, toastSuccess } = useToasts();

  // Password
  const [password, setPassword] = useState<string>('');
  // Activation Code
  const [code, setCode] = useState<string>('');

  //
  const [canRedirectToLogin, setCanRedirectToLogin] = useState<boolean>(false);

  // This states store data:
  // - if the fields are correct
  // - the error text
  const [
    passwordValidationState,
    setPasswordValidationState
  ] = useState<ValidationResultType>(validateInput(password, passwordValidations));
  const [
    codeValidationState,
    setCodeValidationState
  ] = useState<ValidationResultType>(validateInput(code, codeValidations));

  // This states store the flags whether errors should be displayed or not
  const [showPasswordError, setShowPasswordError] = useState<boolean>(false);
  const [showCodeError, setShowCodeError] = useState<boolean>(false);

  // PASSWORD -> onChange
  const onChangePasswordHadnler = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setPassword(value);
    // Check the current value of the email
    setPasswordValidationState(validateInput(value, passwordValidations));
    // Hide the text error when users edit the 'Password' field
    setShowPasswordError(false);
  };

  // CODE -> onChange
  const onChangeEmailHadnler = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setCode(value);
    // Check the current value of the email
    setCodeValidationState(validateInput(value, codeValidations));
    // Hide the text error when users edit the 'Email' field
    setShowCodeError(false);
  };

  // FORM -> onSubmit
  const onSubmitFormHandler = async () => {
    // Set the flag to show errors
    setShowPasswordError(true);
    setShowCodeError(true);

    // Return if the email isn't correct
    if (!codeValidationState.valid) {
      return;
    }
    // Return if the email isn't correct
    if (!passwordValidationState.valid) {
      return;
    }

    try {
      const result = await resetPassword(password, code);

      if (!result) {
        return;
      }

      // notify user
      toastSuccess('Пароль успешно обновлен');

      setCanRedirectToLogin(true);
    } catch (err: unknown) {
      const message = (err as IRejectedValue).error;
      toastError(message);
    }
  };

  // If the "ResetPassword" request was successful,
  // redirect to the login page
  if (canRedirectToLogin) {
    return <Redirect to="/login" />;
  }

  // RENDER
  return (
    <AuthForm
      className={className}
      actionText="Сохранить"
      loading={loading}
      onSubmit={onSubmitFormHandler}
    >
      {/* Password */}
      <PasswordInput
        name="password"
        value={password}
        placeholder="Введите новый пароль"
        error={showPasswordError && !passwordValidationState.valid}
        errorText={passwordValidationState.message}
        onChange={onChangePasswordHadnler}
      />

      {/* Activation Code */}
      <Input
        name="code"
        value={code}
        placeholder="Введите код из письма"
        error={showCodeError && !codeValidationState.valid}
        errorText={codeValidationState.message}
        onChange={onChangeEmailHadnler}
      />

    </AuthForm>
  );
});
