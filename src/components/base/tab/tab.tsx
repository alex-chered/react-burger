// third-party libraries
import classNames from 'classnames';
// components
import { Paragraph } from 'components/base';
// css
import styles from './tab.module.css';

// PROPS
interface TabProps<T> {
  text: string;
  value: T;
  active?: boolean;
  onClick: (data: T) => void;
}

// COMPONENT
export const Tab = <T extends unknown>(props: TabProps<T>) => {
  const {
    text,
    value,
    active = false,
    onClick
  } = props;

  // EVENT HANDLERS
  const onClickHandler = () => {
    onClick && onClick(value);
  };

  // css
  const classes = classNames(
    styles['tab'],
    {
      [styles['tab--active']]: active
    }
  );

  // RENDER
  return (
    <div
      className={classes}
      role="presentation"
      onClick={onClickHandler}
    >
      <Paragraph
        text={text}
      />
    </div>
  );
};
