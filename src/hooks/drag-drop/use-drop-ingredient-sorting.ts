import { useEffect, RefObject } from 'react';
// Third-party libraries
import { useDrop } from 'react-dnd';
import { IngredientWithPositionModel } from 'models';

export const useDropIngredientSorting = (
  ref: RefObject<HTMLDivElement>,
  ingredients: IngredientWithPositionModel[],
  dropHandler: (data: IngredientWithPositionModel[]) => void
) => {
  // Define the drop operation,
  // when an ingredient is being sorted
  // inside the "BurgerConstructor" container.
  const [
    { isOver, canDrop },
    connectRef
  ] = useDrop({
    accept: 'inner',
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop()
    }),
    drop: () => dropHandler(ingredients)
  });

  // Connect ref to an element
  useEffect(() => {
    if (!ref.current) {
      return;
    }
    connectRef(ref);
  }, [ref, connectRef]);

  // RETURN
  return {
    isOver,
    canDrop
  };
};
