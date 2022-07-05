import React, { useRef, useState } from 'react';
import Input from '../../UI/Input';
import styles from './MealItemForm.module.scss';

interface MealItemFormProps {
  addToCartHandler: (amount: number) => void;
  id: string
}

const MealItemForm = ({ addToCartHandler, id }: MealItemFormProps) => {
  const [amountIsValid, setAmountIsValid] = useState(true);
  const amountInputRef = useRef<HTMLInputElement>();

  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault();

    const enteredAmount = amountInputRef.current!.value;
    const enteredAmountNumber = +enteredAmount;

    if (enteredAmount.trim().length === 0 || enteredAmountNumber < 1 || enteredAmountNumber > 5) {
      setAmountIsValid(false);
      return;
    }

    addToCartHandler(enteredAmountNumber);
  };

  return (
    <form onSubmit={submitHandler} className={styles.form}>
      <Input
        reff={amountInputRef}
        label='Amount'
        input={{
          id: 'amount_' + id,
          type: 'number',
          min: '1',
          max: '5',
          step: '1',
          defaultValue: '1',
        }}
      />
      <button>+ Add</button>
      {!amountIsValid && <p>Please enter a valid amount (1-5).</p>}
    </form>
  );
};

export default MealItemForm;
