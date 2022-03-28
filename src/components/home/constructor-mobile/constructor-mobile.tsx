// third-party libraries
import classNames from 'classnames';
// store
import { useAppSelector } from 'store';
import { burgerConstructorSelectors } from 'store/burger-constructor';
// aux.
import { ConstructorComponentMobile } from './constructor-component-mobile';
// css
import styles from './constructor-mobile.module.css';

// Get selectors
const {
  bunSelector,
  middleSelector
} = burgerConstructorSelectors;

// PROPS
interface ConstructorMobileProps {
  className?: string;
}

// COMPONENT
export const ConstructorMobile = (props: ConstructorMobileProps) => {
  const { className } = props;

  // Get data about burger-constructor
  const { bun } = useAppSelector(bunSelector);
  const { middle } = useAppSelector(middleSelector);

  // css
  const classes = classNames(
    styles['constructor'],
    className
  );

  // RENDER
  return (
    <div className={classes}>
      <div className={styles['constructor__content']}>
        <div className={styles['constructor__list']}>

          {/* TOP */}
          {
            bun && (
              <ConstructorComponentMobile
                key="top"
                ingredient={bun}
                position="top"
              />
            )
          }

          {/* MIDDLE */}
          {
            middle.map((item) => (
              <ConstructorComponentMobile
                key={item.positionId}
                ingredient={item}
              />
            ))
          }

          {/* BOTTOM */}
          {
            bun && (
              <ConstructorComponentMobile
                key="bottom"
                ingredient={bun}
                position="bottom"
              />
            )
          }

        </div>
      </div>
    </div>
  );
};
