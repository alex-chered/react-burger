// third-party libraries
import classNames from 'classnames';
// components
import { Icon, IconNameType, IconTypeType } from 'components/icons';
import {
  Paragraph,
  Price
} from 'components/base';
// types
import {
  IngredientModel,
  IngredientWithPositionModel
} from 'models';
// css
import styles from './constructor-component.module.css';

// PROPS
interface ConstructorComponentProps {
  ingredient?: IngredientModel | IngredientWithPositionModel;
  iconName?: IconNameType;
  iconType?: IconTypeType;
  defaultText?: string;
  shadowCanDrop?: boolean;
  shadowOver?: boolean;
  position?: 'top' | 'bottom' | 'middle';
  renderKey?: boolean;
  onClickAction?: () => void;
  className?: string;
}

// COMPONENT
export const ConstructorComponent = (props: ConstructorComponentProps) => {
  const {
    ingredient,
    iconName = 'DeleteIcon',
    iconType = 'primary',
    defaultText = 'Перенесите сюда начинку...',
    shadowCanDrop = false,
    shadowOver = false,
    position = 'middle',
    renderKey = false,
    onClickAction,
    className = ''
  } = props;

  // Get required data from the ingredient
  const price = ingredient?.price || 0;
  const image = ingredient?.imageMobile || '';

  // Form the item description
  let description = ingredient?.name || '';
  if (position === 'top') {
    description = `${description} (верх)`;
  } else if (position === 'bottom') {
    description = `${description} (низ)`;
  }

  // css
  const classesIngredient = classNames(
    styles['constructor__ingredient'],
    {
      [styles['constructor__ingredient--empty']]: !ingredient,
      [styles['constructor--border']]: position === 'middle',
      [styles['constructor--border_top']]: position === 'top',
      [styles['constructor--border_bottom']]: position === 'bottom',
      'shadow--can-drop': shadowCanDrop,
      'shadow--over': shadowOver
    },
    className
  );

  // RENDER
  return (
    <div className={styles['constructor__component']}>

      {/* DRAG ICON */}
      {
        renderKey && (
          <Icon
            className={styles['constructor__component-key']}
            name="DragIcon"
            type="primary"
          />
        )
      }

      {/* INGREDIENT */}
      {
        ingredient && (
          <div className={classesIngredient}>
            <div className={styles['constructor__ingredient-inner']}>

              {/* Image */}
              <img
                className={styles['constructor__ingredient-image']}
                alt="logo"
                src={image}
              />

              {/* Description */}
              <Paragraph
                className={styles['constructor__ingredient-description']}
                text={description}
              />

              {/* Price */}
              <Price
                className={styles['constructor__ingredient-price']}
                price={price}
              />

              {/* Action Icon */}
              <Icon
                className={styles['constructor__ingredient-action']}
                name={iconName}
                type={iconType}
                onClick={onClickAction}
              />

            </div>
          </div>
        )
      }

      {/* NO INGREDIENT */}
      {
        !ingredient && (
          <div className={classesIngredient}>
            <Paragraph
              text={defaultText}
            />
          </div>
        )
      }

    </div>
  );
};
