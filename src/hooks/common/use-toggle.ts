import { useCallback, useState } from 'react';

// HOOK
export const useToggle = (initialState: boolean) => {
  const [state, setState] = useState(initialState);

  const on = useCallback(() => {
    setState(true);
  }, []);

  const off = useCallback(() => {
    setState(false);
  }, []);

  const toggle = useCallback(() => {
    setState((value) => !value);
  }, []);

  return {
    state,

    on,
    off,
    toggle
  };
};
