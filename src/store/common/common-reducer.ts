/* eslint-disable no-param-reassign */

// redux
import { createReducer } from '@reduxjs/toolkit';
// actions
import {
  setModeAction
} from './common-actions';
// types
import { TAppMode } from './types';

// STATE TYPE
interface CommonState {
  mode: TAppMode;
}

// THE INITIAL STATE
const initialState: CommonState = {
  mode: 'desktop'
};

// REDUCER
export const commonReducer = createReducer<CommonState>(initialState, (builder) => {
  builder
    // setCurrentFeedOrderAction
    .addCase(
      setModeAction,
      (state, action) => {
        state.mode = action.payload.mode;
      }
    );
});
