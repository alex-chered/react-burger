import { useCallback, useState } from 'react';
// components
import { Input } from 'components/yandex';

// PROPS
interface PasswordInputProps {
  value: string;
  name?: string;
  placeholder?: string;
  disabled?: boolean;
  size?: 'default' | 'small';
  error?: boolean;
  errorText?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

// COMPONENT
export const PasswordInput = (props: PasswordInputProps) => {
  const {
    value,
    name = '',
    placeholder = '',
    size = 'default',
    error = false,
    errorText = '',
    disabled = false,
    onChange
  } = props;

  const [showPassword, setShowPassword] = useState<boolean>(false);

  // EVENT HANDLERS
  //
  const onClickIconHandler = useCallback(() => {
    setShowPassword((state) => !state);
  }, []);

  // RENDER
  return (
    <Input
      value={value}
      name={name}
      placeholder={placeholder}
      type={showPassword ? 'text' : 'password'}
      icon={showPassword ? 'HideIcon' : 'ShowIcon'}
      size={size}
      error={error}
      errorText={errorText}
      disabled={disabled}
      onChange={onChange}
      onIconClick={onClickIconHandler}
    />
  );
};
