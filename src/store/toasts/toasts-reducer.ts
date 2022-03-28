/* eslint-disable no-param-reassign */

// redux
import { createReducer } from '@reduxjs/toolkit';
// types
import { ToastModel } from 'models';
// actions
import {
  addToastAction,
  replaceToastAction,
  removeToastAction
} from './toasts-actions';

// STATE TYPE
interface ToastsState {
  toasts: ToastModel[];
}

// THE INITIAL STATE
const initialState: ToastsState = { toasts: [] };

// REDUCER
export const toastsReducer = createReducer<ToastsState>(initialState, (builder) => {
  builder
    .addCase(
      addToastAction,
      (state, action) => {
        state.toasts.push(action.payload.toast);
      }
    )
    .addCase(
      replaceToastAction,
      (state, action) => {
        state.toasts = [action.payload.toast];
      }
    )
    .addCase(
      removeToastAction,
      (state, action) => {
        const idx = state.toasts.findIndex((item) => item.id === action.payload.id);
        if (idx !== -1) {
          state.toasts.splice(idx, 1);
        }
      }
    );
});
