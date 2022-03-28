import { useState } from 'react';
// router
import {
  Route,
  Switch,
  useLocation,
  useHistory
} from 'react-router-dom';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Location } from 'history';
// third-party libraries
import { v4 as uuid } from 'uuid';
// pages
import {
  HomePage,
  IngredientPage,
  FeedPage,
  OrderPage,
  ProfilePage,

  LoginPage,
  RegistrationPage,
  ForgotPasswordPage,
  ResetPasswordPage,

  NotFoundPage
} from 'pages';
// components
import { IngredientDetailsModal, OrderModal } from 'components/modals';
import { NotForLoggedInRoute } from 'components/common/routes';

interface LocationStateInterface {
  background: Location<LocationStateInterface>
}

// ROUTES
export const Routes = () => {
  //
  const [idLoginPage] = useState<string>(uuid());
  const [idRegisterPage] = useState<string>(uuid());
  const [idForgetPasswordPage] = useState<string>(uuid());

  // Get the current location
  const location = useLocation<LocationStateInterface>();
  // Determine the action type
  const history = useHistory();
  let background;
  if (history.action !== 'POP') {
    // Try to get the previous location
    background = location.state && location.state.background;
  }

  return (
    <>
      <Switch location={background || location}>
        {/* HOME */}
        <Route path="/" exact>
          <HomePage />
        </Route>

        {/* Ingredient Details */}
        <Route path="/ingredients/:ingredientId" exact>
          <IngredientPage />
        </Route>

        {/* FEED */}
        <Route path="/feed" exact>
          <FeedPage />
        </Route>
        {/* FEED ORDER */}
        <Route path="/feed/:orderId" exact>
          <OrderPage />
        </Route>

        {/* PROFILE */}
        <Route path="/profile">
          <ProfilePage />
        </Route>

        {/* LOGIN */}
        <NotForLoggedInRoute
          key={idLoginPage}
          path="/login"
          exact
        >
          <LoginPage />
        </NotForLoggedInRoute>
        {/* REGISTER */}
        <NotForLoggedInRoute
          key={idRegisterPage}
          path="/register"
          exact
        >
          <RegistrationPage />
        </NotForLoggedInRoute>
        {/* FORGET PASSWORD */}
        <NotForLoggedInRoute
          key={idForgetPasswordPage}
          path="/forgot-password"
          exact
        >
          <ForgotPasswordPage />
        </NotForLoggedInRoute>
        {/* -> RESET PASSWORD */}
        <Route
          path="/reset-password"
          exact
        >
          <ResetPasswordPage />
        </Route>

        {/* NOT FOUND */}
        <Route>
          <NotFoundPage />
        </Route>

      </Switch>

      {/* Modal window for "IngredientDetails" */}
      { background && (
        <Route
          path="/ingredients/:ingredientId"
        >
          <IngredientDetailsModal />
        </Route>
      ) }

      {/* Modal window for "FeedOrder" */}
      { background && (
        <Route
          path="/feed/:orderId"
        >
          <OrderModal mode="feed" />
        </Route>
      ) }
    </>
  );
};
