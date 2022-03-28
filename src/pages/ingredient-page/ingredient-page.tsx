import { useEffect, memo, useState } from 'react';
// router
import { useParams, useHistory } from 'react-router-dom';
// components
import { Paragraph } from 'components/base';
import { IngredientDetails, AppLoader, AppMessage } from 'components/common';
// hooks
import { useIngredientsActions } from 'hooks/ingredients';
// store
import { useAppSelector } from 'store';
import { ingredientsSelectors } from 'store/ingredients';
import { commonSelectors } from 'store/common';
// css
import styles from './ingredient-page.module.css';

// Get selectors
const {
  ingredientByIdSelector,
  loadingSelector,
  errorTextSelector,
  dataLengthSelector
} = ingredientsSelectors;
const {
  modeSelector
} = commonSelectors;

// COMPONENT
export const IngredientPage = memo(() => {
  // Get method to fetch ingredients
  const { fetchIngredients } = useIngredientsActions();

  const [preloadCompleted, setPreloadCompleted] = useState<boolean>(false);

  const {
    mode
  } = useAppSelector(modeSelector);

  const { replace } = useHistory();

  // Get the ingredient id from the url
  const { ingredientId } = useParams<{ ingredientId: string }>();

  // Get the ingredient by id
  const { ingredient } = useAppSelector(ingredientByIdSelector(ingredientId));

  // Get the status of ingredients loading
  const { dataLength: ingredientsLength } = useAppSelector(dataLengthSelector);
  const { loading: ingredientsLoading } = useAppSelector(loadingSelector);
  const { errorText: ingredientsErrorText } = useAppSelector(errorTextSelector);

  // Method to load all the data before rendering the component
  const preLoadData = async () => {
    // load ingredients
    if (ingredientsLength === 0) {
      await fetchIngredients();
    }
    //
    setPreloadCompleted(true);
  };

  useEffect(() => {
    preLoadData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // In mobile mode
  // open modal window instead page
  useEffect(() => {
    if (!preloadCompleted) {
      return;
    }
    // in mode = 'mobile' we don't show this page.
    if (mode !== 'mobile') {
      return;
    }
    // instead we must open modal window with ingredient
    replace('/', { command: 'openIngredientModal', ingredientId });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [preloadCompleted, mode, ingredientId]);

  // LOADER
  if (ingredientsLoading) {
    return <AppLoader />;
  }

  // ERROR
  if (ingredientsErrorText) {
    return <AppMessage message={ingredientsErrorText} />;
  }

  // NO DATA
  if (!ingredient) {
    return null;
  }

  // RENDER
  return (
    <div className={styles['ingredient-page']}>
      <div className={styles['ingredient-page__section-ingredient']}>

        {/* HEADER */}
        <Paragraph
          className={styles['ingredient-page__header']}
          size="large"
          text="Детали ингредиента"
        />

        {/* INGREDIENT */}
        <IngredientDetails
          ingredient={ingredient}
        />

      </div>
    </div>
  );
});
