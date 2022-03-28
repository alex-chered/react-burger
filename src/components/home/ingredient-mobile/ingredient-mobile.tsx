import { memo } from 'react';
// router
import { Link, useLocation } from 'react-router-dom';
// third-party libraries
import classNames from 'classnames';
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
import { useConstructorActions } from 'hooks/constructor';
import { useIngredientUrl } from 'hooks/common';
// css
import styles from './ingredient-mobile.module.css';

// Get required selectors
const { ingredientByIdSelector } = ingredientsSelectors;
const { ingredientCountSelector } = burgerConstructorSelectors;

// PROPS
interface IngredientMobileProps {
  id: string;
  className?: string;
}

// COMPONENT
export const IngredientMobile = memo((props: IngredientMobileProps) => {
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

  // Functions to add ingredients to constructor
  const { addBun, addIngredient } = useConstructorActions();

  // Get the current location
  const location = useLocation();

  // Get the url to ingredient details
  const { path } = useIngredientUrl(id);

  // If there is no ingredient, return null
  if (!ingredient) {
    return null;
  }

  // Choose the right function depending on the ingredient type
  const addToConstructor = ingredient.type === 'bun'
    ? addBun
    : addIngredient;

  // css
  const classes = classNames(
    styles['ingredient'],
    className
  );

  // RENDER
  return (
    <div className={classes}>

      <Link
        className={styles['ingredient__content']}
        to={{
          pathname: path,
          state: { background: location }
        }}
        onClick={() => setCurrentIngredient(ingredient)}
      >

        {/* Image */}
        <BackgroundImage
          className={styles['ingredient__image']}
          src={ingredient.image}
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
      </Link>

      {/* Button Add */}
      <Paragraph
        className={styles['ingredient__btn-add']}
        text="Добавить"
        onClick={() => addToConstructor(ingredient)}
      />

      {/* Counter */}
      {
        count !== 0 && (
          <Counter
            count={count}
            size="small"
          />
        )
      }

    </div>
  );
});
