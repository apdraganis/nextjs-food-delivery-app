import React, { useContext, useState } from 'react';
import CartContext from '../../store/cart-context';
import CartItem from './CartItem';
import styles from './Cart.module.scss';
import Checkout from './Checkout';
import AuthContext from '../../store/auth-context';

const Cart = (props) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCheckout, setIsCheckout] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);
  const cartCtx = useContext(CartContext);
  const authCtx = useContext(AuthContext);

  let discount;
  let totalAmount;
  let finalPrice;
  const hasItems = cartCtx.items.length > 0;

  if (authCtx.isLoggedIn) {
    discount = +(0.2 * cartCtx.totalAmount).toFixed(2);
    totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
    finalPrice = `$${(cartCtx.totalAmount - discount).toFixed(2)}`
  } else {
    totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  }

  const cartItemRemoveHandler = id => {
    cartCtx.removeItem(id);
  };

  const cartItemAddHandler = item => {
    cartCtx.addItem({ ...item, amount: 1 });
  };

  const submitOrderHandler = async (userData) => {
    setIsSubmitting(true);
    await fetch('https://food-order-app-3e7e1-default-rtdb.europe-west1.firebasedatabase.app/orders.json', {
      method: 'POST',
      body: JSON.stringify({
        user: userData,
        orderItem: cartCtx.items
      })
    });
    setIsSubmitting(false);
    setDidSubmit(true);
    cartCtx.clearCart();
  };


  const cartItems = (
    <ul className={styles['cart-items']}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );

  const orderHandler = () => {
    setIsCheckout(true);
  };

  const modalActions = <div className={styles.actions}>
    <button className={styles['button--alt']} onClick={props.onClose}>
      Close
    </button>
    {hasItems && <button className={styles.button} onClick={orderHandler}>Order</button>}
  </div>

  const discountContent =
    <React.Fragment>
      {authCtx.isLoggedIn && (
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
    <React.Fragment>
      {cartItems}

      <div className={styles.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {discountContent}

      {isCheckout && <Checkout onConfirm={submitOrderHandler} setIsCheckout={setIsCheckout} />}
      {!isCheckout && modalActions}
    </React.Fragment>

  const isSubmittingModalContent = <p>Sending order data...</p>;
  const didSubmitModalContent = <React.Fragment>
    <p>Order sent successfully!</p>
    <div className={styles.actions}>
      <button className={styles.button} onClick={props.onClose}>
        Close
      </button>
    </div>
  </React.Fragment>

  return (
    <div onClose={props.onClose}>
      {!isSubmitting && !didSubmit && cartModalContent}
      {isSubmitting && isSubmittingModalContent}
      {didSubmit && didSubmitModalContent}
    </div>
  );
};

export default Cart;
