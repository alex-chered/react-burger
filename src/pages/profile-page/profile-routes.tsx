import { useState } from 'react';
// router
import {
  Switch,
  Route,
  useRouteMatch,
  useLocation,
  useHistory
} from 'react-router-dom';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Location } from 'history';
// third-party libraries
import { v4 as uuid } from 'uuid';
// components
import { ProtectedRoute } from 'components/common/routes';
import { OrderModal } from 'components/modals';
import { ProfileOrderPage } from 'pages';
// aux.
import { ProfilePageOrders } from './profile-page-orders';
import { ProfilePageProfileForm } from './profile-page-form';
import { ProfilePageNotFound } from './profile-page-not-found';

// Type for location
interface LocationStateInterface {
  backgroundProfile: Location<LocationStateInterface>
}

// COMPONENT
export const ProfileRoutes = () => {
  const [idProfileForm] = useState<string>(uuid());
  const [idProfileOrders] = useState<string>(uuid());
  const [idProfileOrder] = useState<string>(uuid());

  const { path } = useRouteMatch();

  // Get the current location
  const location = useLocation<LocationStateInterface>();

  // Determine the action type
  const history = useHistory();
  let background;
  if (history.action !== 'POP') {
    // Try to get the previous location
    background = location.state && location.state.backgroundProfile;
  }

  // Routes
  return (
    <>
      <Switch location={background || location}>

        {/* PROFILE ROOT */}
        {/* -> /profile */}
        <ProtectedRoute
          key={idProfileForm}
          path={path}
          exact
        >
          <ProfilePageProfileForm />
        </ProtectedRoute>

        {/* PROFILE ALL ORDERS */}
        {/* -> /profile/orders */}
        <ProtectedRoute
          key={idProfileOrders}
          path={`${path}/orders`}
          exact
        >
          <ProfilePageOrders />
        </ProtectedRoute>

        {/* PROFILE ORDER */}
        {/* -> /profile/orders/:orderId */}
        <ProtectedRoute
          key={idProfileOrder}
          path={`${path}/orders/:orderId`}
          exact
        >
          <ProfileOrderPage />
        </ProtectedRoute>

        {/* NOT FOUND */}
        <Route>
          <ProfilePageNotFound />
        </Route>

      </Switch>

      {/* Modal window for "ProfileOrder" */}
      { background && (
        <Route
          path={`${path}/orders/:orderId`}
          exact
        >
          <OrderModal mode="profile" />
        </Route>
      ) }
    </>
  );
};
