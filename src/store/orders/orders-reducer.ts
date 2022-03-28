/* eslint-disable no-param-reassign */

// redux
import { createReducer } from '@reduxjs/toolkit';
// models
import { OrderModel } from 'models';
// actions
import {
  createOrderAction,
  getOrderAction,

  setCurrentOrderAction,
  clearCurrentOrderAction,

  wsOrdersStartAction,
  wsOrdersStartSuccessAction,
  wsOrdersCloseAction,
  wsOrdersCloseSuccessAction,
  wsOrdersErrorAction,
  wsOrdersSetOrders
} from './orders-actions';

// STATE TYPE
interface OrdersState {
  order: OrderModel | null;
  loading: boolean;
  errorText: string;

  orders: OrderModel[];
  wsLoading: boolean;
  wsConnected: boolean;
  wsErrorText: string;
}

// THE INITIAL STATE
const initialState: OrdersState = {
  order: null,
  loading: false,
  errorText: '',

  orders: [],
  wsLoading: false,
  wsConnected: false,
  wsErrorText: ''
};

// REDUCER
export const ordersReducer = createReducer<OrdersState>(initialState, (builder) => {
  builder
    // CREATE ORDER
    .addCase(
      createOrderAction.pending,
      (state) => {
        state.order = null;
        state.loading = true;
        state.errorText = '';
      }
    )
    .addCase(
      createOrderAction.fulfilled,
      (state, action) => {
        state.loading = false;
        // Save the order in the store
        state.order = action.payload.order;
      }
    )
    .addCase(
      createOrderAction.rejected,
      (state, action) => {
        state.loading = false;
        state.errorText = action.payload?.error || '';
      }
    )

    // SET CURRENT ORDER
    .addCase(
      setCurrentOrderAction,
      (state, action) => {
        state.order = action.payload.order;
      }
    )
    // CLEAR CURRENT ORDER
    .addCase(
      clearCurrentOrderAction,
      (state) => {
        state.order = null;
      }
    )
    // GET ORDER - start
    .addCase(
      getOrderAction.pending,
      (state) => {
        state.order = null;
        state.loading = true;
        state.errorText = '';
      }
    )
    // GET ORDER - success
    .addCase(
      getOrderAction.fulfilled,
      (state, action) => {
        state.loading = false;
        state.order = action.payload.order;
      }
    )
    // GET ORDER - failure
    .addCase(
      getOrderAction.rejected,
      (state, action) => {
        state.loading = false;
        state.errorText = action.payload?.error || '';
      }
    )

    // SOCKET -> Start
    .addCase(
      wsOrdersStartAction,
      (state) => {
        state.orders = [];
        state.wsLoading = true;
        state.wsConnected = false;
        state.wsErrorText = '';
      }
    )
    .addCase(
      wsOrdersStartSuccessAction,
      (state) => {
        state.wsConnected = true;
      }
    )
    // SOCKET -> Close
    .addCase(
      wsOrdersCloseAction,
      (state) => {
        state.wsErrorText = '';
        state.orders = [];
      }
    )
    .addCase(
      wsOrdersCloseSuccessAction,
      (state) => {
        state.wsConnected = false;
      }
    )
    // SOCKET -> Error
    .addCase(
      wsOrdersErrorAction,
      (state, action) => {
        state.orders = [];
        state.wsConnected = false;
        state.wsLoading = false;
        state.wsErrorText = action.payload.error;
      }
    )
    // SOCKET -> wsOrdersSetOrders
    .addCase(
      wsOrdersSetOrders,
      (state, action) => {
        state.orders = action.payload.orders;
        state.wsLoading = false;
      }
    );
});
