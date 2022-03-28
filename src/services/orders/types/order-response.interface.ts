export interface OrderResponseInterface {
  _id: string;
  number: number;
  createdAt: string;
  name: string;
  status: 'created' | 'pending' | 'done';
  ingredients: string[];
}
