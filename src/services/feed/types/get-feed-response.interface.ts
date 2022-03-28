import { OrderResponseInterface } from 'services/orders';

export interface GetFeedResponseInterface {
  success: boolean;
  total: number;
  totalToday: number;
  orders: OrderResponseInterface[];
}
