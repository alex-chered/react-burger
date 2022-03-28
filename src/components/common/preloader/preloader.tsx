import { ReactNode, useEffect, useState } from 'react';
// hooks
import { useAuth } from 'hooks/auth';
// components
import { AppLoader } from 'components/common';

// PROPS
interface PreloaderProps {
  children: ReactNode
}

// COMPONENT
export const Preloader = (props: PreloaderProps) => {
  const { children } = props;

  // Here we store the flag whether prep actions are completed or not.
  // While prep actions aren't completed, we show loader
  const [preCompleted, setPreCompleted] = useState<boolean>(false);

  // Get function to get user by the token saved in cookies
  const { getUser } = useAuth();

  // Define the function to load required data before to render component
  const preloadData = async () => {
    try {
      // fetch user
      await getUser();
    } catch {
      //
    } finally {
      // complete prep
      setPreCompleted(true);
    }
  };

  useEffect(() => {
    preloadData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // LOADER
  if (!preCompleted) {
    return <AppLoader />;
  }

  // RENDER
  return (
    <>
      { children }
    </>
  );
};
