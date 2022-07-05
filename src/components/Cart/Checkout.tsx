import Link from 'next/link';
import React, { useRef, useState } from 'react';
import { RootState } from '../../../src/store/redux/index'
import { useDispatch, useSelector } from 'react-redux';
import { cartActions } from '../../store/redux';
import styles from './Checkout.module.scss';


interface CheckoutProps {
  url: string;
}

interface UserData {
  name: string;
  street: string;
  postal: string;
  city: string;
}

const isEmpty = (value: string) => value.trim() === '';
const isFiveChars = (value: string) => value.trim().length === 5;


const Checkout = ({ url }: CheckoutProps) => {
  const items = useSelector((state: RootState) => state.items);
  const dispatch = useDispatch();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);
  const [hasError, setHasError] = useState(false);

  const [formInputsValidity, setFormInputsValidity] = useState({
    name: true,
    street: true,
    city: true,
    postal: true
  });

  const nameInputRef = useRef<HTMLInputElement>(null);
  const streetInputRef = useRef<HTMLInputElement>(null);
  const postalInputRef = useRef<HTMLInputElement>(null);
  const cityInputRef = useRef<HTMLInputElement>(null);

  // Submit data
  const submitOrderHandler = async (userData: UserData) => {
    setIsSubmitting(true);
    const res = await fetch(`${url}/orders.json`, {
      method: 'POST',
      body: JSON.stringify({
        user: userData,
        orderItem: items
      })
    });
    if (!res.ok) {
      setHasError(true);
      setIsSubmitting(false);
      return;
    }
    setIsSubmitting(false);
    setDidSubmit(true);
    dispatch(cartActions.clear());
  };

  const confirmHandler = (event: React.FormEvent) => {
    event.preventDefault();

    const enteredName = nameInputRef.current!.value;
    const enteredStreet = streetInputRef.current!.value;
    const enteredPostal = postalInputRef.current!.value;
    const enteredCity = cityInputRef.current!.value;

    const enteredNameIsValid = !isEmpty(enteredName);
    const enteredStreetIsValid = !isEmpty(enteredStreet);
    const enteredCityIsValid = !isEmpty(enteredCity);
    const enteredPostalIsValid = isFiveChars(enteredPostal);

    setFormInputsValidity({
      name: enteredNameIsValid,
      street: enteredStreetIsValid,
      city: enteredCityIsValid,
      postal: enteredPostalIsValid
    });

    const formIsValid = enteredNameIsValid && enteredCityIsValid && enteredStreetIsValid && enteredPostalIsValid;
    if (!formIsValid) {
      return;
    }

    if (items.length < 1) {
      setHasError(true);
      return;
    }

    submitOrderHandler({
      name: enteredName,
      street: enteredStreet,
      postal: enteredPostal,
      city: enteredCity,
    });
  };

  const isSubmittingModalContent = <p>Sending order data...</p>;
  const didSubmitModalContent = <>
    <p>Order sent successfully!</p>
    <div className={styles.actions}>
      <Link href='/'><button className={styles.button}>
        Home
      </button>
      </Link>
    </div>
  </>
  const hasErrorModalContent = <>
    <p>Oops.. something went wrong!</p>
    <div className={styles.actions}>
      <Link href='/'><button className={styles.button}>
        Home
      </button>
      </Link>
    </div>
  </>

  return (
    <section className={styles.checkout}>
      <h1>Checkout</h1>
      {!isSubmitting && !didSubmit && !hasError && (
        <form onSubmit={confirmHandler}>
          <div className={`${styles.control} ${!formInputsValidity.name && styles.invalid}`}>
            <label htmlFor='name'>Name</label>
            <input type='text' id='name' ref={nameInputRef} />
            {!formInputsValidity.name && <p>Please enter a valid name</p>}
          </div>
          <div className={`${styles.control} ${!formInputsValidity.street && styles.invalid}`}>
            <label htmlFor='street'>Street</label>
            <input type='text' id='street' ref={streetInputRef} />
            {!formInputsValidity.street && <p>Plea
              se enter a valid address</p>}
          </div>
          <div className={`${styles.control} ${!formInputsValidity.postal && styles.invalid}`}>
            <label htmlFor='postal'>Postal Code</label>
            <input type='number' id='postal' ref={postalInputRef} />
            {!formInputsValidity.postal && <p>Please enter a valid postal code (5 characters)</p>}
          </div>
          <div className={`${styles.control} ${!formInputsValidity.city && styles.invalid}`}>
            <label htmlFor='city'>City</label>
            <input type='text' id='city' ref={cityInputRef} />
            {!formInputsValidity.city && <p>Please enter a valid city</p>}
          </div>
          <div className={styles.actions}>
            <button><Link href='/products'>Cancel</Link></button>
            <button className={styles.submit}>Confirm</button>
          </div>
        </form>
      )}
      {isSubmitting && !didSubmit && (isSubmittingModalContent)}
      {didSubmit && didSubmitModalContent}
      {hasError && hasErrorModalContent}
    </section>
  );
};

export default Checkout;