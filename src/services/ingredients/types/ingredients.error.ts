export class IngredientsError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'IngredientsError';
  }
}
