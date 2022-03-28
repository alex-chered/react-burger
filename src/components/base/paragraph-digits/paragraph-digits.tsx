import {
  DetailedHTMLProps,
  HTMLAttributes
} from 'react';
// third-party libraries
import classNames from 'classnames';
// css
import styles from './paragraph-digits.module.css';

// PROPS
interface ParagraphDigitsProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLParagraphElement>, HTMLParagraphElement> {
    text?: string | number | undefined;
    size?: 'regular' | 'medium' | 'large';
    shadowed?: boolean;
}

// COMPONENT
export const ParagraphDigits = (props: ParagraphDigitsProps) => {
  const {
    text,
    size = 'regular',
    shadowed = false,
    children,
    className = '',
    onClick
  } = props;

  // css
  const classes = classNames(
    styles['paragraph-digits'],
    {
      [styles['paragraph-digits--regular']]: size === 'regular',
      [styles['paragraph-digits--medium']]: size === 'medium',
      [styles['paragraph-digits--large']]: size === 'large',
      [styles['paragraph-digits--shadowed']]: shadowed
    },
    className
  );

  // RENDER
  return (
    <p
      className={classes}
      onClick={onClick}
      role="presentation"
    >
      { children || text }
    </p>
  );
};
