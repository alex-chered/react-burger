// types
import { IngredientsResponseInterface } from 'services/ingredients/types';

interface OrderResponseInterface {
  _id: string;
  number: number;
  createdAt: string;
  name: string;
  status: 'created' | 'pending' | 'done';
  ingredients: IngredientsResponseInterface[];
}

export interface CreateOrderResponseInterface {
  success: boolean;
  name: string;
  order: OrderResponseInterface;
  message?: string; // for the non-success case
}
