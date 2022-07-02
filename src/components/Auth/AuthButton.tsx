import styles from './AuthButton.module.scss';
import AuthIcon from './AuthIcon';
import Link from 'next/link';

const AuthButton = (props: any) => {
  const showAuthHandler = () => {
    props.onClick(false)
  }

  return (
    <button className={styles.button}>
      <AuthIcon />
    </button>
  )
}

export default AuthButton;