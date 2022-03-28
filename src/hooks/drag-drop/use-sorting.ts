import { RefObject, useEffect } from 'react';
// Third-party libraries
import { useDrag, useDrop } from 'react-dnd';
// Custom models
import { IngredientWithPositionModel } from 'models';

// HOOK
export const useSorting = (
  ref: RefObject<HTMLDivElement>,
  ingredient: IngredientWithPositionModel,
  swapHandler: (id1: string, id2: string) => void
) => {
  // Define the drag operation,
  // when an ingredient is being sorted
  // inside the container.
  const [{ isDragging }, connectRefDrag] = useDrag({
    type: 'inner',
    item: { positionId: ingredient.positionId },
    collect: (monitor) => ({
      isDragging: monitor.isDragging()
    })
  });

  // Define the drop operation,
  // when an ingredient is being sorted
  // inside the container.
  const [, connectRefDrop] = useDrop(() => ({
    accept: 'inner',
    hover: (
      item: { positionId: string }
    ) => swapHandler(ingredient.positionId, item.positionId),
  }), [swapHandler]);

  // Connect ref to an element
  useEffect(() => {
    if (!ingredient || !ref.current) {
      return;
    }
    connectRefDrag(ref);
    connectRefDrop(ref);
  }, [ingredient, ref, connectRefDrag, connectRefDrop]);

  return {
    isDragging
  };
};
