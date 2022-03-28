// redux
import { configureStore } from '@reduxjs/toolkit';
import {
  TypedUseSelectorHook,
  useDispatch,
  useSelector
} from 'react-redux';
// middleware
import {
  feedSocketMiddleware,
  ordersSocketMiddleware
} from 'middleware';
// services
import { AppSettingsService } from 'services/app-settings';
// store
import { feedWsActions } from 'store/feed';
import { ordersSocketActions } from 'store/orders';

// reducer
import { rootReducer } from './root-reducer';

// Create store
export const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: (getDefaultMiddleware) => getDefaultMiddleware()
    .concat(
      feedSocketMiddleware(AppSettingsService.urlSocketFeed(), feedWsActions),
      ordersSocketMiddleware(AppSettingsService.urlSocketOrders(), ordersSocketActions)
    )
});

// Infer the 'AppState' and 'AppDispatch' types from the store itself
export type AppState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

// Create typed hooks instead of plain 'useDispatch' and 'useSelector'
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector;
