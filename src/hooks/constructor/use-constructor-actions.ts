import { useCallback } from 'react';
// third-party libraries
import { v4 as uuid } from 'uuid';
// types
import { IngredientModel, IngredientWithPositionModel } from 'models';
// store
import { useAppDispatch } from 'store';
import {
  addBunAction,
  addIngredientAction,
  deleteIngredientAction,
  updateMiddleAction,
  clearConstructorAction
} from 'store/burger-constructor';

// HOOK
export const useConstructorActions = () => {
  const dispatch = useAppDispatch();

  const addBun = useCallback((ingredient: IngredientModel) => {
    dispatch(addBunAction({ ingredient }));
  }, [dispatch]);

  // The function adds an ingredient into the middle
  // of the burger constructor
  const addIngredient = useCallback((ingredient: IngredientModel) => {
    dispatch(addIngredientAction({
      // This action creator gets "IngredientWithPositionType" as a parameter,
      // so we destructure ingredient and generate positionId
      ingredient: {
        ...ingredient,
        positionId: uuid()
      }
    }));
  }, [dispatch]);

  // Function deletes ingredient from the constructor by its id
  const deleteIngredient = useCallback((id: string) => {
    dispatch(deleteIngredientAction({ id }));
  }, [dispatch]);

  // The handler to update the middle
  // in the burger constructor in the store
  const updateBurger = useCallback((middle: IngredientWithPositionModel[]) => {
    dispatch(updateMiddleAction({ middle }));
  }, [dispatch]);

  // Function to remove all ingredients from the constructor
  const clearBurger = useCallback(() => {
    dispatch(clearConstructorAction());
  }, [dispatch]);

  // RETURN
  return {
    addBun,
    addIngredient,
    deleteIngredient,
    updateBurger,
    clearBurger
  };
};
