/* eslint-disable no-param-reassign */

// redux
import { createReducer } from '@reduxjs/toolkit';
// models
import { OrderModel } from 'models';
// actions
import {
  setFeedCurrentOrderAction,
  clearFeedCurrentOrderAction,

  getFeedOrderAction,

  // for a socket
  wsStartAction,
  wsStartSuccessAction,

  wsCloseAction,
  wsCloseSuccessAction,

  wsErrorAction,

  wsSetFeedTotalOrdersAction,
  wsSetFeedTotalTodayOrdersAction,
  wsSetFeedOrders
} from './feed-actions';

// STATE TYPE
interface FeedState {
  orders: OrderModel[];
  currentOrder: OrderModel | null;

  loading: boolean;
  errorText: string;

  total: number;
  totalToday: number;

  wsLoading: boolean;
  wsConnected: boolean;
  wsErrorText: string;
}

// THE INITIAL STATE
const initialState: FeedState = {
  orders: [],
  currentOrder: null,

  loading: false,
  errorText: '',

  total: 0,
  totalToday: 0,

  // We start "wsLoading", when start the socket,
  // and finish "wsLoading", when:
  // - an error occurs;
  // - the first data in the store will be received;
  // - or we start to close the socket;
  wsLoading: false,

  wsConnected: false,
  wsErrorText: ''
};

// REDUCER
export const feedReducer = createReducer<FeedState>(initialState, (builder) => {
  builder
    // setCurrentFeedOrderAction
    .addCase(
      setFeedCurrentOrderAction,
      (state, action) => {
        state.currentOrder = action.payload.order;
      }
    )
    // clearCurrentFeedOrderAction
    .addCase(
      clearFeedCurrentOrderAction,
      (state) => {
        state.currentOrder = null;
      }
    )
    // FEED GET ORDER
    // We use "currentOrder" state
    // to store info about the order
    // -> pending
    .addCase(
      getFeedOrderAction.pending,
      (state) => {
        state.currentOrder = null;
        state.loading = true;
        state.errorText = '';
      }
    )
    // -> success
    .addCase(
      getFeedOrderAction.fulfilled,
      (state, action) => {
        state.loading = false;
        state.currentOrder = action.payload.order;
      }
    )
    // -> failure
    .addCase(
      getFeedOrderAction.rejected,
      (state, action) => {
        state.loading = false;
        state.errorText = action.payload?.error || '';
      }
    )

    // SOCKET -> Start
    .addCase(
      wsStartAction,
      (state) => {
        state.orders = [];
        state.wsLoading = true;
        state.wsConnected = false;
        state.wsErrorText = '';
      }
    )
    .addCase(
      wsStartSuccessAction,
      (state) => {
        state.wsConnected = true;
      }
    )
    // SOCKET -> Close
    .addCase(
      wsCloseAction,
      (state) => {
        state.wsErrorText = '';
        state.orders = [];
      }
    )
    .addCase(
      wsCloseSuccessAction,
      (state) => {
        state.wsConnected = false;
      }
    )
    // SOCKET -> Error
    .addCase(
      wsErrorAction,
      (state) => {
        state.orders = [];
        state.wsConnected = false;
        state.wsLoading = false;
        state.wsErrorText = 'Ошибка при подключении к серверу';
      }
    )

    // SOCKET -> setFeedTotalOrdersAction
    .addCase(
      wsSetFeedTotalOrdersAction,
      (state, action) => {
        state.wsLoading = false;
        state.wsErrorText = '';
        state.total = action.payload.amount;
      }
    )
    // SOCKET -> setFeedTotalTodayOrdersAction
    .addCase(
      wsSetFeedTotalTodayOrdersAction,
      (state, action) => {
        state.wsLoading = false;
        state.wsErrorText = '';
        state.totalToday = action.payload.amount;
      }
    )
    // SOCKET -> wsSetFeedOrders
    .addCase(
      wsSetFeedOrders,
      (state, action) => {
        state.wsLoading = false;
        state.wsErrorText = '';
        state.orders = action.payload.orders;
      }
    );
});
