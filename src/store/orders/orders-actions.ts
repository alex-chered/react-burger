// redux
import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
// store
import { AppState } from 'store';
// services
import { ordersService } from 'services/orders';
import { tokenService } from 'services/token';
// types
import { OrderModel } from 'models';
// utils
import {
  convertRawOrdersToOrders,
  getIDsFromConstructor
} from 'utils';

// ACTIONS
export const setCurrentOrderAction = createAction<{ order: OrderModel }>('SET_CURRENT_ORDER');
export const clearCurrentOrderAction = createAction<void>('CLEAR_CURRENT_ORDER');

// CREATE ORDER
export const createOrderAction = createAsyncThunk<
  { order: OrderModel },
  void,
  {
    state: AppState,
    rejectValue: { error: string }
  }
>(
  'orders/createOrder',
  async (_, thunkApi) => {
    try {
      // Get constructor from the store
      const { burgerConstructor } = thunkApi.getState().burgerConstructor;
      // Get ids of ingredients from the burger constructor
      const ids = getIDsFromConstructor(burgerConstructor);
      // Get token
      const token = tokenService.getAccessToken();
      // Do the request
      const newOrder = await ordersService.createOrder(ids, token);

      // Get ingredients from the store
      const { ingredients } = thunkApi.getState().ingredients;

      const orders = convertRawOrdersToOrders([newOrder], ingredients);

      // Return the order
      return { order: orders[0] };
    } catch (err) {
      const msg = (err as Error).message;
      return thunkApi.rejectWithValue({ error: msg });
    }
  }
);

// GET ORDER
export const getOrderAction = createAsyncThunk<
  { order: OrderModel },
  { orderNumber: string },
  {
    state: AppState,
    rejectValue: { error: string }
  }
>(
  'orders/getOrder',
  async ({ orderNumber }, thunkApi) => {
    try {
      const order = await ordersService.getOrder(orderNumber);
      // Get ingredients from the store
      const { ingredients } = thunkApi.getState().ingredients;
      const orders = convertRawOrdersToOrders([order], ingredients);
      // If we can't convert the raw order to the "system" order,
      // return the error
      if (orders.length === 0) {
        return thunkApi.rejectWithValue({ error: 'Не удалось получить информацию о заказе' });
      }
      // Return the order
      return { order: orders[0] };
    } catch (err) {
      const msg = (err as Error).message;
      return thunkApi.rejectWithValue({ error: msg });
    }
  }
);

// Actions, concerning web-socket
export const wsOrdersStartAction = createAction<void>('WS_ORDERS_START');
export const wsOrdersStartSuccessAction = createAction<void>('WS_ORDERS_START_SUCCESS');

export const wsOrdersCloseAction = createAction<void>('WS_ORDERS_CLOSE');
export const wsOrdersCloseSuccessAction = createAction<void>('WS_ORDERS_CLOSE_SUCCESS');

export const wsOrdersErrorAction = createAction<{ error: string }>('WS_ORDERS_ERROR');

export const wsOrdersSetOrders = createAction<{ orders: OrderModel[] }>('WS_ORDERS_SET_ORDERS');

// Combine all actions into one object
export const ordersSocketActions = {
  wsOrdersStartAction,
  wsOrdersStartSuccessAction,

  wsOrdersCloseAction,
  wsOrdersCloseSuccessAction,

  wsOrdersErrorAction,

  wsOrdersSetOrders
};

// Get type of combined actions
export type ordersSocketActionsType = typeof ordersSocketActions;
