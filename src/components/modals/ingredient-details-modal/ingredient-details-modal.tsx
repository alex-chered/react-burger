// components
import { Modal, ModalContent } from 'components/modals';
import { IngredientDetails } from 'components/common';
// store
import { useAppSelector } from 'store';
import { ingredientsSelectors } from 'store/ingredients';
// hooks
import { useIngredientsActions } from 'hooks/ingredients';

// Get required selectors
const { currentIngredientSelector } = ingredientsSelectors;

// COMPONENT
export const IngredientDetailsModal = () => {
  // Get current ingredient from the store
  const { currentIngredient } = useAppSelector(currentIngredientSelector);

  // Function to clear current ingredient in the store
  const { clearCurrentIngredient } = useIngredientsActions();

  if (!currentIngredient) {
    return null;
  }

  // RENDER
  return (
    <Modal
      header="Детали ингредиента"
      position="center"
      hasOwnRoute
      onClose={clearCurrentIngredient}
    >

      {/* CONTENT */}
      <ModalContent>
        <IngredientDetails ingredient={currentIngredient} />
      </ModalContent>

    </Modal>
  );
};
