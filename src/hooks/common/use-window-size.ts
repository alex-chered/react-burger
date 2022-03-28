import { useEffect } from 'react';
// store
import { useAppDispatch } from 'store';
import { setModeAction } from 'store/common';

// HOOK
export const useWindowSize = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    // Handler to call on window resize
    function handleResize() {
      //
      if (window.innerWidth >= 1200) {
        dispatch(setModeAction({ mode: 'desktop' }));
      } else {
        dispatch(setModeAction({ mode: 'mobile' }));
      }
    }
    // Add event listener
    window.addEventListener('resize', handleResize);
    // Call handler right away so state gets updated with initial window size
    handleResize();
    // Remove event listener on cleanup
    return () => window.removeEventListener('resize', handleResize);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Empty array ensures that effect is only run on mount
};
