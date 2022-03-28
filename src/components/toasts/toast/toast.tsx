import { useEffect } from 'react';
// third-party libraries
import classNames from 'classnames';
// hooks
import { useTimer } from 'hooks/common';
// components
import { Paragraph } from 'components/base';
import { CloseIcon } from 'components/icons/icons';
// types
import { ToastModel } from 'models';
// aux.
import {
  CheckCircleFill,
  InfoFill,
  ExclamationTriangleFill
} from './svg';
// css
import styles from './toast.module.css';

// PROPS
interface ToastProps {
  toast: ToastModel;
  onRemoved: (id: string) => void;
}

// COMPONENT
export const Toast = (props: ToastProps) => {
  const {
    toast: { id, text, type },
    onRemoved
  } = props;

  // After 5 seconds delete the toast
  const { finished } = useTimer(5);

  useEffect(() => {
    // If the timer is finished,
    // run "onRemoved" from the props
    finished && onRemoved(id);
  }, [finished, id, onRemoved]);

  // When an user clicks on the "Close" button
  const onClickCloseHandler = () => {
    onRemoved(id);
  };

  // css
  const classes = classNames(
    styles['toast'],
    {
      [styles['toast--primary']]: type === 'information',
      [styles['toast--danger']]: type === 'danger',
      [styles['toast--success']]: type === 'success'
    }
  );

  // RENDER
  return (
    <div className={classes}>

      {/* ICON */}
      {
        type === 'information' && (
          <CheckCircleFill
            className={styles['toast__icon']}
          />
        )
      }
      {
        type === 'success' && (
          <InfoFill
            className={styles['toast__icon']}
          />
        )
      }
      {
        type === 'danger' && (
          <ExclamationTriangleFill
            className={styles['toast__icon']}
          />
        )
      }

      {/* TEXT */}
      <Paragraph
        className={styles['toast__text']}
        text={text}
        size="small"
      />

      {/* CLOSE */}
      <CloseIcon
        className={styles['toast__close']}
        name="CloseIcon"
        onClick={onClickCloseHandler}
      />

    </div>
  );
};
