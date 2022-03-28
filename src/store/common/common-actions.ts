// redux
import { createAction } from '@reduxjs/toolkit';
// types
import { TAppMode } from './types';

export const setModeAction = createAction<{ mode: TAppMode }>('SET_MODE');
