/* eslint-disable no-param-reassign */

// redux
import { createReducer } from '@reduxjs/toolkit';
// models
import { BurgerConstructorModel } from 'models';
// actions
import {
  addBunAction,
  addIngredientAction,
  updateMiddleAction,
  deleteIngredientAction,
  clearConstructorAction
} from './burger-constructor-actions';

// STATE TYPE
interface BurgerConstructorState {
  burgerConstructor: BurgerConstructorModel;
}

// THE INITIAL STATE
const initialState: BurgerConstructorState = {
  burgerConstructor: {
    bun: null,
    middle: []
  }
};

// REDUCER
export const burgerConstructorReducer = createReducer<BurgerConstructorState>(
  initialState,
  (builder) => {
    builder
      .addCase(
        addBunAction,
        (state, action) => {
          state.burgerConstructor.bun = action.payload.ingredient;
        }
      )
      .addCase(
        addIngredientAction,
        (state, action) => {
          state.burgerConstructor.middle.push(action.payload.ingredient);
        }
      )
      .addCase(
        deleteIngredientAction,
        (state, action) => {
          state.burgerConstructor.middle = state.burgerConstructor.middle.filter(
            (ingredient) => ingredient.positionId !== action.payload.id
          );
        }
      )
      .addCase(
        updateMiddleAction,
        (state, action) => {
          state.burgerConstructor.middle = [...action.payload.middle];
        }
      )
      .addCase(
        clearConstructorAction,
        (state) => {
          state.burgerConstructor.bun = null;
          state.burgerConstructor.middle = [];
        }
      );
  }
);
