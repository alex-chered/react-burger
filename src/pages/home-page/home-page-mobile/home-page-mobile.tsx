import { useEffect } from 'react';
// router
import { useHistory, useLocation } from 'react-router-dom';
// components
import { Paragraph, FooterPortal } from 'components/base';
import {
  IngredientsMenu,
  IngredientGroup
} from 'components/home';
// store
import { useAppSelector } from 'store';
import { ingredientsSelectors } from 'store/ingredients';
// hooks
import { useIngredientsActions } from 'hooks/ingredients';
// types
import { TIngredientType } from 'models';
// aux.
import { useScroll } from '../hooks';
import { HomePageFooterMobile } from '../home-page-footer-mobile';
// css
import styles from './home-page-mobile.module.css';

interface LocationStateInterface {
  command?: string;
  ingredientId?: string;
}

// get selectors
const {
  ingredientByIdSelector
} = ingredientsSelectors;

// COMPONENT
export const HomePageMobile = () => {
  const {
    refContainer,
    refBun,
    refSauce,
    refMain,
    currentTab,

    scrollToGroup,
    onScrollIngredientsHandler
  } = useScroll();

  // Get location data
  const location = useLocation<LocationStateInterface>();
  const command = location.state && location.state.command;
  const ingredientId = (location.state && location.state.ingredientId) || '';
  // Get history data
  const history = useHistory();
  const { action, push } = history;

  // Get action to set current ingredient
  const { setCurrentIngredient } = useIngredientsActions();

  // Get ingredient by id
  const { ingredient } = useAppSelector(ingredientByIdSelector(ingredientId));

  useEffect(() => {
    // Handle just "REPLACE" actions
    if (action !== 'REPLACE') {
      return;
    }
    //
    if (!ingredient) {
      return;
    }
    // Handle "openIngredientModal" command
    if (command === 'openIngredientModal') {
      // set current ingredient
      ingredient && setCurrentIngredient(ingredient);
      // push to new url
      push(`/ingredients/${ingredient.id}`, { background: location });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [action, command, ingredient, setCurrentIngredient]);

  // EVENT HANDLERS
  const onClickMenuItemHandler = (data: TIngredientType) => {
    scrollToGroup(data);
  };

  // RENDER
  return (
    <>
      <div className={styles['home-page']}>
        <section className={styles['home-page__section-ingredients']}>

          {/* HEADER */}
          <Paragraph
            className={styles['home-page__header']}
            size="large"
            text="Соберите бургер"
          />

          {/* MENU */}
          <IngredientsMenu
            className={styles['home-page__menu']}
            activeTab={currentTab}
            onClick={onClickMenuItemHandler}
          />

          {/* CONTENT */}
          <div
            className={styles['home-page__ingredients']}
            ref={refContainer}
            onScroll={onScrollIngredientsHandler}
          >

            {/* BUNS */}
            <IngredientGroup
              name="Булочки"
              ingredientsType="bun"
              mode="mobile"
              refDiv={refBun}
            />

            {/* SAUCES */}
            <IngredientGroup
              name="Соусы"
              ingredientsType="sauce"
              mode="mobile"
              refDiv={refSauce}
            />

            {/* MAIN */}
            <IngredientGroup
              name="Начинки"
              ingredientsType="main"
              mode="mobile"
              refDiv={refMain}
            />

          </div>

        </section>

      </div>

      {/* FOOTER */}
      <FooterPortal>
        <HomePageFooterMobile
          className={styles['home-page__footer']}
        />
      </FooterPortal>

    </>
  );
};
