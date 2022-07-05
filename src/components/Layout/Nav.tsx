import Link from 'next/link';
import CartButton from '../Cart/CartButton';
import styles from './Nav.module.scss';

import AuthButton from '../Auth/AuthButton';

interface NavProps {
  onShowCart: () => void
}

const Nav = ({ onShowCart }: NavProps) => {

  return (
    <>
      <nav className={styles.nav}>
        <Link href='/'><h1>TypeCream</h1></Link>
        <span className={styles.menu}>
          <CartButton onClick={onShowCart} />
          <AuthButton />
        </span>
      </nav>
    </ >
  );
};

export default Nav;
