import { useRef, memo } from 'react';
// hooks
import { useConstructorActions } from 'hooks/constructor';
import { useDropIngredientToConstructor } from 'hooks/drag-drop';
// store
import { useAppSelector } from 'store';
import { burgerConstructorSelectors } from 'store/burger-constructor';
// aux.
import { ConstructorComponent } from '../constructor-component';
// css
import styles from './constructor-bottom.module.css';

// COMPONENT
export const ConstructorBottom = memo(() => {
  // Ref to the root element
  const ref = useRef<HTMLDivElement>(null);

  // Get the bun from the burger constructor
  const { bun } = useAppSelector(burgerConstructorSelectors.bunSelector);

  // Get function to add a bun to the constructor
  const { addBun } = useConstructorActions();

  // Get data for drop operation
  const {
    isOver,
    canDrop,
    connectRef
  } = useDropIngredientToConstructor(['bun'], addBun);

  // Connect dnd to the root element
  connectRef(ref);

  // RENDER
  return (
    <div
      key="bottom-wrapper"
      className={styles['constructor__bottom']}
      ref={ref}
    >

      {/* Empty item */}
      {
        !bun && (
          <ConstructorComponent
            key="bottom"
            defaultText="Перенесите сюда булочку..."
            position="bottom"
            shadowCanDrop={canDrop}
            shadowOver={isOver}
          />
        )
      }

      {/* Non-empty item */}
      {
        bun && (
          <ConstructorComponent
            key="bottom"
            ingredient={bun}
            iconName="LockIcon"
            iconType="secondary"
            position="bottom"
            shadowCanDrop={canDrop}
            shadowOver={isOver}
          />
        )
      }

    </div>
  );
});
