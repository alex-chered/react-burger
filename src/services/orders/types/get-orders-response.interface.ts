import { OrderResponseInterface } from './order-response.interface';

export interface GetOrdersResponseInterface {
  success: boolean;
  orders: OrderResponseInterface[];
}
