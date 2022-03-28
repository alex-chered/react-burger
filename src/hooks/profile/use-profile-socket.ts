import { useCallback } from 'react';
// store
import { useAppDispatch, useAppSelector } from 'store';
import {
  wsOrdersStartAction,
  wsOrdersCloseAction,
  ordersSelectors
} from 'store/orders';

// Get required selectors
const {
  wsLoadingSelector,
  wsErrorTextSelector,
  wsConnectedSelector
} = ordersSelectors;

// HOOK
export const useProfileSocket = () => {
  const dispatch = useAppDispatch();

  const { wsLoading } = useAppSelector(wsLoadingSelector);
  const { wsErrorText } = useAppSelector(wsErrorTextSelector);
  const { wsConnected } = useAppSelector(wsConnectedSelector);

  const wsStart = useCallback(() => {
    dispatch(wsOrdersStartAction());
  }, [dispatch]);

  const wsClose = useCallback(() => {
    dispatch(wsOrdersCloseAction());
  }, [dispatch]);

  // RETURN
  return {
    wsLoading,
    wsErrorText,
    wsConnected,

    wsStart,
    wsClose
  };
};
