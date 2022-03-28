// redux
import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
// services
import { ingredientsService } from 'services/ingredients';
// models
import { IngredientModel } from 'models';

// ACTIONS
export const fetchIngredientsAsyncAction = createAsyncThunk<
  { ingredients: IngredientModel[] },
  void,
  {
    rejectValue: { errorMessage: string }
  }
>(
  'ingredients/fetchIngredients',
  async (_, thunkApi) => {
    try {
      const ingredients = await ingredientsService.getIngredients();
      return { ingredients };
    } catch (err) {
      const msg = (err as Error).message;
      return thunkApi.rejectWithValue({ errorMessage: msg });
    }
  }
);

export const setCurrentIngredientAction = createAction<{ ingredient: IngredientModel }>('SET_CURRENT_INGREDIENT');
export const clearCurrentIngredientAction = createAction<void>('CLEAR_CURRENT_INGREDIENT');
