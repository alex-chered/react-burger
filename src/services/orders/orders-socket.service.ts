// services
import { SocketBaseService } from 'services/base';

// SERVICE
class OrdersSocketService extends SocketBaseService {
  private token = '';

  public setToken(token: string) {
    this.token = token;
  }

  protected createSocket(): void {
    // Create a socket
    this.socket = new WebSocket(`${this.url}?token=${this.token}`);
  }
}

// Create and export the instance of the service
export const ordersSocketService = new OrdersSocketService();
