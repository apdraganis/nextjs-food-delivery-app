import { Fragment, useContext } from 'react';
import { AuthContext } from '../../store/auth/AuthProvider';
// import HeaderCartButton from './HeaderCartButton';
import styles from './Nav.module.css';

import AuthButton from '../Auth/AuthButton';

const Header = (props: any) => {
  const authCtx = useContext(AuthContext);

  return (
    <Fragment>
      <nav className={styles.nav}>
        <h1>TypeCream</h1>
        <AuthButton />
      </nav>
    </Fragment >
  );
};

export default Header;
