/* eslint-disable no-param-reassign */

// redux
import { createReducer } from '@reduxjs/toolkit';
// models
import { UserModel } from 'models';
// actions
import {
  loginAction,
  registerAction,
  logoutAction,
  updateUserAction,
  getUserAction,
  forgetPasswordAction,
  resetPasswordAction
} from './auth-actions';

// State Type
interface AuthState {
  user: UserModel | null; // in the store we don't save password for an user
  loading: boolean;
  errorText: string;

  getUserLoading: boolean;
  getUserErrorText: string;
}

// The initial state
const initialState: AuthState = {
  user: null,

  loading: false,
  errorText: '',

  getUserLoading: false,
  getUserErrorText: ''
};

// Reducer
export const authReducer = createReducer<AuthState>(initialState, (builder) => {
  builder
    // REGISTER
    .addCase(
      registerAction.pending,
      (state) => {
        state.user = null;
        state.loading = true;
        state.errorText = '';
      }
    )
    .addCase(
      registerAction.fulfilled,
      (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
      }
    )
    .addCase(
      registerAction.rejected,
      (state, action) => {
        state.loading = false;
        state.errorText = action.payload?.error || '';
      }
    )
    // LOGIN
    .addCase(
      loginAction.pending,
      (state) => {
        state.user = null;
        state.loading = true;
        state.errorText = '';
      }
    )
    .addCase(
      loginAction.fulfilled,
      (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
      }
    )
    .addCase(
      loginAction.rejected,
      (state, action) => {
        state.loading = false;
        state.errorText = action.payload?.error || '';
      }
    )
    // LOGOUT
    .addCase(
      logoutAction.pending,
      (state) => {
        state.loading = true;
        state.errorText = '';
      }
    )
    .addCase(
      logoutAction.fulfilled,
      (state) => {
        state.loading = false;
        state.user = null;
      }
    )
    .addCase(
      logoutAction.rejected,
      (state, action) => {
        state.loading = false;
        state.errorText = action.payload?.error || '';
      }
    )
    // UPDATE USER
    .addCase(
      updateUserAction.pending,
      (state) => {
        state.loading = true;
        state.errorText = '';
      }
    )
    .addCase(
      updateUserAction.fulfilled,
      (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
      }
    )
    .addCase(
      updateUserAction.rejected,
      (state, action) => {
        state.loading = false;
        state.errorText = action.payload?.error || '';
      }
    )
    // FORGET PASSWORD
    .addCase(
      forgetPasswordAction.pending,
      (state) => {
        state.loading = true;
        state.errorText = '';
      }
    )
    .addCase(
      forgetPasswordAction.fulfilled,
      (state) => {
        state.loading = false;
      }
    )
    .addCase(
      forgetPasswordAction.rejected,
      (state, action) => {
        state.loading = false;
        state.errorText = action.payload?.error || '';
      }
    )
    // RESET PASSWORD
    .addCase(
      resetPasswordAction.pending,
      (state) => {
        state.loading = true;
        state.errorText = '';
      }
    )
    .addCase(
      resetPasswordAction.fulfilled,
      (state) => {
        state.loading = false;
      }
    )
    .addCase(
      resetPasswordAction.rejected,
      (state, action) => {
        state.loading = false;
        state.errorText = action.payload?.error || '';
      }
    )

    // GET USER
    .addCase(
      getUserAction.pending,
      (state) => {
        state.user = null;
        state.getUserLoading = true;
        state.getUserErrorText = '';
      }
    )
    .addCase(
      getUserAction.fulfilled,
      (state, action) => {
        state.getUserLoading = false;
        state.user = action.payload.user;
      }
    )
    .addCase(
      getUserAction.rejected,
      (state, action) => {
        state.getUserLoading = false;
        state.getUserErrorText = action.payload?.error || '';
      }
    );
});
