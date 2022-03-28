// Custom types
import { BurgerConstructorModel } from 'models';

// FUNCTION
export const getIDsFromConstructor = (
  constructor: BurgerConstructorModel
): string[] => {
  const ids: string[] = [];

  // from the top
  const { bun } = constructor;
  if (bun) {
    ids.push(bun.id);
    ids.push(bun.id);
  }

  // from the middle
  const { middle } = constructor;
  middle.forEach((item) => ids.push(item.id));

  return ids;
};
