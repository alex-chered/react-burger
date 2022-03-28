// third-party libraries
import classNames from 'classnames';
// components
import { Tab } from 'components/yandex';
// css
import styles from './feed-menu.module.css';

export enum FeedMenuOptions {
  Orders = 'orders',
  Statistics = 'statistics'
}

// PROPS
interface FeedMenuProps {
  activeTab: FeedMenuOptions;
  onClick: (data: FeedMenuOptions) => void;
  className?: string;
}

// COMPONENT
export const FeedMenu = (props: FeedMenuProps) => {
  const { activeTab, onClick, className } = props;

  // EVENT HANDLERS
  const onClickTabHandler = (data: string): void => {
    // Run the event from the props
    onClick && onClick(data as FeedMenuOptions);
  };

  // css
  const classes = classNames(
    styles['feed-menu'],
    className
  );

  // RENDER
  return (
    <div className={classes}>
      <Tab
        value={FeedMenuOptions.Orders}
        active={activeTab === FeedMenuOptions.Orders}
        onClick={onClickTabHandler}
      >
        Заказы
      </Tab>
      <Tab
        value={FeedMenuOptions.Statistics}
        active={activeTab === FeedMenuOptions.Statistics}
        onClick={onClickTabHandler}
      >
        Статистика
      </Tab>
    </div>
  );
};
