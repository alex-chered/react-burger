// third-party libraries
import classNames from 'classnames';
// types
import { IngredientModel } from 'models';
// components
import { Paragraph } from 'components/base';
// aux.
import { IngredientDetailsInfoItem } from './ingredient-details-info-item';
// css
import styles from './ingredient-details.module.css';

// PROPS
interface IngredientDetailsProps {
  ingredient: IngredientModel | null;
  className?: string;
}

// COMPONENT
export const IngredientDetails = (props: IngredientDetailsProps) => {
  const { ingredient, className } = props;

  // There is no ingredient passed
  if (!ingredient) {
    return null;
  }

  // css
  const classes = classNames(
    styles['ingredient-details'],
    className
  );

  // RENDER
  return (
    <div className={classes}>

      {/* Img */}
      <img
        className={styles['ingredient-details__image']}
        alt=""
        src={ingredient.imageLarge}
      />

      {/* Name */}
      <Paragraph
        className={styles['ingredient-details__name']}
        size="medium"
        text={ingredient.name}
      />

      {/* Info */}
      <div className={styles['ingredient-details__info']}>

        <IngredientDetailsInfoItem
          caption="Калории,ккал"
          value={`${ingredient.calories}`}
          position="right"
        />

        <IngredientDetailsInfoItem
          caption="Белки, г"
          value={`${ingredient.proteins}`}
          position="left"
        />

        <IngredientDetailsInfoItem
          caption="Жиры, г"
          value={`${ingredient.fat}`}
          position="right"
        />

        <IngredientDetailsInfoItem
          caption="Углеводы, г"
          value={`${ingredient.carbohydrates}`}
          position="left"
        />
      </div>

    </div>
  );
};
