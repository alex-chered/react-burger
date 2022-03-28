import { useEffect, useState } from 'react';
// router
import { useParams, useHistory } from 'react-router-dom';
// сomponents
import { ParagraphDigits } from 'components/base';
import { OrderInfo, AppLoader, AppMessage } from 'components/common';
// store
import { useAppSelector } from 'store';
import { ingredientsSelectors } from 'store/ingredients';
import { ordersSelectors } from 'store/orders';
import { commonSelectors } from 'store/common';
// hooks
import { useIngredientsActions } from 'hooks/ingredients';
import { useProfileActions } from 'hooks/profile';
// css
import styles from './profile-order-page.module.css';

// Get selectors
const {
  loadingSelector,
  errorTextSelector,
  dataLengthSelector
} = ingredientsSelectors;
const {
  currentOrderSelector,
  loadingSelector: ordersLoadingSelector,
  errorTextSelector: ordersErrorTextSelector
} = ordersSelectors;
const {
  modeSelector
} = commonSelectors;

// COMPONENT
export const ProfileOrderPage = () => {
  const [preloadCompleted, setPreloadCompleted] = useState<boolean>(false);

  // Get the current order number from params
  const { orderId } = useParams<{ orderId: string }>();

  const { fetchIngredients } = useIngredientsActions();

  // Get the function to fetch an order
  const { fetchOrder } = useProfileActions();

  const {
    mode
  } = useAppSelector(modeSelector);

  const { replace } = useHistory();

  // Get the status of fetching ingredients
  const { dataLength: ingredientsLength } = useAppSelector(dataLengthSelector);
  const { loading: ingredientsLoading } = useAppSelector(loadingSelector);
  const { errorText: ingredientsErrorText } = useAppSelector(errorTextSelector);

  // Get the status of fetching order
  const { order: currentOrder } = useAppSelector(currentOrderSelector);
  const { loading: ordersLoading } = useAppSelector(ordersLoadingSelector);
  const { errorText: ordersErrorText } = useAppSelector(ordersErrorTextSelector);

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
    replace('/profile/orders', { command: 'openOrderModal', orderId });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [preloadCompleted, mode, orderId]);

  // LOADER
  if (ingredientsLoading || ordersLoading) {
    return <AppLoader />;
  }

  // RENDER
  if (ingredientsErrorText || ordersErrorText) {
    return <AppMessage message={ingredientsErrorText || ordersErrorText} />;
  }

  // NO ORDER
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
