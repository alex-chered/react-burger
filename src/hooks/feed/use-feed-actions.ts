import { useCallback } from 'react';
// store
import { useAppDispatch } from 'store';
import {
  clearFeedCurrentOrderAction,
  setFeedCurrentOrderAction,
  getFeedOrderAction
} from 'store/feed';
// models
import { OrderModel } from 'models';

// HOOK
export const useFeedActions = () => {
  const dispatch = useAppDispatch();

  const setCurrentOrder = useCallback((order: OrderModel) => {
    dispatch(setFeedCurrentOrderAction({ order }));
  }, [dispatch]);

  const clearCurrentOrder = useCallback(() => {
    dispatch(clearFeedCurrentOrderAction());
  }, [dispatch]);

  const fetchOrder = useCallback(async (orderNumber: string): Promise<void> => {
    await dispatch(getFeedOrderAction({ orderNumber }));
  }, [dispatch]);

  // RETURN
  return {
    setCurrentOrder,
    clearCurrentOrder,
    fetchOrder
  };
};
