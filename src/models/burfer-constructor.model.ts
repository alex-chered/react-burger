import { IngredientModel, IngredientWithPositionModel } from 'models';

export interface BurgerConstructorModel {
  bun: IngredientModel | null;
  middle: IngredientWithPositionModel[];
}
