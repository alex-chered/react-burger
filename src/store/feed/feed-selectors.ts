import { createSelector } from '@reduxjs/toolkit';
// store
import { AppState } from 'store';

// SELECTORS
// Select loading
const loadingSelector = createSelector(
  (state: AppState) => state.feed.loading,
  (loading) => ({ loading })
);

// Select error text
const errorTextSelector = createSelector(
  (state: AppState) => state.feed.errorText,
  (errorText) => ({ errorText })
);

// Select current order
const currentOrderSelector = createSelector(
  (state: AppState) => state.feed.currentOrder,
  (currentOrder) => ({ currentOrder })
);

// Select orders
const dataSelector = createSelector(
  (state: AppState) => state.feed.orders,
  (orders) => ({ orders })
);

// Select orders length
const dataLengthSelector = createSelector(
  (state: AppState) => state.feed.orders.length,
  (dataLength) => ({ dataLength })
);

// Select order by id
const orderByIdSelector = (id: string) => createSelector(
  (state: AppState) => state.feed.orders.find((item) => item.id === id),
  (order) => ({
    order: order || null
  })
);

// Select the fields "total" and "totalToday"
const totalSelector = createSelector(
  (state: AppState) => state.feed.total,
  (state: AppState) => state.feed.totalToday,
  (total, totalToday) => ({
    total,
    totalToday
  })
);

// Select order numbers
const orderNumbersSelector = createSelector(
  (state: AppState) => state.feed.orders
    .filter((order) => order.status === 'done')
    .map((order) => `${order.orderNumber}` || ''),
  (state: AppState) => state.feed.orders
    .filter((order) => order.status === 'pending')
    .map((order) => `${order.orderNumber}` || ''),
  (completedOrders, pendingOrders) => ({
    completedOrders,
    pendingOrders
  })
);

// Select ws loading
const wsLoadingSelector = createSelector(
  (state: AppState) => state.feed.wsLoading,
  (wsLoading) => ({ wsLoading })
);

// Select ws connected
const wsConnectedSelector = createSelector(
  (state: AppState) => state.feed.wsConnected,
  (wsConnected) => ({ wsConnected })
);

// Select ws error text
const wsErrorTextSelector = createSelector(
  (state: AppState) => state.feed.wsErrorText,
  (wsErrorText) => ({ wsErrorText })
);

// Combine all selectors
export const feedSelectors = {
  loadingSelector,
  errorTextSelector,
  currentOrderSelector,
  dataSelector,
  dataLengthSelector,
  orderByIdSelector,

  totalSelector,
  orderNumbersSelector,

  wsLoadingSelector,
  wsConnectedSelector,
  wsErrorTextSelector
};
