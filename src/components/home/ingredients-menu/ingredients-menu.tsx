// third-party libraries
import classNames from 'classnames';
// components
import { Tab } from 'components/base';
// types
import { TIngredientType } from 'models';
// css
import styles from './ingredients-menu.module.css';

// PROPS
interface IngredientsMenuProps {
  activeTab: TIngredientType;
  onClick: (data: TIngredientType) => void;
  className?: string;
}

// COMPONENT
export const IngredientsMenu = (props: IngredientsMenuProps) => {
  const { activeTab, onClick, className } = props;

  // css
  const classes = classNames(
    styles['ingredients-menu'],
    className
  );

  // RENDER
  return (
    <div className={classes}>

      <Tab<TIngredientType>
        text="Булки"
        value="bun"
        active={activeTab === 'bun'}
        onClick={onClick}
      />

      <Tab<TIngredientType>
        text="Соусы"
        value="sauce"
        active={activeTab === 'sauce'}
        onClick={onClick}
      />

      <Tab<TIngredientType>
        text="Начинки"
        value="main"
        active={activeTab === 'main'}
        onClick={onClick}
      />

    </div>
  );
};
