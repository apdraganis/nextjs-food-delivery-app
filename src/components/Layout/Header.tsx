import { Fragment } from 'react';

import HeaderCartButton from './HeaderCartButton';
import styles from './Header.module.css';
import AuthButton from '../Auth/AuthButton';

const Header = (props: any) => {

  return (
    <Fragment>
      <header className={styles.header}>
        <h1>TypeCream</h1>
        <p className={styles.discount}>-20% for registered users!</p>
        <span className={styles.menu}>
          <HeaderCartButton onClick={props.onShowMenu} />
          <AuthButton onClick={props.onShowMenu} />
        </span>
      </header>
    </Fragment >
  );
};

export default Header;
