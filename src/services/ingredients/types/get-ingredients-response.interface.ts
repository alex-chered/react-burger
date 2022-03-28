// aux. types
import { IngredientsResponseInterface } from './ingredient-response.interface';

// INTERFACE
export interface GetIngredientsResponseInterface {
  success: boolean,
  data: IngredientsResponseInterface[]
}
