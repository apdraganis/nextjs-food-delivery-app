import React, { useContext, useState } from 'react';
import CartItem from './CartItem';
import styles from './Cart.module.scss';
import Checkout from './Checkout';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { cartActions } from '../../store/redux';
import { fireAuthContext } from '../../store/auth/fireAuthContext';
import { useRouter } from 'next/router';

const Cart = (props: any) => {
  const router = useRouter();
  const { user } = useContext(fireAuthContext);
  const items = useSelector((state: any) => state.items);
  const totalAmount = useSelector((state: any) => state.totalAmount);
  const dispatch = useDispatch();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCheckout, setIsCheckout] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);
  let discount;
  let totalPrice;
  let finalPrice;
  const hasItems = items.length > 0;

  if (user) {
    discount = +(0.2 * totalAmount).toFixed(2);
    totalPrice = `$${totalAmount.toFixed(2)}`;
    finalPrice = `$${(totalAmount - discount).toFixed(2)}`
  } else {
    totalPrice = `$${totalAmount.toFixed(2)}`;
  }

  const cartItemRemoveHandler = (id: string) => {
    dispatch(cartActions.remove(id))
  };

  const cartItemAddHandler = (item: any) => {
    dispatch(cartActions.add({ ...item, amount: 1 }))
  };

  const submitOrderHandler = async (userData: any) => {
    setIsSubmitting(true);
    await fetch('https://food-order-app-3e7e1-default-rtdb.europe-west1.firebasedatabase.app/orders.json', {
      method: 'POST',
      body: JSON.stringify({
        user: userData,
        orderItem: items
      })
    });
    setIsSubmitting(false);
    setDidSubmit(true);
    dispatch(cartActions.clear());
  };


  const cartItems = (
    <ul className={styles['cart-items']}>
      {items.map((item: any) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cartItemRemoveHandler.bind(null, item)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );

  const orderHandler = () => {
    props.onClose();
    router.push('/checkout');
    // setIsCheckout(true);
  };

  const modalActions = <div className={styles.actions}>
    <button className={styles['button--alt']} onClick={props.onClose}>
      Close
    </button>
    {hasItems && <button className={styles.button} onClick={orderHandler}>To Checkout</button>}
  </div>

  const discountContent =
    <React.Fragment>
      {user && (
        <div>
          <div className={styles.total}>
            <span>
              Registered User (-20%)
            </span>
            <span>-${discount}</span>
          </div>
          <div className={styles.total}>
            <span>Final Price</span>
            <span>{finalPrice}</span>
          </div>
        </div>
      )}
    </React.Fragment>

  const cartModalContent =
    <>
      {hasItems && (
        <>
          {cartItems}
          <div className={styles.total}>
            <span>Total Price</span>
            <span>{totalPrice}</span>
          </div>
          {discountContent}
          {isCheckout && <Checkout onConfirm={submitOrderHandler} setIsCheckout={setIsCheckout} />}
          {!isCheckout && modalActions}
        </>
      )}
      {!hasItems && <p>No items added...</p>}

    </>

  const isSubmittingModalContent = <p>Sending order data...</p>;
  const didSubmitModalContent = <>
    <p>Order sent successfully!</p>
    <div className={styles.actions}>
      <button className={styles.button} onClick={props.onClose}>
        Close
      </button>
    </div>
  </>

  return (
    <div>
      {!isSubmitting && !didSubmit && cartModalContent}
      {isSubmitting && isSubmittingModalContent}
      {didSubmit && didSubmitModalContent}
    </div>
  );
};

export default Cart;
