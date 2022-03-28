import { useEffect, useState } from 'react';
// third-party libraries
import { useDrop } from 'react-dnd';
// types
import { IngredientModel, TIngredientType } from 'models';
// store
import { useAppSelector } from 'store';
import { ingredientsSelectors } from 'store/ingredients';

// get required selectors
const { ingredientByIdSelector } = ingredientsSelectors;

// HOOK
export const useDropIngredientToConstructor = (
  accepts: TIngredientType[],
  dropHandler: (ingredient: IngredientModel) => void
) => {
  // State to store the id of the added ingredient
  const [ingredientId, setIngredientId] = useState('');
  // Get the ingredient by id
  const { ingredient } = useAppSelector(ingredientByIdSelector(ingredientId));

  // When the ingredient changed,
  // add it to the constructor
  useEffect(() => {
    if (!ingredient) {
      return;
    }
    dropHandler(ingredient);
    // Zero the ingreident id
    setIngredientId('');
  }, [ingredient, dropHandler]);

  // Define data for a drag-and-drop operation
  const [{ isOver, canDrop }, connectRef] = useDrop(() => ({
    accept: accepts,
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop()
    }),
    drop: (
      item: { id: string }
    ) => setIngredientId(item.id)
  }));

  // RETURN
  return {
    isOver,
    canDrop,
    connectRef
  };
};
