import { useRef, ReactNode } from 'react';
// third-party libraries
import classNames from 'classnames';
// hooks
import { useSorting } from 'hooks/drag-drop';
// types
import { IngredientWithPositionModel } from 'models';
// css
// import styles from '../constructor.module.css';

// PROPS
interface ConstructorSwapperProps {
  children: ReactNode;
  ingredient: IngredientWithPositionModel;
  swapHandler: (id1: string, id2: string) => void;
}

// COMPONENT
export const ConstructorSwapper = (props: ConstructorSwapperProps) => {
  const {
    children,
    ingredient,
    swapHandler
  } = props;

  // The ref to the root element
  const ref = useRef<HTMLDivElement>(null);

  // Connect drag-drop sorting
  const { isDragging } = useSorting(ref, ingredient, swapHandler);

  // css-classes for the root element
  const classes = classNames({ invisible: isDragging });

  // RENDER
  return (
    <div
      className={classes}
      ref={ref}
    >
      { children }
    </div>
  );
};
