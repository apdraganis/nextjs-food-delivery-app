import React from 'react';
import { Meal } from '../../../../pages/products';
import MealItemForm from './MealItemForm';
import styles from './MealItem.module.scss';
import { cartActions } from '../../../store/redux';
import { useDispatch } from 'react-redux';


const MealItem = ({ id, name, description, price }: Meal) => {
  console.log(typeof (id))
  const dispatch = useDispatch();

  const addToCartHandler = (amount: number) => {
    dispatch(cartActions.add({
      id: id,
      name: name,
      amount: amount,
      price: price
    }))
  };

  return (
    <li className={styles.meal}>
      <div style={{ marginRight: '2em' }}>
        <h3>{name}</h3>
        <div className={styles.description}>{description}</div>
        <div className={styles.price}>${price}</div>
      </div>
      <div>
        <MealItemForm addToCartHandler={addToCartHandler} id={id} />
      </div>
    </li>
  );
};

export default MealItem;
