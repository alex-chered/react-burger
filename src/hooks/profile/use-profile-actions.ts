import { useCallback } from 'react';
// store
import { useAppDispatch } from 'store';
import {
  setCurrentOrderAction,
  clearCurrentOrderAction,
  getOrderAction
} from 'store/orders';
// models
import { OrderModel } from 'models';

// HOOK
export const useProfileActions = () => {
  const dispatch = useAppDispatch();

  const setCurrentOrder = useCallback((order: OrderModel) => {
    dispatch(setCurrentOrderAction({ order }));
  }, [dispatch]);

  const clearCurrentOrder = useCallback(() => {
    dispatch(clearCurrentOrderAction());
  }, [dispatch]);

  const fetchOrder = useCallback(async (orderNumber: string): Promise<void> => {
    await dispatch(getOrderAction({ orderNumber }));
  }, [dispatch]);

  // RETURN
  return {
    setCurrentOrder,
    clearCurrentOrder,

    fetchOrder
  };
};
