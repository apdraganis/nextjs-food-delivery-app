import Link from 'next/link';
import AuthIcon from './AuthIcon';
import styles from './AuthButton.module.scss';

const AuthButton = () => {
  return (
    <Link href='/auth'>
      <button className={styles.button}>
        <AuthIcon />
      </button>
    </Link>
  )
}

export default AuthButton;