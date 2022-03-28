// third-party libraries
import classNames from 'classnames';
// components
import { Spinner } from 'components/base';
// css
import styles from './button.module.css';

// PROPS
interface ButtonProps {
  text: string;
  type?: 'submit' | 'button';
  loading?: boolean;
  disabled?: boolean;
  size?: 'default' | 'small' | 'large';
  className?: string;
  onClick?: () => void;
}

// COMPONENT
export const Button = (props: ButtonProps) => {
  const {
    text,
    type = 'button',
    loading = false,
    disabled = false,
    size = 'default',
    className = '',
    onClick
  } = props;

  // css-classes for the root element
  const classRoot = classNames(
    styles['button-wrapper'],
    className
  );

  // css-classes for the button
  const classButton = classNames(
    styles['button'],
    {
      [styles['button--default']]: size === 'default',
      [styles['button--large']]: size === 'large',
      [styles['button--small']]: size === 'small',
      [styles['button--loading']]: loading
    }
  );

  // Handles to click the button
  const onClickHandler = () => {
    if (loading) {
      return;
    }
    onClick && onClick();
  };

  // RENDER
  return (
    <div className={classRoot}>
      <input
        className={classButton}
        type={type}
        value={text}
        disabled={disabled}
        onClick={onClickHandler}
      />
      {/* Spinner when loading */}
      { loading && <Spinner className={styles['button__spinner']} /> }
    </div>
  );
};
