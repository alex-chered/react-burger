import { IngredientModel } from './ingredient.model';

// Add the field "positionId"
export interface IngredientWithPositionModel extends IngredientModel {
  positionId: string;
}
