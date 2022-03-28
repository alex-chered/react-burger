import classNames from 'classnames';
// components
import { Price, Button } from 'components/base';
import { ConstructorModal } from 'components/modals';
// hooks
import { useToggle } from 'hooks/common';
// store
import { useAppSelector } from 'store';
import { burgerConstructorSelectors } from 'store/burger-constructor';
// css
import styles from './home-page-footer-mobile.module.css';

// Get required selectors
const {
  totalSumSelector
} = burgerConstructorSelectors;

// PROPS
interface HomePageFooterMobileProps {
  className?: string;
}

// COMPONENT
export const HomePageFooterMobile = (props: HomePageFooterMobileProps) => {
  const { className } = props;

  const {
    state: isModalOpen,
    on: showConstructor,
    off: hideConstructor
  } = useToggle(false);

  // Get the total sum of the constructor
  const { totalSum } = useAppSelector(totalSumSelector);

  const classes = classNames(
    styles['home-page__footer'],
    className
  );

  // RENDER
  return (
    <div className={classes}>

      {/* PRICE */}
      <Price
        price={totalSum}
      />

      {/* SHOW ORDER */}
      <Button
        className={styles['home-page__show-order']}
        text="Смотреть заказ"
        size="small"
        onClick={showConstructor}
      />

      {/* MODAL WINDOW -> CONSTRUCTOR */}
      {
        isModalOpen && (
          <ConstructorModal onClose={hideConstructor} />
        )
      }

    </div>
  );
};
