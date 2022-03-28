import { useCallback } from 'react';
// types
import { IngredientWithPositionModel } from 'models';

// HOOK
export const useSwapItemsInCollection = (
  collection: IngredientWithPositionModel[],
  setCollection: (data: IngredientWithPositionModel[]) => void
) => {
  const swap = useCallback((id1: string, id2: string) => {
    if (!id1 || !id2) {
      return;
    }
    if (id1 === id2) {
      return;
    }

    const copy = [...collection];

    const index1 = copy.findIndex((item) => item.positionId === id1);
    const index2 = copy.findIndex((item) => item.positionId === id2);

    if (index1 !== -1 && index2 !== -1) {
      const ingredient = { ...copy[index1] };

      copy.splice(index1, 1);
      copy.splice(index2, 0, ingredient);

      setCollection(copy);
    }
  }, [collection, setCollection]);

  return {
    swap
  };
};
