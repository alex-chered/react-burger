import { createSelector } from '@reduxjs/toolkit';
// store
import { AppState } from 'store';

// SELECTORS
// Select mode
const modeSelector = createSelector(
  (state: AppState) => state.common.mode,
  (mode) => ({ mode })
);

// Combine all selectors
export const commonSelectors = {
  modeSelector
};
