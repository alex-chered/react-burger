import { useMemo } from 'react';
// types
import { IngredientModel } from 'models';
// aux.
import { OrderInfoItem } from '../order-info-item';
import { prepareIngredientsForOrderInfo } from '../utils';
// css
import styles from './order-info-list.module.css';

// PROPS
interface OrderInfoIngredientsProps {
  ingredients: IngredientModel[];
}

// COMPONENT
export const OrderInfoList = (props: OrderInfoIngredientsProps) => {
  const {
    ingredients
  } = props;

  // Define the list of items to render
  const contentList = useMemo(() => {
    // Convert the array of ingredients
    // to the required format
    const data = prepareIngredientsForOrderInfo(ingredients);

    return (
      <>
        {
          data.map((item) => (
            <OrderInfoItem
              key={item.id}
              img={item.img}
              name={item.name}
              num={item.num}
              price={item.price}
            />
          ))
        }
      </>
    );
  }, [ingredients]);

  // RENDER
  return (
    <div className={styles['order-info__list']}>
      { contentList }
    </div>
  );
};
