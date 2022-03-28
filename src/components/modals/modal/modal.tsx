import ReactDOM from 'react-dom';
// router
import { useHistory } from 'react-router-dom';
// third-party libraries
import classNames from 'classnames';
// components
import { Overlay } from 'components/base';
// aux.
import { ModalHeader } from './modal-header';
// css
import styles from './modal.module.css';

// Get the element where modal windows will be rendered
const divReactModals = document.getElementById('react-modals');

// PROPS
interface ModalProps {
  // showCloseButton?: boolean,
  header?: string;
  headerMode?: 'text' | 'digits';
  hasOwnRoute?: boolean;
  children?: React.ReactNode;
  position?: 'center';
  className?: string;
  onClose?: () => void;
}

// COMPONENT
export const Modal = (props: ModalProps) => {
  const {
    className = '',
    // showCloseButton = true,
    header,
    headerMode = 'text',
    position = 'center',
    hasOwnRoute = false,
    children,
    onClose
  } = props;

  const { goBack } = useHistory();

  // If there is no the required "div",
  // return nothing
  if (!divReactModals) {
    return null;
  }

  // EVENT HANDLERS
  const onClickModalHandler = (e: React.MouseEvent<HTMLDivElement>): void => {
    // stop bubbling the event,
    // because we don't want to run the overlay's handler
    e.stopPropagation();
  };
  // CLOSE -> Click
  const onCloseHandler = () => {
    onClose && onClose();
    // Go to the previous page
    if (hasOwnRoute) {
      goBack();
    }
  };

  // css
  const classes = classNames(
    styles['modal'],
    className
  );
  const classesOverlay = classNames(
    {
      [styles['modal--position_center']]: position === 'center'
    }
  );

  // RENDER
  return ReactDOM.createPortal(
    (
      <Overlay
        className={classesOverlay}
        onClick={onCloseHandler}
      >

        <div
          className={classes}
          onClick={onClickModalHandler}
          role="presentation"
        >

          {/* HEADER */}
          <ModalHeader
            header={header}
            headerMode={headerMode}
            onClick={onCloseHandler}
          />

          {/* CONTENT */}
          { children }

        </div>

      </Overlay>
    ),
    divReactModals
  );
};
