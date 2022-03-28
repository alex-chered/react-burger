// redux
import { Middleware, MiddlewareAPI } from '@reduxjs/toolkit';
// models
import { OrderModel } from 'models';
// store
import { AppDispatch, AppState } from 'store';
import { feedWsActionsType } from 'store/feed';
// services
import { SocketServiceCreateOptions } from 'services/base';
import {
  GetFeedResponseInterface,
  feedSocketService
} from 'services/feed';
// utils
import { convertRawOrdersToOrders } from 'utils';

// MIDDLEWARE
export const feedSocketMiddleware = (wsUrl: string, actions: feedWsActionsType): Middleware<
  unknown,
  AppState
> => (api: MiddlewareAPI<AppDispatch, AppState>) => (next) => (action) => {
// > => (store) => (next) => (action) => {
  const state: AppState = api.getState();
  const { dispatch } = api;

  // Create a socket
  if (action.type === actions.wsStartAction().type) {
    // Handles to open a socket
    const openHandler = () => {
      dispatch(actions.wsStartSuccessAction());
    };
    // Handles to close a socket
    const closeHandler = () => {
      dispatch(actions.wsCloseSuccessAction());
    };
    // This handler gets called when an error occurs
    const errorHandler = () => {
      dispatch(actions.wsErrorAction());
    };
    // The handler gets called when a socket gets a message
    const messageHandler = (event: MessageEvent) => {
      const { data } = event;
      const parsedData = JSON.parse(data) as GetFeedResponseInterface;
      if (parsedData.success) {
        // -> total
        dispatch(actions.wsSetFeedTotalOrdersAction({ amount: parsedData.total }));

        // -> total today
        dispatch(actions.wsSetFeedTotalTodayOrdersAction({ amount: parsedData.totalToday }));

        // -> orders
        // Create an empty array of orders
        const orders: OrderModel[] = convertRawOrdersToOrders(
          parsedData.orders,
          state.ingredients.ingredients
        );
        // Set feed-orders in the store
        dispatch(actions.wsSetFeedOrders({ orders }));
      }
    };

    // Socket options
    const options: SocketServiceCreateOptions = {
      openHandler,
      closeHandler,
      errorHandler,
      messageHandler
    };

    // Start a socket
    feedSocketService.start(wsUrl, options);
  }

  // Close a socket connection
  if (action.type === actions.wsCloseAction().type) {
    feedSocketService.close();
  }

  return next(action);
};
