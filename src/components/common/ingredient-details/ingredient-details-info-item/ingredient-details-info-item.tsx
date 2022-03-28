// third-party libraries
import classNames from 'classnames';
// components
import { Paragraph, ParagraphDigits } from 'components/base';
// css
import styles from './ingredient-details-info-item.module.css';

// PROPS
interface IngredientDetailsInfoItemProps {
  caption: string;
  value: string;
  position?: 'right' | 'left' | 'default';
  className?: string;
}

// COMPONENT
export const IngredientDetailsInfoItem = (props: IngredientDetailsInfoItemProps) => {
  const {
    caption,
    value,
    position = 'default',
    className
  } = props;

  // css
  const classesWrapper = classNames(
    styles['ingredient-details__info-item-wrapper'],
    {
      right: position === 'right',
      left: position === 'left',
    },
    className
  );

  // RENDER
  return (
    <div className={classesWrapper}>
      <div className={styles['ingredient-details__info-item']}>

        {/* Caption */}
        <Paragraph
          className={styles['ingredient-details__info-caption']}
          text={caption}
        />

        {/* Value */}
        <ParagraphDigits
          className={styles['ingredient-details__info-value']}
          text={value}
        />

      </div>
    </div>
  );
};
