// models
import { IngredientModel, TIngredientType } from 'models';
// aux.
import { IngredientsResponseInterface } from '../types';

// FUNCTION
export const convertToIngredient = (
  rawIngredient: IngredientsResponseInterface
): IngredientModel => ({
  id: rawIngredient._id,
  name: rawIngredient.name,
  type: rawIngredient.type as TIngredientType,
  proteins: rawIngredient.proteins,
  fat: rawIngredient.fat,
  carbohydrates: rawIngredient.carbohydrates,
  calories: rawIngredient.calories,
  price: rawIngredient.price,
  image: rawIngredient.image,
  imageMobile: rawIngredient.image_mobile,
  imageLarge: rawIngredient.image_large,
  version: rawIngredient.__v
});
