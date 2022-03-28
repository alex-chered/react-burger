// redux
import { createSelector } from '@reduxjs/toolkit';
// store
import { AppState } from 'store';
// models
import { TIngredientType } from 'models';

// SELECTORS
// Select loading
const loadingSelector = createSelector(
  (state: AppState) => state.ingredients.loading,
  (loading) => ({ loading })
);

// Select error text
const errorTextSelector = createSelector(
  (state: AppState) => state.ingredients.errorText,
  (errorText) => ({ errorText })
);

// Select ingredients
const dataSelector = createSelector(
  (state: AppState) => state.ingredients.ingredients,
  (ingredients) => ({ ingredients })
);

// Select ingredients length
const dataLengthSelector = createSelector(
  (state: AppState) => state.ingredients.ingredients.length,
  (dataLength) => ({ dataLength })
);

// Select current ingredient
const currentIngredientSelector = createSelector(
  (state: AppState) => state.ingredients.currentIngredient,
  (currentIngredient) => ({ currentIngredient })
);

// Select ingredients by type
const ingredientsByTypeSelector = (type: TIngredientType) => createSelector(
  (state: AppState) => state.ingredients.ingredients.filter((item) => item.type === type),
  (ingredients) => ({
    ingredients
  })
);

// Select ingredient by id
const ingredientByIdSelector = (id: string) => createSelector(
  (state: AppState) => state.ingredients.ingredients.find((item) => item.id === id),
  (ingredient) => ({
    ingredient: ingredient || null
  })
);

// Combine all selectors
export const ingredientsSelectors = {
  loadingSelector,
  errorTextSelector,
  dataSelector,
  dataLengthSelector,
  currentIngredientSelector,

  ingredientsByTypeSelector,
  ingredientByIdSelector
};
