export class CreateOrderError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'CreateOrderError';
  }
}
