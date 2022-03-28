export type TIngredientType =
  | 'bun'
  | 'main'
  | 'sauce';

export interface IngredientModel {
  id: string;
  name: string;
  type: TIngredientType;
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  imageMobile: string;
  imageLarge: string;
  version: number;
}
