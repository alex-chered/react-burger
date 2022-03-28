// types
import { BurgerConstructorModel } from 'models';

// FUNCTION
export const isConstructorComplete = (constructor: BurgerConstructorModel) => {
  return constructor.bun && constructor.middle.length > 0;
};
