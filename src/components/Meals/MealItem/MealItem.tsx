import React, { useContext } from 'react';
import MealItemForm from './MealItemForm';
import styles from './MealItem.module.scss';
import { cartActions } from '../../../store/redux';
import { useDispatch } from 'react-redux';

const MealItem = (props: any) => {
  const dispatch = useDispatch();
  const price = `$${props.price.toFixed(2)}`;

  const addToCartHandler = (amount: number) => {
    dispatch(cartActions.add({
      id: props.id,
      name: props.name,
      amount: amount,
      price: props.price
    }))
  };

  return (
    <li className={styles.meal}>
      <div style={{ marginRight: '2em' }}>
        <h3>{props.name}</h3>
        <div className={styles.description}>{props.description}</div>
        <div className={styles.price}>${props.price}</div>
      </div>
      <div>
        <MealItemForm addToCartHandler={addToCartHandler} id={props.id} />
      </div>
    </li>
  );
};

export default MealItem;
