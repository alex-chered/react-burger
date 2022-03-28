import { memo } from 'react';
// third-party libraries
import classNames from 'classnames';
// types
import { TIngredientType } from 'models';
// components
import { Paragraph } from 'components/base';
// hooks
import { useAppSelector } from 'store';
import { ingredientsSelectors } from 'store/ingredients';
// aux.
import { Ingredient, IngredientMobile } from 'components/home';
// css
import styles from './ingredient-group.module.css';

// Get required selectors
const { ingredientsByTypeSelector } = ingredientsSelectors;

// PROPS TYPE
interface IngredientGroupProps {
  name: string;
  ingredientsType: TIngredientType;
  mode?: 'desktop' | 'mobile';
  // A reference to the root div-element.
  // It's necessary for an animation
  refDiv?: React.RefObject<HTMLDivElement>;
  className?: string;
}

// COMPONENT
export const IngredientGroup = memo((props: IngredientGroupProps) => {
  const {
    name,
    ingredientsType,
    mode = 'desktop',
    refDiv,
    className
  } = props;

  // Get ingredients by the type from the store
  const { ingredients } = useAppSelector(ingredientsByTypeSelector(ingredientsType));

  // If there are no ingredients,
  // return null
  if (ingredients.length === 0) {
    return null;
  }

  // css
  const classes = classNames(
    styles['ingredient-group'],
    className
  );

  // RENDER
  return (
    <div
      className={classes}
      ref={refDiv}
    >

      {/* HEADER */}
      <Paragraph
        size="medium"
        text={name}
      />

      {/* CONTENT */}
      <div className={styles['ingredient-group__content']}>
        {/* -> MOBILE */}
        {
          mode === 'mobile' && ingredients.map((item) => (
            <IngredientMobile
              key={item.id}
              id={item.id}
            />
          ))
        }
        {/* -> DESKTOP */}
        {
          mode === 'desktop' && ingredients.map((item) => (
            <Ingredient
              key={item.id}
              id={item.id}
            />
          ))
        }
      </div>

    </div>
  );
});
