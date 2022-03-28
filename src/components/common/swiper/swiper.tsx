import {
  ReactNode,
  useRef,
  useEffect,
  RefObject
} from 'react';
// aux.
import { ActionDelete } from './action-delete';
// css
import styles from './swiper.module.css';

// PROPS
interface SwiperProps {
  elementRef: RefObject<HTMLDivElement>;
  children: ReactNode;
  onDelete?: () => void;
}

// COMPONENT
export const Swiper = (props: SwiperProps) => {
  const {
    elementRef,
    children,
    onDelete
  } = props;

  const deleteRef = useRef<HTMLDivElement>(null);

  //
  useEffect(() => {
    let start = 0;
    let offset = 0;

    let currentDelta = 0;

    const widthDeleteAction = 70;

    const element = elementRef.current;
    const deleteElement = deleteRef.current;

    // function to get the width of the component
    //
    const getComponentWidth = (): number => {
      return (element?.clientWidth || 0);
    };

    // function to get the threshold.
    // The threshold is a value when the element is deleted
    //
    const getThreshold = (): number => {
      return (getComponentWidth() * 60) / 100;
    };

    // function to set the "translateX" property
    // for the element
    //
    const setElementOffset = (data: number, smooth?: boolean): void => {
      if (!element) {
        return;
      }

      // set the offset
      if (data) {
        element.style.transform = `translateX(${data}px)`;
      } else {
        element.style.transform = '';
      }

      // set transition duration for smooth moving
      if (smooth) {
        element.style.transitionDuration = '0.5s';
      } else {
        element.style.transitionDuration = '';
      }
    };

    // function to set the "right" property
    // for the action "delete"
    //
    const setDeleteOffset = (data: number, options?: { duration?: number }) => {
      if (!deleteElement) {
        return;
      }

      // do offset
      if (data) {
        deleteElement.style.right = `${data}px`;
      } else {
        deleteElement.style.right = '';
      }

      // set duration
      if (options?.duration) {
        deleteElement.style.transitionDuration = `${options.duration}ms`;
      } else {
        deleteElement.style.transitionDuration = '';
      }
    };

    // function to zero the element height
    //
    const collapseElement = (): void => {
      // Get the DOM-element
      if (!element) {
        return;
      }

      // const height = elementRef.current.scrollHeight;
      // const style = elementRef.current.style;
      const { clientHeight: height, style } = element;

      // Use the method "requestAnimationFrame"
      //  to reset the height of the element
      requestAnimationFrame(() => {
        style.minHeight = 'initial';
        style.height = `${height}px`;
        style.transition = 'height 300ms';

        requestAnimationFrame(() => {
          style.height = '0';
          // onDelete && onDelete();
        });
      });
    };

    // element -> touch start
    const touchStartHandler = (e: TouchEvent) => {
      start = e.targetTouches[0].clientX;
    };

    // element -> touch move
    const touchMoveHandler = (e: TouchEvent) => {
      //
      const currentX = e.targetTouches[0].clientX;

      // calculate the offset of the last touch
      currentDelta = currentX - start;

      // calculate the "currentOffset" as "currentDelta" and saved "offset"
      const currentOffset = offset + currentDelta;

      //
      const threshold = getThreshold();

      // don't allow to swipe to the right
      if (currentOffset > 0) {
        setElementOffset(0);
      } else if (Math.abs(currentOffset) >= threshold) {
        setElementOffset(currentOffset);

        // move the action "Delete" to the left of the field "Actions"
        const deleteOffset = Math.abs(currentOffset + widthDeleteAction);
        setDeleteOffset(deleteOffset);
      } else {
        setElementOffset(currentOffset);

        // reset the offset for action "delete"
        setDeleteOffset(0);
      }
    };

    // element -> touch end
    //
    const touchEndHandler = () => {
      // save the current offset
      offset += currentDelta;

      //
      const componentWidth = getComponentWidth();
      const threshold = getThreshold();

      // don't allow to swipe to right
      if (offset > 0) {
        offset = 0;
        setElementOffset(offset);

      // offset is less than action width
      } else if (Math.abs(offset) < widthDeleteAction) {
        offset = 0;
        setElementOffset(offset, true);

      // offset is less than threshold
      } else if (Math.abs(offset) < threshold) {
        offset = widthDeleteAction * -1;
        setElementOffset(offset, true);

      // offset is greater than threshold
      } else if (Math.abs(offset) >= threshold) {
        offset = componentWidth * -1;
        setElementOffset(offset, true);

        // hide the "Delete" action in the left end
        setDeleteOffset(componentWidth, { duration: 500 });
      }
    };

    // action "delete" -> transition end
    //
    const deleteActionTransitionEndHandler = () => {
      if (!deleteElement) {
        return;
      }

      // handle the situation, when the action "delete"
      // get hidden in the left end
      if (deleteElement.style.right === `${getComponentWidth()}px`) {
        collapseElement();
        // onDelete && onDelete();
      } else if (deleteElement.style.height === '0') {
        onDelete && onDelete();
      }
    };

    const elementTransitionEndHandler = () => {
      // console.log('element', element);
      if (!element) {
        return;
      }

      if (element.style.height === '0' || element.style.height === '0px') {
        // console.log('collapsed1');
        onDelete && onDelete();
      }
    };

    // add handlers
    element?.addEventListener('touchstart', touchStartHandler);
    element?.addEventListener('touchmove', touchMoveHandler);
    element?.addEventListener('touchend', touchEndHandler);
    element?.addEventListener('transitionend', elementTransitionEndHandler);

    deleteElement?.addEventListener('transitionend', deleteActionTransitionEndHandler);

    // remove handlers
    return () => {
      element?.removeEventListener('touchstart', touchStartHandler);
      element?.removeEventListener('touchmove', touchMoveHandler);
      element?.removeEventListener('touchend', touchEndHandler);
      element?.removeEventListener('transitionend', elementTransitionEndHandler);

      deleteElement?.addEventListener('transitionend', deleteActionTransitionEndHandler);
    };
  }, [elementRef, onDelete]);

  // RENDER
  return (
    <div className={styles['swiper']}>

      {/* ACTIONS */}
      <div className={styles['swiper__actions']}>
        <ActionDelete elementRef={deleteRef} />
      </div>

      {/* CONTENT */}
      { children }

    </div>
  );
};
