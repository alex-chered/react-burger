import { useCallback } from 'react';
// store
import { useAppDispatch, useAppSelector } from 'store';
import { wsStartAction, wsCloseAction, feedSelectors } from 'store/feed';

// Get required selectors
const {
  wsLoadingSelector,
  wsErrorTextSelector,
  wsConnectedSelector
} = feedSelectors;

// HOOK
export const useFeedSocket = () => {
  const dispatch = useAppDispatch();

  const { wsLoading } = useAppSelector(wsLoadingSelector);
  const { wsErrorText } = useAppSelector(wsErrorTextSelector);
  const { wsConnected } = useAppSelector(wsConnectedSelector);

  const wsStart = useCallback(() => {
    dispatch(wsStartAction());
  }, [dispatch]);

  const wsClose = useCallback(() => {
    dispatch(wsCloseAction());
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
