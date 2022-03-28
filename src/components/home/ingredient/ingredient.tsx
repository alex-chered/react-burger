import { memo } from 'react';
// router
import { Link, useLocation } from 'react-router-dom';
// third-party libraries
import classNames from 'classnames';
import { useDrag } from 'react-dnd';
// components
import {
  Paragraph,
  BackgroundImage,
  Price
} from 'components/base';
import { Counter } from 'components/yandex';
// store
import { useAppSelector } from 'store';
import { ingredientsSelectors } from 'store/ingredients';
import { burgerConstructorSelectors } from 'store/burger-constructor';
// hooks
import { useIngredientsActions } from 'hooks/ingredients';
import { useIngredientUrl } from 'hooks/common';
// css
import styles from './ingredient.module.css';

// Get required selectors
const { ingredientByIdSelector } = ingredientsSelectors;
const { ingredientCountSelector } = burgerConstructorSelectors;

// PROPS
interface IngredientProps {
  id: string;
  className?: string;
}

// COMPONENT
export const Ingredient = memo((props: IngredientProps) => {
  const {
    id,
    className = ''
  } = props;

  // Get ingredient by id from the store
  const { ingredient } = useAppSelector(ingredientByIdSelector(id));

  // Get the count of the ingredient in the constructor
  const { count } = useAppSelector(ingredientCountSelector(id));

  // Function to set the current ingredient in the store
  const { setCurrentIngredient } = useIngredientsActions();

  // Get the current location
  const location = useLocation();

  // Define data for a drag-and-drop operation
  const [, dragRef] = useDrag({
    // Define the type of the draggable element
    // as the ingredient type
    type: ingredient?.type || '',
    // Define the item as the ingredient id
    item: { id: ingredient?.id || '' }
  });

  // Get the url to ingredient details
  const { path } = useIngredientUrl(id);

  // If there is no ingredient, return null
  if (!ingredient) {
    return null;
  }

  // css
  const classes = classNames(
    styles['ingredient'],
    className
  );

  // RENDER
  return (
    <Link
      className={classes}
      to={{
        pathname: path,
        state: { background: location }
      }}
      onClick={() => setCurrentIngredient(ingredient)}
      ref={dragRef}
    >

      <div className={styles['ingredient__content']}>

        {/* Image */}
        <BackgroundImage
          src={ingredient.image}
          className={styles['ingredient__image']}
        />

        {/* Price */}
        <Price
          className={styles['ingredient__price']}
          price={ingredient.price}
        />

        {/* Description */}
        <Paragraph
          className={styles['ingredient__description']}
          text={ingredient.name}
        />

      </div>

      {/* Counter */}
      {
        count !== 0 && (
          <Counter
            count={count}
            size="small"
          />
        )
      }

    </Link>
  );
});
