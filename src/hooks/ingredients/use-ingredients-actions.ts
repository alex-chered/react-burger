import { useCallback } from 'react';
// store
import { useAppDispatch } from 'store';
import {
  fetchIngredientsAsyncAction,
  setCurrentIngredientAction,
  clearCurrentIngredientAction
} from 'store/ingredients';
// types
import { IngredientModel } from 'models';

// HOOK
export const useIngredientsActions = () => {
  const dispatch = useAppDispatch();

  // Function to fetch ingredients
  const fetchIngredients = useCallback(async (): Promise<void> => {
    await dispatch(fetchIngredientsAsyncAction());
  }, [dispatch]);

  const setCurrentIngredient = useCallback((ingredient: IngredientModel) => {
    dispatch(setCurrentIngredientAction({ ingredient }));
  }, [dispatch]);

  const clearCurrentIngredient = useCallback(() => {
    dispatch(clearCurrentIngredientAction());
  }, [dispatch]);

  // RETURN
  return {
    fetchIngredients,
    setCurrentIngredient,
    clearCurrentIngredient
  };
};
