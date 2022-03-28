// redux
import { createAction } from '@reduxjs/toolkit';
// models
import {
  IngredientModel,
  IngredientWithPositionModel
} from 'models';

// ACTIONS
export const addBunAction = createAction<{ ingredient: IngredientModel }>('ADD_BUN_TO_CONSTRUCTOR');

export const addIngredientAction = createAction<{ ingredient: IngredientWithPositionModel }>('ADD_INGREDIENT_TO_CONSTRUCTOR');

export const deleteIngredientAction = createAction<{ id: string }>('DELETE_INGREDIENT_FROM_CONSTRUCTOR');

export const updateMiddleAction = createAction<{ middle: IngredientWithPositionModel[] }>('UPDATE_MIDDLE_IN_CONSTRUCTOR');

export const clearConstructorAction = createAction<void>('CLEAR_CONSTRUCTOR');
