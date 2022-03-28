import { useCallback } from 'react';
// store
import { useAppDispatch, useAppSelector } from 'store';
import {
  authSelectors,

  loginAction,
  registerAction,
  logoutAction,
  updateUserAction,
  forgetPasswordAction,
  resetPasswordAction,
  getUserAction
} from 'store/auth';
// types
import { UserModel } from 'models';

// Get required selectors
const { loadingSelector } = authSelectors;

// HOOK
export const useAuth = () => {
  const dispatch = useAppDispatch();

  const { loading } = useAppSelector(loadingSelector);

  // -> LOGIN
  const loginUser = useCallback(async (user: UserModel): Promise<{ user: UserModel } | null> => {
    if (loading) {
      return null;
    }
    return dispatch(loginAction({ user })).unwrap();
  }, [dispatch, loading]);

  // -> REGISTER
  const registerUser = useCallback(async (user: UserModel): Promise<{ user: UserModel } | null> => {
    if (loading) {
      return null;
    }
    return dispatch(registerAction({ user })).unwrap();
  }, [dispatch, loading]);

  // -> LOGOUT
  const logoutUser = useCallback(async (): Promise<boolean | null> => {
    if (loading) {
      return false;
    }
    return dispatch(logoutAction()).unwrap();
  }, [dispatch, loading]);

  // -> UPDATE USER
  const updateUser = useCallback(async (user: UserModel): Promise<{ user: UserModel } | null> => {
    if (loading) {
      return null;
    }
    return dispatch(updateUserAction({ user })).unwrap();
  }, [dispatch, loading]);

  // -> FORGET PASSWORD
  const forgetPassword = useCallback(async (email: string): Promise<boolean | null> => {
    if (loading) {
      return null;
    }
    return dispatch(forgetPasswordAction({ email })).unwrap();
  }, [dispatch, loading]);

  // -> RESET PASSWORD
  const resetPassword = useCallback(
    async (password: string, code: string): Promise<boolean | null> => {
      if (loading) {
        return null;
      }
      return dispatch(resetPasswordAction({ password, code })).unwrap();
    },
    [dispatch, loading]
  );

  // -> GET USER
  const getUser = useCallback(async (): Promise<{ user: UserModel }> => {
    return dispatch(getUserAction()).unwrap();
  }, [dispatch]);

  // RENDER
  return {
    loginUser,
    registerUser,
    logoutUser,
    updateUser,
    forgetPassword,
    resetPassword,
    getUser
  };
};
