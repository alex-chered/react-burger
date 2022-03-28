// router
import { useRouteMatch } from 'react-router-dom';

// HOOK
export const useIngredientUrl = (ingredientId: string) => {
  // Get the current url
  let { url } = useRouteMatch();
  if (url === '/') {
    url = '';
  }
  // Form the url to ingredient details
  const path = `${url}/ingredients/${ingredientId}`;

  // RETURN
  return {
    path
  };
};
