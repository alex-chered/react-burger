import { useEffect, useState } from 'react';
// router
import { useParams, useHistory } from 'react-router-dom';
// components
import { ParagraphDigits } from 'components/base';
import {
  OrderInfo,
  AppLoader,
  AppMessage
} from 'components/common';
// store
import { useAppSelector } from 'store';
import { ingredientsSelectors } from 'store/ingredients';
import { feedSelectors } from 'store/feed';
import { commonSelectors } from 'store/common';
// hooks
import { useFeedActions } from 'hooks/feed';
import { useIngredientsActions } from 'hooks/ingredients';
// css
import styles from './order-page.module.css';

// Get required selectors
const {
  dataLengthSelector,
  loadingSelector,
  errorTextSelector
} = ingredientsSelectors;
const {
  currentOrderSelector,
  loadingSelector: feedLoadingSelector,
  errorTextSelector: feedErrorTextSelector
} = feedSelectors;
const {
  modeSelector
} = commonSelectors;

// COMPONENT
export const OrderPage = () => {
  const [preloadCompleted, setPreloadCompleted] = useState<boolean>(false);

  // Get the current order number from params
  const { orderId } = useParams<{ orderId: string }>();

  // Get method to fetch ingredients
  const { fetchIngredients } = useIngredientsActions();

  // Get the function to fetch an order
  const { fetchOrder } = useFeedActions();

  const {
    mode
  } = useAppSelector(modeSelector);

  const { replace } = useHistory();

  // Get the status of fetching ingredients
  const { dataLength: ingredientsLength } = useAppSelector(dataLengthSelector);
  const { loading: ingredientsLoading } = useAppSelector(loadingSelector);
  const { errorText: ingredientsErrorText } = useAppSelector(errorTextSelector);

  // Get the status of fetching order
  const { currentOrder } = useAppSelector(currentOrderSelector);
  const { loading: feedLoading } = useAppSelector(feedLoadingSelector);
  const { errorText: feedErrorText } = useAppSelector(feedErrorTextSelector);

  const preLoadData = async () => {
    if (!orderId) {
      return;
    }
    // load ingredients
    if (ingredientsLength === 0) {
      await fetchIngredients();
    }
    // load order
    await fetchOrder(orderId);

    setPreloadCompleted(true);
  };

  useEffect(() => {
    preLoadData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // In mobile mode
  // open modal window instead page
  useEffect(() => {
    if (!preloadCompleted) {
      return;
    }
    // in mode = 'mobile' we don't show this page.
    if (mode !== 'mobile') {
      return;
    }
    // instead we must open modal window with order
    replace('/feed', { command: 'openOrderModal', orderId });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [preloadCompleted, mode, orderId]);

  // LOADER
  if (ingredientsLoading || feedLoading) {
    return <AppLoader />;
  }

  // ERROR
  if (ingredientsErrorText || feedErrorText) {
    return <AppMessage message={ingredientsErrorText || feedErrorText} />;
  }

  // NO DATA
  if (!currentOrder) {
    return null;
  }

  // RENDER
  return (
    <div className={styles['order-page']}>
      <div className={styles['order-page__section-order']}>

        {/* HEADER */}
        <div className={styles['order-page__header']}>
          <ParagraphDigits
            text={`#${currentOrder.orderNumber}`}
          />
        </div>

        {/* CONTENT */}
        <OrderInfo
          className={styles['order-page__order']}
          order={currentOrder}
        />

      </div>
    </div>
  );
};
