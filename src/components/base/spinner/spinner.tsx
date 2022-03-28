/* eslint-disable react/self-closing-comp */

// third-party libraries
import classNames from 'classnames';
// css
import styles from './spinner.module.css';

// Downloaded from https://loading.io

// PROPS
interface SpinnerProps {
  className?: string;
}

// COMPONENT
export const Spinner = (props: SpinnerProps) => {
  const { className } = props;

  // css
  const classes = classNames(
    styles['spinner'],
    className
  );

  // RENDER
  return (
    <div className={classes}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};
