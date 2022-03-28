import { useRef } from 'react';
// third-party libraries
import classNames from 'classnames';
// components
import { Paragraph, Price } from 'components/base';
import { Icon } from 'components/icons';
import { Swiper } from 'components/common';
// hooks
import { useConstructorActions } from 'hooks/constructor';
// types
import { IngredientModel, IngredientWithPositionModel } from 'models';
// css
import styles from './constructor-component-mobile.module.css';

// PROPS
interface ConstructorComponentMobileProps {
  ingredient: IngredientModel | IngredientWithPositionModel;
  position?: 'top' | 'bottom' | 'default';
}

const isIngredientWithPositionModel = (
  ingredient: IngredientModel | IngredientWithPositionModel
): ingredient is IngredientWithPositionModel => {
  return (ingredient as IngredientWithPositionModel).positionId !== undefined;
};

// COMPONENT
export const ConstructorComponentMobile = (props: ConstructorComponentMobileProps) => {
  const {
    ingredient,
    position = 'default'
  } = props;

  const {
    imageMobile,
    name,
    price
  } = ingredient;

  const positionId = isIngredientWithPositionModel(ingredient)
    ? ingredient.positionId
    : '';

  // ref to the element
  const componentRef = useRef<HTMLDivElement>(null);

  // hooks for store
  const { deleteIngredient } = useConstructorActions();

  // construct the name
  let displayName = name;
  if (position === 'top') {
    displayName = `${displayName} (верх)`;
  } else if (position === 'bottom') {
    displayName = `${displayName} (низ)`;
  }

  // css
  const classesIngredient = classNames(
    styles['constructor__ingredient'],
    {
      [styles['constructor__ingredient--border_top']]: position === 'top' || position === 'default',
      [styles['constructor__ingredient--border_bottom']]: position === 'bottom' || position === 'default'
    }
  );

  // SWIPER -> ON DELETE
  const handleSwiperOnDelete = () => {
    deleteIngredient(positionId);
  };

  // RENDER
  return (
    <Swiper
      elementRef={componentRef}
      onDelete={handleSwiperOnDelete}
    >

      {/* COMPONENT */}
      <div
        className={styles['constructor__component']}
        ref={componentRef}
      >

        {/* DRAG ICON */}
        <Icon
          className={styles['constructor__component-drag']}
          name="DragIcon"
          type="primary"
        />

        <div className={classesIngredient}>

          {/* LOGO */}
          <div className={styles['constructor__ingredient-image-wrapper']}>
            <img
              className={styles['constructor__ingredient-image']}
              src={imageMobile}
              alt="logo"
            />
          </div>

          {/* NAME */}
          <Paragraph
            className={styles['constructor__ingredient-name']}
            text={displayName}
          />

          {/* PRICE */}
          <Price
            className={styles['constructor__ingredient-price']}
            price={price}
          />

        </div>
      </div>

    </Swiper>
  );
};
