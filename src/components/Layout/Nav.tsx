import { Fragment } from 'react';
import Link from 'next/link';
import HeaderCartButton from './HeaderCartButton';
import styles from './Nav.module.scss';

import AuthButton from '../Auth/AuthButton';

const Header = (props: any) => {

  return (
    <Fragment>
      <nav className={styles.nav}>
        <Link href='/'><h1>TypeCream</h1></Link>
        {/* <HeaderCartButton /> */}
        <AuthButton />
      </nav>
    </Fragment >
  );
};

export default Header;
