import { useRouter } from 'next/router';
import CartItem from './CartItem';
import { useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { cartActions } from '../../store/redux';
import { AuthContext } from '../../store/auth/AuthProvider';
import styles from './Cart.module.scss';

interface CartProps {
  onClose: () => void;
}

const Cart = (props: CartProps) => {
  const router = useRouter();
  const { user } = useContext(AuthContext);
  const items = useSelector((state: any) => state.items);
  const totalAmount = useSelector((state: any) => state.totalAmount);
  const dispatch = useDispatch();

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
  };

  const modalActions = <div className={styles.actions}>
    <button className={styles['button--alt']} onClick={props.onClose}>
      Close
    </button>
    {hasItems && <button className={styles.button} onClick={orderHandler}>To Checkout</button>}
  </div>

  const discountContent =
    <>
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
    </>

  return (
    <div>
      {hasItems && (
        <>
          {cartItems}
          <div className={styles.total}>
            <span>Total Price</span>
            <span>{totalPrice}</span>
          </div>
          {discountContent}
          {modalActions}
        </>
      )}
      {!hasItems && <p>No items added..</p>}
    </div>
  );
};

export default Cart;
