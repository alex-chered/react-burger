// redux
import { createSelector } from '@reduxjs/toolkit';
// store
import { AppState } from 'store';

// SELECTORS
const userSelector = createSelector(
  (state: AppState) => state.auth.user,
  (user) => ({ user })
);

const loadingSelector = createSelector(
  (state: AppState) => state.auth.loading,
  (loading) => ({ loading })
);

const errorTextSelector = createSelector(
  (state: AppState) => state.auth.errorText,
  (errorText) => ({ errorText })
);

const getUserLoadingSelector = createSelector(
  (state: AppState) => state.auth.getUserLoading,
  (getUserLoading) => ({ getUserLoading })
);

// const getUserCompletedSelector = createSelector(
//   (state: AppState) => state.auth.getUserCompleted,
//   (getUserCompleted) => ({ getUserCompleted })
// );

const getUserErrorTextSelector = createSelector(
  (state: AppState) => state.auth.getUserErrorText,
  (getUserErrorText) => ({ getUserErrorText })
);

// Combine all selectors
export const authSelectors = {
  userSelector,
  loadingSelector,
  errorTextSelector,
  getUserLoadingSelector,
  // getUserCompletedSelector,
  getUserErrorTextSelector
};
