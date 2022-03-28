import { IngredientModel } from 'models';

type IngredientsByIdType = {
  [key: string]: {
    num: number,
    ingredient: IngredientModel
  }
}

type IngredientsForOrderInfoType = {
  id: string,
  name: string,
  img: string,
  price: number,
  num: number
}

// FUNCTION
const convertArrayToObject = (
  ingredients: IngredientModel[]
): IngredientsByIdType => ingredients.reduce(
  // Reduce function
  (acc: IngredientsByIdType, current) => {
    if (Object.keys(acc).includes(current.id)) {
      acc[current.id].num += 1;
    } else {
      acc[current.id] = {
        ingredient: current,
        num: 1
      };
    }

    return acc;
  },
  // The initial value
  {}
);

// FUNCTION
export const prepareIngredientsForOrderInfo = (
  ingredients: IngredientModel[]
): IngredientsForOrderInfoType[] => {
  const obj = convertArrayToObject(ingredients);

  return Object.keys(obj)
    .map((key) => ({
      id: key,
      name: obj[key].ingredient.name,
      img: obj[key].ingredient.imageMobile,
      price: obj[key].ingredient.price,
      num: obj[key].num
    }));
};
