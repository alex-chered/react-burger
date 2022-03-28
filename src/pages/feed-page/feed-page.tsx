import { useEffect } from 'react';
// components
import { AppLoader, AppMessage } from 'components/common';
// hooks
import { useIngredientsActions } from 'hooks/ingredients';
import { useFeedSocket } from 'hooks/feed';
// store
import { useAppSelector } from 'store';
import { ingredientsSelectors } from 'store/ingredients';
import { commonSelectors } from 'store/common';
// aux.
import { FeedPageMobile } from './feed-page-mobile';
import { FeedPageDesktop } from './feed-page-desktop';

// Get required selectors
const {
  dataLengthSelector,
  loadingSelector,
  errorTextSelector
} = ingredientsSelectors;
const {
  modeSelector
} = commonSelectors;

// COMPONENT
export const FeedPage = () => {
  // Functions to control socket
  const {
    wsLoading,
    wsErrorText,
    wsStart,
    wsClose
  } = useFeedSocket();

  // Get method to fetch ingredients
  const { fetchIngredients } = useIngredientsActions();

  // Select data about ingredients
  const { dataLength: ingredientsLength } = useAppSelector(dataLengthSelector);
  const { loading: ingredientsLoading } = useAppSelector(loadingSelector);
  const { errorText: ingredientsErrorText } = useAppSelector(errorTextSelector);

  // Define "mode" of application: desktop or mobile
  const { mode } = useAppSelector(modeSelector);

  const preLoadData = async () => {
    // load ingredients
    if (ingredientsLength === 0) {
      await fetchIngredients();
    }
    // start web-socket
    wsStart();
  };

  useEffect(() => {
    preLoadData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Close the socket connection, when the page is unmounted
  useEffect(() => {
    return () => wsClose();
  }, [wsClose]);

  // LOADER
  if (ingredientsLoading || wsLoading) {
    return <AppLoader />;
  }

  // ERROR
  if (ingredientsErrorText || wsErrorText) {
    return <AppMessage message={ingredientsErrorText || wsErrorText} />;
  }

  // RENDER
  return (
    <>
      {/* FOR DESKTOP */}
      { mode === 'desktop' && <FeedPageDesktop /> }

      {/* FOR MOBILE */}
      { mode === 'mobile' && <FeedPageMobile /> }
    </>
  );
};
