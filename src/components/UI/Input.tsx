import React from 'react';
import styles from './Input.module.scss';

const Input = ((props: any) => {
  return (
    <div className={styles.input}>
      <label htmlFor={props.input.id}>{props.label}</label>
      <input ref={props.reff} {...props.input} />
    </div>
  );
});

export default Input;
