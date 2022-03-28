import { IngredientModel } from 'models';

export type OrderStatusType =
  | 'created'
  | 'pending'
  | 'done';

// MODEL
export interface OrderModel {
  id: string;
  orderNumber: number;
  name: string;
  status: OrderStatusType;
  creationDate: string;
  price: number;
  ingredients: IngredientModel[];
}
