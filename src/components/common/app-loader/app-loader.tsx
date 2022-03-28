/* eslint-disable react/self-closing-comp */

import ReactDOM from 'react-dom';
// components
import { Overlay } from 'components/base';
// css
import styles from './app-loader.module.css';

// Get the element where modal windows will be rendered
const divReactModals = document.getElementById('react-modals');

// COMPONENT
export const AppLoader = () => {
  // If there is no the required "div",
  // return nothing
  if (!divReactModals) {
    return null;
  }

  // RENDER
  return ReactDOM.createPortal(
    (
      <Overlay className={styles['app-loader__overlay']}>
        <div className={styles['app-loader']}>
          <div></div>
          <div></div>
        </div>
      </Overlay>
    ),
    divReactModals
  );
};
