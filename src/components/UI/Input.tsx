import React from 'react';
import styles from './Input.module.scss';

interface InputElementAttributesInterface {
  id: string;
  type: string,
  min: string,
  max: string,
  step: string,
  defaultValue: string,
}

interface InputComponentProps {
  label: string;
  input: InputElementAttributesInterface;
  reff: any
}

const Input = ((props: InputComponentProps) => {
  return (
    <div className={styles.input}>
      <label htmlFor={props.input.id}>{props.label}</label>
      <input ref={props.reff} {...props.input} />
    </div>
  );
});

export default Input;
