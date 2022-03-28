import { ReactNode, FormEvent } from 'react';
// third-party libraries
import classNames from 'classnames';
// components
import { Button } from 'components/base';
// css
import styles from './auth-form.module.css';

// PROPS
interface AuthFormProps {
  children: ReactNode;
  actionText: string;
  loading?: boolean;
  valid?: boolean;
  onSubmit?: () => void;
  className?: string;
}

// COMPONENT
export const AuthForm = (props: AuthFormProps) => {
  const {
    children,
    actionText,
    loading = false,
    valid = true,
    onSubmit,
    className
  } = props;

  // Handles to form submit
  const onSubmitHandler = (e: FormEvent) => {
    e.preventDefault();
    // Ignore submits while loading
    if (loading) {
      return;
    }
    // Run the submit handler
    onSubmit && onSubmit();
  };

  // css
  const classes = classNames(
    styles['auth-form'],
    className
  );

  // RENDER
  return (
    <form
      className={classes}
      onSubmit={onSubmitHandler}
    >

      {/* Content */}
      {children}

      {/* Button - Submit */}
      <Button
        type="submit"
        text={actionText}
        loading={loading}
        disabled={!valid}
      />

    </form>
  );
};
