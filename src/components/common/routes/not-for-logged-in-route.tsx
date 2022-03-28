/* eslint-disable react/jsx-props-no-spreading */

// router
import { Route, Redirect, RouteProps } from 'react-router-dom';
// store
import { useAppSelector } from 'store';
import { authSelectors } from 'store/auth';

// Get required selectors
const { userSelector } = authSelectors;

// COMPONENT
export const NotForLoggedInRoute = ({ children, ...rest }: RouteProps) => {
  // Get the current user
  const { user: currentUser } = useAppSelector(userSelector);

  // RENDER
  return (
    <Route
      {...rest}
      render={() => {
        return currentUser
          ? <Redirect to={{ pathname: '/profile' }} />
          : children;
      }}
    />
  );
};
