// components
import { IngredientLogo } from 'components/base';
// types
import { IngredientModel } from 'models';
// css
import styles from '../order-card.module.css';

interface IElement {
  imgPath: string;
  num: number;
}

// PROPS
interface OrderCardPreviewProps {
  ingredients: IngredientModel[];
}

// COMPONENT
export const OrderCardPreview = (props: OrderCardPreviewProps) => {
  const { ingredients } = props;

  let firstElement: IElement | null = null;
  let secondElement: IElement | null = null;
  let thirdElement: IElement | null = null;
  let fourthElement: IElement | null = null;
  let fifthElement: IElement | null = null;
  let sixthElement: IElement | null = null;

  // FIRST
  if (ingredients.length > 0) {
    firstElement = {
      imgPath: ingredients[0].imageMobile,
      num: 0
    };
  }

  // SECOND
  if (ingredients.length > 1) {
    secondElement = {
      imgPath: ingredients[1].imageMobile,
      num: 0
    };
  }

  // THIRD
  if (ingredients.length > 2) {
    thirdElement = {
      imgPath: ingredients[2].imageMobile,
      num: 0
    };
  }

  // FOURTH
  if (ingredients.length > 3) {
    fourthElement = {
      imgPath: ingredients[3].imageMobile,
      num: 0
    };
  }

  // FIFTH
  if (ingredients.length > 4) {
    fifthElement = {
      imgPath: ingredients[4].imageMobile,
      num: 0
    };
  }

  // SIXTH
  if (ingredients.length > 5) {
    sixthElement = {
      imgPath: ingredients[5].imageMobile,
      num: ingredients.length - 5
    };
  }

  // RENDER
  return (
    <div className={styles['order-card__preview']}>

      {/* FIRST */}
      <div className={styles['order-card__preview-first']}>
        { firstElement && (
          <IngredientLogo
            key={1}
            imgPath={firstElement.imgPath}
            num={firstElement.num}
          />
        ) }
      </div>

      {/* SECOND */}
      <div className={styles['order-card__preview-second']}>
        { secondElement && (
          <IngredientLogo
            key={2}
            imgPath={secondElement.imgPath}
            num={secondElement.num}
          />
        ) }
      </div>

      {/* THIRD */}
      <div className={styles['order-card__preview-third']}>
        { thirdElement && (
          <IngredientLogo
            key={3}
            imgPath={thirdElement.imgPath}
            num={thirdElement.num}
          />
        ) }
      </div>

      {/* FOURTH */}
      <div className={styles['order-card__preview-fourth']}>
        { fourthElement && (
          <IngredientLogo
            key={4}
            imgPath={fourthElement.imgPath}
            num={fourthElement.num}
          />
        ) }
      </div>

      {/* FIFTH */}
      <div className={styles['order-card__preview-fifth']}>
        { fifthElement && (
          <IngredientLogo
            key={5}
            imgPath={fifthElement.imgPath}
            num={fifthElement.num}
          />
        ) }
      </div>

      {/* SIXTH */}
      <div className={styles['order-card__preview-sixth']}>
        { sixthElement && (
          <IngredientLogo
            key={6}
            imgPath={sixthElement.imgPath}
            num={sixthElement.num}
            shadowed
          />
        ) }
      </div>
    </div>
  );
};
