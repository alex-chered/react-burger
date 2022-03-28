/* eslint-disable no-param-reassign */

// redux
import { createReducer } from '@reduxjs/toolkit';
// models
import { IngredientModel } from 'models';
// actions
import {
  fetchIngredientsAsyncAction,
  setCurrentIngredientAction,
  clearCurrentIngredientAction
} from './ingredients-actions';

// STATE TYPE
interface IngredientsState {
  ingredients: IngredientModel[];
  currentIngredient: IngredientModel | null;
  loading: boolean;
  errorText: string;
}

// THE INITIAL STATE
export const initialState: IngredientsState = {
  ingredients: [],
  currentIngredient: null,
  loading: false,
  errorText: ''
};

// REDUCER
export const ingredientsReducer = createReducer<IngredientsState>(initialState, (builder) => {
  builder
    // FETCH INGREDIENTS
    .addCase(
      fetchIngredientsAsyncAction.pending,
      (state) => {
        state.ingredients = [];
        state.loading = true;
        state.errorText = '';
      }
    )
    .addCase(
      fetchIngredientsAsyncAction.fulfilled,
      (state, action) => {
        state.loading = false;
        state.ingredients = action.payload.ingredients;
      }
    )
    .addCase(
      fetchIngredientsAsyncAction.rejected,
      (state, action) => {
        state.loading = false;
        state.errorText = action.payload?.errorMessage || '';
      }
    )
    // CURRENT INGREDIENT
    .addCase(
      setCurrentIngredientAction,
      (state, action) => {
        state.currentIngredient = action.payload.ingredient;
      }
    )
    .addCase(
      clearCurrentIngredientAction,
      (state) => {
        state.currentIngredient = null;
      }
    );
});
