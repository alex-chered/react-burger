import { memo } from 'react';
// aux.
import { ConstructorTop } from './constructor-top';
import { ConstructorMiddle } from './constructor-middle';
import { ConstructorBottom } from './constructor-bottom';
import { ConstructorFooter } from './constructor-footer';
// css
import styles from './constructor.module.css';

// COMPONENT
export const Constructor = memo(() => {
  // RENDER
  return (
    <div className={styles['constructor']}>

      {/* CONTENT */}
      <div className={styles['constructor__content']}>

        {/* -> TOP */}
        <ConstructorTop />
        {/* -> MIDDLE */}
        <ConstructorMiddle />
        {/* -> BOTTOM */}
        <ConstructorBottom />

      </div>

      {/* FOOTER */}
      <ConstructorFooter />

    </div>
  );
});
