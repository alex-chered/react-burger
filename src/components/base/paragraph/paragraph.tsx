import {
  DetailedHTMLProps,
  HTMLAttributes
} from 'react';
// third-party libraries
import classNames from 'classnames';
// css
import styles from './paragraph.module.css';

// PROPS
interface ParagraphProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLParagraphElement>, HTMLParagraphElement> {
    text?: string;
    size?: 'regular' | 'small' | 'medium' | 'large';
}

// COMPONENT
export const Paragraph = (props: ParagraphProps) => {
  const {
    text = '',
    children,
    size = 'regular',
    className = '',
    style,
    onClick
  } = props;

  // css
  const classes = classNames(
    styles['paragraph'],
    {
      [styles['paragraph--regular']]: size === 'regular',
      [styles['paragraph--small']]: size === 'small',
      [styles['paragraph--medium']]: size === 'medium',
      [styles['paragraph--large']]: size === 'large'
    },
    className
  );

  // RENDER
  return (
    <p
      className={classes}
      style={style}
      onClick={onClick}
      role="presentation"
    >
      { children || text }
    </p>
  );
};
