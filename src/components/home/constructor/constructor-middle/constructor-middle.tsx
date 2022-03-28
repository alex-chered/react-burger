import {
  useEffect,
  useMemo,
  useState,
  memo,
  useRef
} from 'react';
// third-party libraries
import classNames from 'classnames';
// hooks
import { useConstructorActions } from 'hooks/constructor';
import { useSwapItemsInCollection } from 'hooks/common';
import {
  useDropIngredientToConstructor,
  useDropIngredientSorting
} from 'hooks/drag-drop';
// store
import { useAppSelector } from 'store';
import { burgerConstructorSelectors } from 'store/burger-constructor';
// types
import { IngredientWithPositionModel } from 'models';
// aux.
import { ConstructorComponent } from '../constructor-component';
import { ConstructorSwapper } from '../constructor-swapper';
// css
import styles from './constructor-middle.module.css';

// PROPS
interface ConstructorMiddleProps {
  className?: string;
}

// COMPONENT
export const ConstructorMiddle = memo((props: ConstructorMiddleProps) => {
  const { className = '' } = props;

  // The ref to the root element
  const ref = useRef<HTMLDivElement>(null);

  // Save data about the middle of the burger constructor
  // in the local state.
  // To avoid updating the store on every swapping of items
  const [middleIngredients, setMiddleIngredients] = useState<IngredientWithPositionModel[]>([]);

  // Get the middle of the burger constructor
  // from the store
  const { middle } = useAppSelector(burgerConstructorSelectors.middleSelector);

  // Handles changes to burgerConstructor.middle
  useEffect(() => {
    setMiddleIngredients(middle);
  }, [middle]);

  // Get functions to manipulate with the constructor
  const { addIngredient, deleteIngredient, updateBurger } = useConstructorActions();

  // Get data for drop operation.
  // When an ingredient is being dragged
  // from the "Ingredients" section
  const {
    isOver,
    canDrop,
    connectRef
  } = useDropIngredientToConstructor(['main', 'sauce'], addIngredient);

  // Define the drop operation,
  // when an ingredient is being sorted
  // inside the "BurgerConstructor" container.
  useDropIngredientSorting(
    ref,
    middleIngredients,
    updateBurger
  );

  // Get function to swap items in a collection
  const { swap } = useSwapItemsInCollection(middleIngredients, setMiddleIngredients);

  // css
  const classes = classNames(
    styles['constructor__middle'],
    {
      'shadow--can-drop': (canDrop && !isOver),
      'shadow--over': isOver
    },
    className
  );

  // Content to render
  const content = useMemo(() => {
    // If no ingredients in the middle,
    // return the empty element
    if (middleIngredients.length === 0) {
      return (
        <ConstructorComponent
          key="middle"
          renderKey
          defaultText="Перенесите сюда начинку..."
        />
      );
    }
    // There are ingredients in the middle
    return (
      middleIngredients.map((ingredient) => (
        <ConstructorSwapper
          key={ingredient.positionId}
          ingredient={ingredient}
          swapHandler={swap}
        >
          <ConstructorComponent
            ingredient={ingredient}
            iconName="DeleteIcon"
            iconType="primary"
            renderKey
            onClickAction={() => deleteIngredient(ingredient.positionId)}
          />
        </ConstructorSwapper>
      ))
    );
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [middleIngredients, swap]);

  // Connect dnd to the root element
  connectRef(ref);

  // RENDER
  return (
    <div
      key="middle-wrapper"
      className={classes}
      ref={ref}
    >
      { content }
    </div>
  );
});
