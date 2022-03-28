import { useEffect, useState, memo } from 'react';
// router
import { useLocation, useHistory } from 'react-router-dom';
// components
import { Paragraph } from 'components/base';
import { FeedMenu, FeedMenuOptions } from 'components/feed';
// aux.
import { FeedPageDashboard } from '../feed-page-dashboard';
import { FeedPageOrders } from '../feed-page-orders';
// css
import styles from './feed-page-mobile.module.css';

interface LocationStateInterface {
  command?: string;
  orderId?: string;
}

// COMPONENT
export const FeedPageMobile = memo(() => {
  const [
    currentTab,
    setCurrentTab
  ] = useState<FeedMenuOptions>(FeedMenuOptions.Orders);

  // Get location data
  const location = useLocation<LocationStateInterface>();
  const command = location.state && location.state.command;
  const orderId = (location.state && location.state.orderId) || '';
  // Get history data
  const history = useHistory();
  const { action, push } = history;

  useEffect(() => {
    // Handle just "REPLACE" actions
    if (action !== 'REPLACE') {
      return;
    }
    //
    if (!orderId) {
      return;
    }
    // Handle "openOrderModal" command
    if (command === 'openOrderModal') {
      // push to new url
      push(`/feed/${orderId}`, { background: location });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [action, command, orderId]);

  // RENDER
  return (
    <div className={styles['feed-page']}>
      <section className={styles['feed-page__section-feed']}>

        {/* HEADER */}
        <Paragraph
          className={styles['feed-page__header']}
          size="large"
          text="Лента заказов"
        />

        {/* MENU */}
        <FeedMenu
          className={styles['feed-page__menu']}
          activeTab={currentTab}
          onClick={(data) => setCurrentTab(data)}
        />

        {/* CONTENT */}
        <div className={styles['feed-page__content']}>

          {/* ORDERS */}
          { currentTab === FeedMenuOptions.Orders && <FeedPageOrders /> }

          {/* DASHBOARD */}
          { currentTab === FeedMenuOptions.Statistics && <FeedPageDashboard /> }

        </div>

      </section>
    </div>
  );
});
