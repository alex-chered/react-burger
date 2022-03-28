// components
import {
  Paragraph,
  IngredientLogo,
  Price
} from 'components/base';
// css
import styles from './order-info-item.module.css';

// PROPS
interface OrderInfoItemProps {
  img: string;
  name: string;
  num: number;
  price: number;
}

// COMPONENT
export const OrderInfoItem = (props: OrderInfoItemProps) => {
  const {
    img,
    name,
    num,
    price
  } = props;

  // RENDER
  return (
    <div className={styles['order-info__item']}>

      {/* Image */}
      <IngredientLogo
        imgPath={img}
      />

      {/* Name */}
      <Paragraph
        className={styles['order-info__item-name']}
        text={name}
      />

      {/* Price */}
      <Price
        price={price}
        num={num}
      />

    </div>
  );
};
