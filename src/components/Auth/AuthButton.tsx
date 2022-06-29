import styles from './AuthButton.module.css';
import AuthIcon from './AuthIcon';

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