/* eslint-disable react/jsx-props-no-spreading */

import { useEffect, useState } from 'react';
// router
import { Route, Redirect, RouteProps } from 'react-router-dom';
// store
import { useAppSelector } from 'store';
import { authSelectors } from 'store/auth';
// hooks
import { useAuth } from 'hooks/auth';

// Get required selectors
const { userSelector } = authSelectors;

// COMPONENT
export const ProtectedRoute = ({ children, ...rest }: RouteProps) => {
  // Here we store the flag that all prep actions completed
  const [preCompleted, setPreCompleted] = useState<boolean>(false);

  // Get the current user
  const { user: currentUser } = useAppSelector(userSelector);

  // Function to get user by token
  const { getUser } = useAuth();

  // Method to load all the data before rendering the component
  const preLoadData = async () => {
    try {
      // Fetch user
      await getUser();
    } catch {
      //
    } finally {
      // complete prep
      setPreCompleted(true);
    }
  };

  useEffect(() => {
    preLoadData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // LOADER
  if (!preCompleted) {
    return null;
  }

  // RENDER
  return (
    <Route
      {...rest}
      render={({ location }) => {
        return currentUser
          ? children
          : <Redirect to={{ pathname: '/login', state: { from: location } }} />;
      }}
    />
  );
};
