// third-party libraries
import classNames from 'classnames';
// components
import { Paragraph } from 'components/base';
// css
import styles from './ingredient-logo.module.css';

// PROPS
export interface IngredientLogoProps {
  imgPath: string;
  shadowed?: boolean;
  num?: number;
  className?: string;
}

// COMPONENT
export const IngredientLogo = (props: IngredientLogoProps) => {
  const {
    imgPath,
    shadowed = false,
    num = 0,
    className = ''
  } = props;

  // css
  const classes = classNames(
    styles['ingredient-logo'],
    className
  );

  // css-classes for the image
  const classesImg = classNames(
    styles['ingredient-logo__image'],
    {
      [`${styles['ingredient-logo__image--last']}`]: shadowed
    }
  );

  // RENDER
  return (
    <div className={classes}>
      <img
        alt="logo"
        className={classesImg}
        src={imgPath}
      />
      {
        num && (
          <Paragraph
            text={`+${num}`}
          />
        )
      }
    </div>
  );
};
