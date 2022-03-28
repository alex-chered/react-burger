// redux
import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
// store
import { AppState } from 'store';
// models
import { OrderModel } from 'models';
// services
import { ordersService } from 'services/orders';
// aux.
import { convertRawOrdersToOrders } from 'utils';

// ACTIONS
export const setFeedCurrentOrderAction = createAction<{ order: OrderModel }>('SET_FEED_CURRENT_ORDER');
export const clearFeedCurrentOrderAction = createAction<void>('CLEAR_FEED_CURRENT_ORDER');

export const getFeedOrderAction = createAsyncThunk<
  { order: OrderModel },
  { orderNumber: string },
  {
    state: AppState,
    rejectValue: { error: string }
  }
>(
  'feed/getOrder',
  async ({ orderNumber }, thunkApi) => {
    try {
      const order = await ordersService.getOrder(orderNumber);
      // Get state from the store
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
export const wsStartAction = createAction<void>('WS_START');
export const wsStartSuccessAction = createAction<void>('WS_START_SUCCESS');

export const wsCloseAction = createAction<void>('WS_CLOSE');
export const wsCloseSuccessAction = createAction<void>('WS_CLOSE_SUCCESS');

export const wsErrorAction = createAction<void>('WS_ERROR');

export const wsSetFeedTotalOrdersAction = createAction<{ amount: number }>('WS_SET_FEED_TOTAL_ORDERS');
export const wsSetFeedTotalTodayOrdersAction = createAction<{ amount: number }>('WS_SET_FEED_TOTAL_TODAY_ORDERS');
export const wsSetFeedOrders = createAction<{ orders: OrderModel[] }>('WS_SET_FEED_ORDERS');

// Combine all ws-actions into one object
export const feedWsActions = {
  wsStartAction,
  wsStartSuccessAction,

  wsCloseAction,
  wsCloseSuccessAction,

  wsErrorAction,

  wsSetFeedTotalOrdersAction,
  wsSetFeedTotalTodayOrdersAction,
  wsSetFeedOrders
};

// Get type of combined actions
export type feedWsActionsType = typeof feedWsActions;
