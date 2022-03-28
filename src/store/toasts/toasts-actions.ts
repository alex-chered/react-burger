// redux
import { createAction } from '@reduxjs/toolkit';
// types
import { ToastModel } from 'models';

// ACTIONS
export const addToastAction = createAction<{ toast: ToastModel }>('ADD_TOAST');

export const removeToastAction = createAction<{ id: string }>('REMOVE_TOAST');

export const replaceToastAction = createAction<{ toast: ToastModel }>('REPLACE_ACTION');
