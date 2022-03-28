import {
  DetailedHTMLProps,
  HTMLAttributes
} from 'react';
// third-party libraries
import classNames from 'classnames';

// PROPS
interface SpanProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLSpanElement>, HTMLSpanElement> {
    text?: string;
    size?: 'default' | 'small' | 'medium' | 'large';
}

// COMPONENT
export const Span = (props: SpanProps) => {
  const {
    text = '',
    children,
    size = 'default',
    className = '',
    onClick
  } = props;

  // css
  const classes = classNames(
    {
      'text_type_main-default': size === 'default',
      'text_type_main-small': size === 'small',
      'text_type_main-medium': size === 'medium',
      'text_type_main-large': size === 'large',
    },
    className
  );

  // RENDER
  return (
    <span
      className={classes}
      onClick={onClick}
      role="presentation"
    >
      { children || text }
    </span>
  );
};
