// redux
import { Middleware, MiddlewareAPI } from '@reduxjs/toolkit';
// models
import { OrderModel } from 'models';
// store
import { AppDispatch, AppState } from 'store';
import { ordersSocketActionsType } from 'store/orders';
// services
import { SocketServiceCreateOptions } from 'services/base';
import {
  ordersSocketService,
  GetOrdersResponseInterface
} from 'services/orders';
// utils
import { convertRawOrdersToOrders } from 'utils';

// MIDDLEWARE
export const ordersSocketMiddleware = (
  wsUrl: string, actions: ordersSocketActionsType
): Middleware<unknown, AppState> => (
  api: MiddlewareAPI<AppDispatch, AppState>
) => (next) => (action) => {
// > => (store) => (next) => (action) => {
  const state: AppState = api.getState();
  const { dispatch } = api;

  // Create a socket
  if (action.type === actions.wsOrdersStartAction().type) {
    // Handles to open a socket
    const openHandler = () => {
      dispatch(actions.wsOrdersStartSuccessAction());
    };
    // Handles to close a socket
    const closeHandler = () => {
      dispatch(actions.wsOrdersCloseSuccessAction());
    };
    // This handler gets called when an error occurs
    const errorHandler = () => {
      dispatch(actions.wsOrdersErrorAction({ error: 'Ошибка при получении данных' }));
    };
    // The handler gets called when a socket gets a message
    const messageHandler = (event: MessageEvent) => {
      const { data } = event;

      const parsedData = JSON.parse(data) as GetOrdersResponseInterface;
      if (parsedData.success) {
        // -> orders
        const orders: OrderModel[] = convertRawOrdersToOrders(
          parsedData.orders,
          state.ingredients.ingredients
        );

        dispatch(actions.wsOrdersSetOrders({ orders }));
      } else {
        dispatch(actions.wsOrdersErrorAction({ error: 'Ошибка при получении данных' }));
      }
    };

    // Socket options
    const options: SocketServiceCreateOptions = {
      openHandler,
      closeHandler,
      errorHandler,
      messageHandler
    };

    // Get token from the state
    const token = state.auth.user?.token || '';
    // Set token before start
    ordersSocketService.setToken(token);
    // Start a socket
    ordersSocketService.start(wsUrl, options);
  }

  // Close a socket connection
  if (action.type === actions.wsOrdersCloseAction().type) {
    ordersSocketService.close();
  }

  return next(action);
};
