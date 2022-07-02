import { useEffect, useState } from 'react';
import CartIcon from './CartIcon';
import styles from './CartButton.module.scss';
import { useSelector } from 'react-redux';


const CartButton = (props: any) => {
  const [btnIsHighLighted, setBtnIsHighLighted] = useState(false);
  const items = useSelector((state: any) => state.items);

  const numberOfCartItems = items.reduce((curNumber: any, item: any) => {
    return curNumber + item.amount;
  }, 0);

  const btnClasses = `${styles.button} ${btnIsHighLighted ? styles.bump : ''}`;

  useEffect(() => {
    if (items.length === 0) {
      return;
    }
    setBtnIsHighLighted(true);

    const timer = setTimeout(() => {
      setBtnIsHighLighted(false);
    }, 300);

    return () => {
      clearTimeout(timer);
    };

  }, [items]);


  return (
    <button className={btnClasses} onClick={props.onClick}>
      <span className={styles.icon}>
        <CartIcon />
      </span>
      <span className={styles.badge}>{numberOfCartItems}</span>
    </button>
  );
};

export default CartButton;
