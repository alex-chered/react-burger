import { useState, useRef, RefObject } from 'react';
// types
import { TIngredientType } from 'models';

// HOOK
export const useScroll = () => {
  const [currentTab, setCurrentTab] = useState<TIngredientType>('bun');

  // A reference to the group with "Buns"
  const refBun = useRef<HTMLDivElement>(null);
  // A reference to the group with "Sauces"
  const refSauce = useRef<HTMLDivElement>(null);
  // A reference to the group with "Main"
  const refMain = useRef<HTMLDivElement>(null);
  // A reference to the block containing all groups.
  // It's necessary for an animation
  const refContainer = useRef<HTMLDivElement>(null);
  // Save the references to groups in the special variable
  // eslint-disable-next-line no-unused-vars
  const refs = useRef<{ [K in TIngredientType]: RefObject<HTMLDivElement> }>({
    bun: refBun,
    sauce: refSauce,
    main: refMain
  });

  // Function to get element ref by the ingredient type
  const getRefByType = (
    data: TIngredientType
  ): RefObject<HTMLDivElement> => refs.current[data];

  // Function to scroll to the group with the required ingredient type
  const scrollToGroup = (data: TIngredientType): void => {
    const elementRef = getRefByType(data);
    elementRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Function to get the nearest group to the container top (in fact the active group)
  const getActiveGroup = (): TIngredientType => {
    // The active group by default
    let activeGroup: TIngredientType = 'bun';
    // Get the container top
    const containerTop = refContainer.current?.getBoundingClientRect().top || 0;

    const data = Object.keys(refs.current)
      // get the array, in which each element has an ingredient type
      // and its top position
      .map((key) => {
        const typedKey = key as TIngredientType;
        const top = refs.current[typedKey].current?.getBoundingClientRect().top || 0;

        return { key: typedKey, top };
      })
      // sort the received elements with its top position
      // starting from the last
      .sort((first, second) => (second.top - first.top));

    // Define the nearest group to the container top
    for (let i = 0; i < data.length; i += 1) {
      if ((data[i].top - 10) <= containerTop) {
        activeGroup = data[i].key;
        break;
      }
    }

    return activeGroup;
  };

  // Handler to "Containers div" scroll event
  const onScrollIngredientsHandler = (): void => {
    setCurrentTab(getActiveGroup());
  };

  // RETURN
  return {
    refContainer,
    refBun,
    refSauce,
    refMain,
    currentTab,
    scrollToGroup,
    onScrollIngredientsHandler
  };
};
