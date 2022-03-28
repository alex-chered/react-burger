import { useEffect } from 'react';

type UseKeyPressProps = {
  key: string,
  keyUpHandler?: () => unknown,
  keyDownHandler?: () => unknown
}

// HOOK
export const useKeyPress = (
  props: UseKeyPressProps
) => {
  // Destrcutire props
  const { key, keyDownHandler, keyUpHandler } = props;

  // Define the logic of the hook
  useEffect(() => {
    const keyUp = (e: KeyboardEvent) => {
      (e.key.toLowerCase() === key) && keyUpHandler && keyUpHandler();
    };

    const keyDown = (e: KeyboardEvent) => {
      (e.key.toLowerCase() === key) && keyDownHandler && keyDownHandler();
    };

    document.addEventListener('keyup', keyUp);
    document.addEventListener('keydown', keyDown);

    return () => {
      document.removeEventListener('keyup', keyUp);
      document.removeEventListener('keydown', keyDown);
    };
  }, [key, keyUpHandler, keyDownHandler]);
};
