// redux
import { createSelector } from '@reduxjs/toolkit';
// store
import { AppState } from 'store';

// SELECTORS
// Select loading
const loadingSelector = createSelector(
  (state: AppState) => state.orders.loading,
  (loading) => ({ loading })
);

// Select error text
const errorTextSelector = createSelector(
  (state: AppState) => state.orders.errorText,
  (errorText) => ({ errorText })
);

// Select the current order
const currentOrderSelector = createSelector(
  (state: AppState) => state.orders.order,
  (order) => ({ order })
);

// Select orders
const dataSelector = createSelector(
  (state: AppState) => state.orders.orders,
  (orders) => ({ orders })
);

// Select orders length
const dataLengthSelector = createSelector(
  (state: AppState) => state.orders.orders.length,
  (dataLength) => ({ dataLength })
);

// Select order by id
const orderByIdSelector = (id: string) => createSelector(
  (state: AppState) => state.orders.orders.find((item) => item.id === id),
  (order) => ({
    order: order || null
  })
);

// Select ws loading
const wsLoadingSelector = createSelector(
  (state: AppState) => state.orders.wsLoading,
  (wsLoading) => ({ wsLoading })
);

// Select ws connected
const wsConnectedSelector = createSelector(
  (state: AppState) => state.orders.wsConnected,
  (wsConnected) => ({ wsConnected })
);

// Select ws error text
const wsErrorTextSelector = createSelector(
  (state: AppState) => state.orders.wsErrorText,
  (wsErrorText) => ({ wsErrorText })
);

// Combine all selectors into one object
export const ordersSelectors = {
  loadingSelector,
  errorTextSelector,
  dataSelector,
  dataLengthSelector,
  orderByIdSelector,
  currentOrderSelector,

  wsLoadingSelector,
  wsConnectedSelector,
  wsErrorTextSelector
};
