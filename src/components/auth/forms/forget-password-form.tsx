import {
  memo,
  useState,
  ChangeEvent
} from 'react';
// router
import { Redirect } from 'react-router-dom';
// components
import { Input } from 'components/yandex';
// store
import { useAppSelector } from 'store';
import { authSelectors } from 'store/auth';
// hooks
import { useAuth } from 'hooks/auth';
import { useToasts } from 'hooks/toasts';
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
  isEmail
} from 'utils/validation/rules';
// aux.
import { AuthForm } from './auth-form';

// Get selectors
const { loadingSelector } = authSelectors;

// VALIDATION RULES
const emailValidations: RuleType[] = [
  required('Email'),
  isEmail('Email')
];

// PROPS
interface ForgetPasswordFormProps {
  className?: string;
}

// COMPONENT
export const ForgetPasswordForm = memo((props: ForgetPasswordFormProps) => {
  const { className } = props;

  // Email
  const [email, setEmail] = useState<string>('');

  //
  const [canRedirectToReset, setCanRedirectToReset] = useState<boolean>(false);

  // This states store data:
  // - if the fields are correct
  // - the error text
  const [
    emailValidationState,
    setEmailValidationState
  ] = useState<ValidationResultType>(validateInput(email, emailValidations));

  // This states store the flags whether errors should be displayed or not
  const [showEmailError, setShowEmailError] = useState<boolean>(false);

  // Get auth data and methods
  const { forgetPassword } = useAuth();
  const { loading } = useAppSelector(loadingSelector);

  // Get functions for notifications
  const { toastError, toastInformation } = useToasts();

  // EMAIL -> onChange
  const onChangeEmailHadnler = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setEmail(value);
    // Check the current value of the email
    setEmailValidationState(validateInput(value, emailValidations));
    // Hide the text error when users edit the 'Email' field
    setShowEmailError(false);
  };

  // FORM -> onSubmit
  const onSubmitFormHandler = async () => {
    // Set the flag to show errors
    setShowEmailError(true);

    // Return if the email isn't correct
    if (!emailValidationState.valid) {
      return;
    }

    try {
      const result = await forgetPassword(email);

      if (!result) {
        return;
      }

      // notify user
      toastInformation('Дальнейшие инструкции высланы вам на почту');

      setCanRedirectToReset(true);
    } catch (err: unknown) {
      const message = (err as IRejectedValue).error;
      toastError(message);
    }
  };

  // If the "ForgerPassword" request was successful,
  // redirect to the next step
  if (canRedirectToReset) {
    return (
      <Redirect to={{
        pathname: '/reset-password',
        state: { from: 'forget-password' }
      }}
      />
    );
  }

  // RENDER
  return (
    <AuthForm
      className={className}
      actionText="Восстановить"
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

    </AuthForm>
  );
});
