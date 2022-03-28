import { useEffect } from 'react';
// components
import { Paragraph } from 'components/base';
import { AppLoader } from 'components/common';
// hooks
import { useProfileSocket } from 'hooks/profile';
import { useIngredientsActions } from 'hooks/ingredients';
// store
import { useAppSelector } from 'store';
import { ingredientsSelectors } from 'store/ingredients';
import { commonSelectors } from 'store/common';
// aux.
import { ProfilePageOrdersDesktop } from '../profile-page-orders-desktop';
import { ProfilePageOrdersMobile } from '../profile-page-orders-mobile';
// css
import styles from './profile-page-orders.module.css';

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
export const ProfilePageOrders = () => {
  // Select data about ingredients
  const { dataLength: ingredientsLength } = useAppSelector(dataLengthSelector);
  const { loading: ingredientsLoading } = useAppSelector(loadingSelector);
  const { errorText: ingredientsErrorText } = useAppSelector(errorTextSelector);

  const { mode } = useAppSelector(modeSelector);

  // Get method to fetch ingredients
  const { fetchIngredients } = useIngredientsActions();

  // Functions to control socket
  const {
    wsLoading,
    wsErrorText,
    wsStart,
    wsClose
  } = useProfileSocket();

  const preLoadData = async () => {
    // load ingredients
    if (ingredientsLength === 0) {
      await fetchIngredients();
    }
    // await fetchOrder(orderId);
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
    return (
      <Paragraph
        className={styles['profile-page__error']}
        text={ingredientsErrorText || wsErrorText}
        size="medium"
      />
    );
  }

  // RENDER
  return (
    <>
      {/* FOR DESKTOP */}
      { mode === 'desktop' && <ProfilePageOrdersDesktop /> }
      {/* FOR MOBILE */}
      { mode === 'mobile' && <ProfilePageOrdersMobile /> }
    </>
  );
};
