import React, { useContext } from 'react';
import MealItemForm from './MealItemForm';
import styles from './MealItem.module.scss';
// import CartContext from '../../../store/cart-context';

const MealItem = (props: any) => {
  // const cartCtx = useContext(CartContext);
  // const price = `$${props.price.toFixed(2)}`;

  // const addToCartHandler = (amount: number) => {
  //   cartCtx.addItem({
  //     id: props.id,
  //     name: props.name,
  //     amount: amount,
  //     price: props.price
  //   })
  // };

  return (
    <li className={styles.meal}>
      {/* <div style={{ marginRight: '2em' }}>
        <h3>{props.name}</h3>
        <div className={styles.description}>{props.description}</div>
        <div className={styles.price}>{price}</div>
      </div>
      <div>
        <MealItemForm addToCartHandler={addToCartHandler} id={props.id} />
      </div> */}
      meal item
    </li>
  );
};

export default MealItem;
