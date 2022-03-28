import { useEffect, memo } from 'react';
// hooks
import { useIngredientsActions } from 'hooks/ingredients';
// store
import { useAppSelector } from 'store';
import { ingredientsSelectors } from 'store/ingredients';
import { commonSelectors } from 'store/common';
// components
import { AppLoader, AppMessage } from 'components/common';
// aux.
import { HomePageDesktop } from './home-page-desktop';
import { HomePageMobile } from './home-page-mobile';

// Get selectors
const {
  dataLengthSelector,
  loadingSelector,
  errorTextSelector
} = ingredientsSelectors;
const {
  modeSelector
} = commonSelectors;

// COMPONENT
export const HomePage = memo(() => {
  // Get method to fetch ingredients
  const { fetchIngredients } = useIngredientsActions();

  // Get status about ingredients loading
  const { loading: ingredientsLoading } = useAppSelector(loadingSelector);
  const { errorText: ingredientsErrorText } = useAppSelector(errorTextSelector);
  const { dataLength: ingredientsLength } = useAppSelector(dataLengthSelector);

  // Define "mode" of application: desktop or mobile
  const { mode } = useAppSelector(modeSelector);

  // Method to load all the required data
  const preLoadData = async () => {
    // load ingredients
    if (ingredientsLength === 0) {
      await fetchIngredients();
    }
  };

  useEffect(() => {
    preLoadData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // LOADER
  if (ingredientsLoading) {
    return <AppLoader />;
  }

  // ERROR
  if (ingredientsErrorText) {
    return <AppMessage message={ingredientsErrorText} />;
  }

  // RENDER
  return (
    <>
      {/* FOR DESKTOP */}
      { mode === 'desktop' && <HomePageDesktop /> }

      {/* FOR MOBILE */}
      { mode === 'mobile' && <HomePageMobile /> }
    </>
  );
});
