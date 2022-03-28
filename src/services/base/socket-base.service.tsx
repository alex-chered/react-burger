// OPTIONS TYPE
export interface SocketServiceCreateOptions {
  openHandler?: (event?: Event) => unknown;
  closeHandler?: (event?: CloseEvent) => unknown;
  errorHandler?: (event: Event) => unknown;
  messageHandler?: (event: MessageEvent) => unknown;
}

// SOCKET
export abstract class SocketBaseService {
  protected socket: WebSocket | null = null;

  protected url = '';

  protected abstract createSocket(): void;

  // Function to create and start a web-socket connection
  public start(url: string, options?: SocketServiceCreateOptions): void {
    // If there is an active socket, close it
    if (this.socket) {
      this.socket.close();
    }

    this.url = url;

    // Create a socket
    this.createSocket();

    if (!this.socket) {
      return;
    }

    // Add a socket event handlers
    // -> onOpen
    if (options?.openHandler) {
      this.socket.onopen = options.openHandler;
    }
    // -> onClose
    if (options?.closeHandler) {
      this.socket.onclose = options.closeHandler;
    }
    // -> onError
    if (options?.errorHandler) {
      this.socket.onerror = options.errorHandler;
    }
    // -> onMessage
    if (options?.messageHandler) {
      this.socket.onmessage = options.messageHandler;
    }
  }

  // Function to close a web-socket connection
  public close(): void {
    if (this.socket) {
      this.socket.close();
    }
  }
}
