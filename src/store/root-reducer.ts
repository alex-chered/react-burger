// redux
import { combineReducers } from '@reduxjs/toolkit';
// reducers
import { commonReducer } from './common';
import { authReducer } from './auth';
import { ingredientsReducer } from './ingredients';
import { burgerConstructorReducer } from './burger-constructor';
import { feedReducer } from './feed';
import { ordersReducer } from './orders';
import { toastsReducer } from './toasts';

// Define the root reducer
export const rootReducer = combineReducers({
  common: commonReducer,
  auth: authReducer,
  ingredients: ingredientsReducer,
  burgerConstructor: burgerConstructorReducer,
  orders: ordersReducer,
  feed: feedReducer,
  toasts: toastsReducer
});
