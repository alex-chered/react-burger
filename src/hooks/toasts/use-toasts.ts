import { useCallback } from 'react';
// third-party libraries
import { v4 as uuid } from 'uuid';
// store
import { useAppSelector, useAppDispatch } from 'store';
import {
  addToastAction,
  replaceToastAction,
  removeToastAction,
  dataSelector
} from 'store/toasts';
import { commonSelectors } from 'store/common';
// types
import { ToastModel, ToastTypeType } from 'models';

// get selectors
const { modeSelector } = commonSelectors;

// HOOK
export const useToasts = () => {
  const dispatch = useAppDispatch();

  // Get the toasts from the store
  const { toasts } = useAppSelector(dataSelector);

  const { mode } = useAppSelector(modeSelector);

  // Function to add a toast with information type
  const toastInformation = useCallback((text: string) => {
    const toast: ToastModel = {
      id: uuid(),
      text,
      type: 'information'
    };

    if (mode === 'desktop') {
      dispatch(addToastAction({ toast }));
    } else {
      dispatch(replaceToastAction({ toast }));
    }
  }, [dispatch, mode]);

  // Function to add a toast with error type
  const toastError = useCallback((text: string) => {
    const toast: ToastModel = {
      id: uuid(),
      text,
      type: 'danger'
    };

    if (mode === 'desktop') {
      dispatch(addToastAction({ toast }));
    } else {
      dispatch(replaceToastAction({ toast }));
    }
  }, [dispatch, mode]);

  // Function to add a toast with error type
  const toastSuccess = useCallback((text: string) => {
    const toast: ToastModel = {
      id: uuid(),
      text,
      type: 'success'
    };

    if (mode === 'desktop') {
      dispatch(addToastAction({ toast }));
    } else {
      dispatch(replaceToastAction({ toast }));
    }
  }, [dispatch, mode]);

  // Function to add a toast
  const toastAny = useCallback((text: string, type: ToastTypeType) => {
    const toast: ToastModel = {
      id: uuid(),
      text,
      type
    };

    if (mode === 'desktop') {
      dispatch(addToastAction({ toast }));
    } else {
      dispatch(replaceToastAction({ toast }));
    }
  }, [dispatch, mode]);

  // Function to remove a toast by id
  const deleteToast = useCallback((id: string) => {
    dispatch(removeToastAction({ id }));
  }, [dispatch]);

  return {
    toasts,
    toastAny,
    toastInformation,
    toastError,
    toastSuccess,
    deleteToast
  };
};
