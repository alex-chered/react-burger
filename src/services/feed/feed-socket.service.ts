// services
import { SocketBaseService } from 'services/base';

// SERVICE
class FeedSocketService extends SocketBaseService {
  protected createSocket(): void {
    this.socket = new WebSocket(this.url);
  }
}

// Create and export the instance of the service
export const feedSocketService = new FeedSocketService();
