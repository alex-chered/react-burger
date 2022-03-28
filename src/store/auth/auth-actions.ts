// redux
import { createAsyncThunk } from '@reduxjs/toolkit';
// services
import { authService } from 'services/auth';
// types
import { UserModel } from 'models';
import { IRejectedValue } from 'store/types';

// LOGIN
export const loginAction = createAsyncThunk<
  { user: UserModel },
  { user: UserModel },
  {
    rejectValue: IRejectedValue
  }
>(
  'auth/login',
  async ({ user }, thunkApi) => {
    try {
      const loggedUser = await authService.login(user);
      return { user: loggedUser };
    } catch (err) {
      const msg = (err as Error).message;
      return thunkApi.rejectWithValue({ error: msg });
    }
  }
);

// REGISTER
export const registerAction = createAsyncThunk<
  { user: UserModel },
  { user: UserModel },
  {
    rejectValue: { error: string }
  }
>(
  'auth/register',
  async ({ user }, thunkApi) => {
    try {
      const registredUser = await authService.register(user);
      return { user: registredUser };
    } catch (err) {
      const msg = (err as Error).message;
      return thunkApi.rejectWithValue({ error: msg });
    }
  }
);

// LOGOUT
export const logoutAction = createAsyncThunk<
  boolean,
  void,
  {
    rejectValue: { error: string }
  }
>(
  'auth/logout',
  async (_, thunkApi) => {
    try {
      return await authService.logout();
    } catch (err) {
      const msg = (err as Error).message;
      return thunkApi.rejectWithValue({ error: msg });
    }
  }
);

// UPDATE USER
export const updateUserAction = createAsyncThunk<
  { user: UserModel },
  { user: UserModel },
  {
    rejectValue: IRejectedValue
  }
>(
  'auth/updateUser',
  async ({ user }, thunkApi) => {
    try {
      const data = await authService.updateUser(user);
      return { user: data };
    } catch (err) {
      const msg = (err as Error).message;
      return thunkApi.rejectWithValue({ error: msg });
    }
  }
);

// GET USER
export const getUserAction = createAsyncThunk<
  { user: UserModel },
  void,
  {
    rejectValue: { error: string }
  }
>(
  'auth/getUser',
  async (_, thunkApi) => {
    try {
      const user = await authService.getUser();
      return { user };
    } catch (err) {
      const msg = (err as Error).message;
      return thunkApi.rejectWithValue({ error: msg });
    }
  }
);

// FORGET PASSWORD
export const forgetPasswordAction = createAsyncThunk<
  boolean,
  { email: string },
  {
    rejectValue: IRejectedValue
  }
>(
  'auth/forgetPassword',
  async ({ email }, thunkApi) => {
    try {
      return await authService.forgetPassword(email);
    } catch (err) {
      const msg = (err as Error).message;
      return thunkApi.rejectWithValue({ error: msg });
    }
  }
);

// RESET PASSWORD
export const resetPasswordAction = createAsyncThunk<
  boolean,
  { password: string, code: string },
  {
    rejectValue: IRejectedValue
  }
>(
  'auth/resetPassword',
  async ({ password, code }, thunkApi) => {
    try {
      return await authService.resetPassword(password, code);
    } catch (err) {
      const msg = (err as Error).message;
      return thunkApi.rejectWithValue({ error: msg });
    }
  }
);
