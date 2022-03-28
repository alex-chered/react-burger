import { useCallback } from 'react';
// store
import { useAppDispatch, useAppSelector } from 'store';
import { createOrderAction } from 'store/orders';
import { burgerConstructorSelectors } from 'store/burger-constructor';
import { authSelectors } from 'store/auth';
// hooks
import { useToasts } from 'hooks/toasts';
// types
import { OrderModel } from 'models';
// utils
import { isConstructorComplete } from 'utils';

// Get selectors
const {
  dataSelector
} = burgerConstructorSelectors;
const {
  userSelector
} = authSelectors;

// HOOK
export const useCreateOrder = () => {
  const dispatch = useAppDispatch();

  const { burgerConstructor } = useAppSelector(dataSelector);

  const { user } = useAppSelector(userSelector);

  const { toastError } = useToasts();

  // Function to create an order
  const createOrder = useCallback(async (): Promise<{ order: OrderModel } | null> => {
    // Only an authorized user can create an order
    if (!user) {
      toastError('Пользователь не авторизован');
      return null;
    }

    if (!isConstructorComplete(burgerConstructor)) {
      toastError(`В бургере не хватает ингредиентов!
        Чтобы сделать заказ, выберите булочку и нужную начинку.`);
      return null;
    }

    const result = await dispatch(createOrderAction()).unwrap();
    return result;
  }, [dispatch, toastError, burgerConstructor, user]);

  // RETURN
  return {
    createOrder
  };
};
