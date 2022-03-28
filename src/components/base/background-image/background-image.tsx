/* eslint-disable react/self-closing-comp */

import { CSSProperties } from 'react';
// third-party libraries
import classNames from 'classnames';
// css
import styles from './background-image.module.css';

// PROPS
interface BackgroundImageProps {
  src: string;
  className?: string;
}

// COMPONENT
export const BackgroundImage = (props: BackgroundImageProps) => {
  const { src, className = '' } = props;

  // css
  const classes = classNames(
    styles['background-image'],
    className
  );

  // define background-image
  const imgStyle: CSSProperties = {
    backgroundImage: `url(${src})`,
  };

  // RENDER
  return (
    <div
      className={classes}
      style={imgStyle}
    >
    </div>
  );
};
