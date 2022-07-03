import React, { useRef, useState } from 'react';
import styles from './Checkout.module.scss';

const isEmpty = (value: any) => value.trim() === '';
const isFiveChars = (value: any) => value.trim().length === 5;

const Checkout = (props: any) => {
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


  const cancelHandler = (event: React.FormEvent) => {
    event.preventDefault();
    props.setIsCheckout(false);
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
  }
  //   const formIsValid = enteredNameIsValid && enteredCityIsValid && enteredStreetIsValid && enteredPostalIsValid;
  //   if (!formIsValid) {
  //     return;
  //   }

  //   // Submit data
  //   props.onConfirm({
  //     name: enteredName,
  //     street: enteredStreet,
  //     postal: enteredPostal,
  //     city: enteredCity,
  //   })
  // };

  return (
    <section className={styles.checkout}>
      <h1>Checkout</h1>
      <form onSubmit={confirmHandler}>
        <div className={`${styles.control} ${!formInputsValidity.name && styles.invalid}`}>
          <label htmlFor='name'>Name</label>
          <input type='text' id='name' ref={nameInputRef} />
          {/* {!formInputsValidity.name && <p>Please enter a valid name</p>} */}
        </div>
        <div className={`${styles.control} ${!formInputsValidity.street && styles.invalid}`}>
          <label htmlFor='street'>Street</label>
          <input type='text' id='street' ref={streetInputRef} />
          {/* {!formInputsValidity.street && <p>Please enter a valid address</p>} */}
        </div>
        <div className={`${styles.control} ${!formInputsValidity.postal && styles.invalid}`}>
          <label htmlFor='postal'>Postal Code</label>
          <input type='text' id='postal' ref={postalInputRef} />
          {/* {!formInputsValidity.postal && <p>Please enter a valid postal code (5 characters)</p>} */}
        </div>
        <div className={`${styles.control} ${!formInputsValidity.city && styles.invalid}`}>
          <label htmlFor='city'>City</label>
          <input type='text' id='city' ref={cityInputRef} />
          {/* {!formInputsValidity.city && <p>Please enter a valid city</p>} */}
        </div>
        <div className={styles.actions}>
          <button onClick={cancelHandler}>Cancel</button>
          <button className={styles.submit}>Confirm</button>
        </div>
      </form>
    </section>
  );
};

export default Checkout;