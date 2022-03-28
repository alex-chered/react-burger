// services
import { HttpBaseService } from 'services/base';
import { AppSettingsService } from 'services/app-settings';
// types
import { ParameterNotValidatedError } from '../parameter-not-validated.error';
// aux.
import {
  OrderResponseInterface,
  GetOrdersResponseInterface,
  CreateOrderResponseInterface
} from './types';
import { CreateOrderError } from './errors';

// SERVICE
export class OrdersService extends HttpBaseService {
  // CreateOrder url
  private urlOrders = '/api/orders';

  // CREATE ORDER
  public async createOrder(ingredients: string[], token: string): Promise<OrderResponseInterface> {
    const defaultMessage = 'При создании заказа произошла ошибка.';

    try {
      if (!ingredients.length) {
        throw new ParameterNotValidatedError('В заказе не указаны ингредиенты.');
      }

      // Do the request
      const response = await fetch(`${this.baseUrl}${this.urlOrders}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
          authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ ingredients })
      });

      // Get data from the response
      const responseData: CreateOrderResponseInterface = await response.json();

      // If we got response,
      // but response has an error
      if (!responseData.success) {
        throw new CreateOrderError(responseData.message || defaultMessage);
      }

      const rawOrder: OrderResponseInterface = {
        ...responseData.order,
        ingredients: responseData.order.ingredients.map((ingredient) => ingredient._id)
      };

      return rawOrder;
    } catch (err) {
      // log errors. For example,
      // if (err instanceof CreateOrderError) {
      //  log(err.message)
      // }
      throw new Error(defaultMessage);
    }
  }

  // GET ORDER
  public async getOrder(orderNumber: string): Promise<OrderResponseInterface> {
    const defaultMessage = 'Не удалось получить информацию о заказе';

    try {
      if (!orderNumber.trim()) {
        throw new ParameterNotValidatedError('Не указан номер заказа.');
      }

      // Do the request
      const response = await fetch(`${this.baseUrl}${this.urlOrders}/${orderNumber}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        }
      });

      // Get data from the response
      const responseData: GetOrdersResponseInterface = await response.json();

      // If we got response,
      // but response has an error
      if (!responseData.success) {
        throw new Error(defaultMessage);
      }

      // Check if the response has an order info
      if (responseData.orders.length === 0) {
        throw new Error(defaultMessage);
      }

      return responseData.orders[0];
    } catch {
      throw new Error(defaultMessage);
    }
  }
}

// Create the service instance
export const ordersService = new OrdersService(
  AppSettingsService.getBaseUrl() // baseUrl
);
