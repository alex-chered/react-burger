// third-party libraries
import classNames from 'classnames';
// aux.
import { IconProps } from '../icon.props';
import { getClass } from '../utils';

// COMPONENT
export const DragIcon = (props: IconProps) => {
  const {
    type = 'none',
    className,
    onClick
  } = props;

  // css
  const classes = classNames(
    getClass(type),
    className
  );

  // RENDER
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      className={classes}
      onClick={onClick}
    >
      <path fillRule="evenodd" clipRule="evenodd" d="M9.5 5.15375C9.5 6.34325 8.60455 7.3075 7.5 7.3075C6.39545 7.3075 5.5 6.34325 5.5 5.15375C5.5 3.96427 6.39545 3 7.5 3C8.60455 3 9.5 3.96427 9.5 5.15375ZM7.5 14.3075C8.60455 14.3075 9.5 13.3433 9.5 12.1538C9.5 10.9643 8.60455 10 7.5 10C6.39545 10 5.5 10.9643 5.5 12.1538C5.5 13.3433 6.39545 14.3075 7.5 14.3075ZM7.5 21.3075C8.60455 21.3075 9.5 20.3433 9.5 19.1537C9.5 17.9642 8.60455 17 7.5 17C6.39545 17 5.5 17.9642 5.5 19.1537C5.5 20.3433 6.39545 21.3075 7.5 21.3075Z" />
      <path fillRule="evenodd" clipRule="evenodd" d="M18.5 5.15375C18.5 6.34325 17.6045 7.3075 16.5 7.3075C15.3954 7.3075 14.5 6.34325 14.5 5.15375C14.5 3.96427 15.3954 3 16.5 3C17.6045 3 18.5 3.96427 18.5 5.15375ZM16.5 14.3075C17.6045 14.3075 18.5 13.3433 18.5 12.1538C18.5 10.9643 17.6045 10 16.5 10C15.3954 10 14.5 10.9643 14.5 12.1538C14.5 13.3433 15.3954 14.3075 16.5 14.3075ZM16.5 21.3075C17.6045 21.3075 18.5 20.3433 18.5 19.1537C18.5 17.9642 17.6045 17 16.5 17C15.3954 17 14.5 17.9642 14.5 19.1537C14.5 20.3433 15.3954 21.3075 16.5 21.3075Z" />
    </svg>
  );
};
