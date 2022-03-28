// third-party libraries
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
// components
import { Paragraph } from 'components/base';
import {
  IngredientsMenu,
  IngredientGroup,
  Constructor
} from 'components/home';
// types
import { TIngredientType } from 'models';
// aux.
import { useScroll } from '../hooks';
// css
import styles from './home-page-desktop.module.css';

// COMPONENT
export const HomePageDesktop = () => {
  const {
    refContainer,
    refBun,
    refSauce,
    refMain,
    currentTab,

    scrollToGroup,
    onScrollIngredientsHandler
  } = useScroll();

  // EVENT HANDLERS
  const onClickMenuItemHandler = (data: TIngredientType) => {
    scrollToGroup(data);
  };

  // RENDER
  return (
    <div className={styles['home-page']}>

      {/* HEADER */}
      <div className={styles['home-page__header']}>
        <Paragraph
          size="large"
          text="Соберите бургер"
        />
      </div>

      {/* CONTENT */}
      <div className={styles['home-page__content']}>

        <DndProvider backend={HTML5Backend}>

          {/* SECTION -> INGREDIENTS */}
          <section
            className={styles['home-page__section-ingredients']}
          >

            {/* MENU */}
            <IngredientsMenu
              activeTab={currentTab}
              onClick={onClickMenuItemHandler}
            />

            {/* INGREDIENTS */}
            <div
              className={styles['home-page__ingredients']}
              ref={refContainer}
              onScroll={onScrollIngredientsHandler}
            >

              {/* BUNS */}
              <IngredientGroup
                name="Булочки"
                ingredientsType="bun"
                refDiv={refBun}
              />

              {/* SAUCES */}
              <IngredientGroup
                name="Соусы"
                ingredientsType="sauce"
                refDiv={refSauce}
              />

              {/* MAIN */}
              <IngredientGroup
                name="Начинки"
                ingredientsType="main"
                refDiv={refMain}
              />

            </div>

          </section>

          {/* SECTION -> CONSTRUCTOR */}
          <section
            className={styles['home-page__section-constructor']}
          >
            <Constructor />
          </section>

        </DndProvider>
      </div>

    </div>
  );
};
