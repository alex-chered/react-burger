import { useEffect, useState } from 'react';

// HOOK
export const useTimer = (seconds: number) => {
  const [finished, setFinished] = useState<boolean>(false);
  // Start the timer
  useEffect(() => {
    const timer = setTimeout(() => setFinished(true), seconds * 1000);

    return () => clearTimeout(timer);
  }, [seconds]);

  return {
    finished
  };
};
