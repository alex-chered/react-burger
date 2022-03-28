// redux
import { createSelector } from '@reduxjs/toolkit';
// store
import { AppState } from 'store';

// SELECTORS
// Select bun from the constructor
const bunSelector = createSelector(
  (state: AppState) => state.burgerConstructor.burgerConstructor.bun,
  (bun) => ({ bun })
);

// Select middle from the constructor
const middleSelector = createSelector(
  (state: AppState) => state.burgerConstructor.burgerConstructor.middle,
  (middle) => ({ middle })
);

// Select burger from the constructor
const dataSelector = createSelector(
  (state: AppState) => state.burgerConstructor.burgerConstructor,
  (burgerConstructor) => ({ burgerConstructor })
);

// Select total sum of the constructor
const totalSumSelector = createSelector(
  (state: AppState) => state.burgerConstructor.burgerConstructor.bun,
  (state: AppState) => state.burgerConstructor.burgerConstructor.middle,
  (bun, middle) => {
    // add bun price multiplied by two
    let totalSum = (bun?.price || 0) * 2;
    // add prices of ingredients from the middle
    totalSum += middle.reduce(
      (accumulator, ingredient) => accumulator + ingredient.price,
      0
    );

    return {
      totalSum
    };
  }
);

// Ingredient count in the constructor
const ingredientCountSelector = (id: string) => createSelector(
  // define whether the bun is the required ingredient
  (state: AppState) => state.burgerConstructor.burgerConstructor.bun?.id === id,
  // get the amount of the required ingredient in the burger
  (state: AppState) => state.burgerConstructor.burgerConstructor.middle.filter(
    (item) => item.id === id
  ).length,
  // form the result
  (isBun, middleCount) => {
    const count = middleCount + (isBun ? 2 : 0);
    return { count };
  }
);

// Union all selectors
export const burgerConstructorSelectors = {
  bunSelector,
  middleSelector,
  dataSelector,
  totalSumSelector,
  ingredientCountSelector
};
