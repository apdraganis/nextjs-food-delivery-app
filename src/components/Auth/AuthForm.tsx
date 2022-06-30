import { NextPage } from "next";
import styles from './AuthForm.module.scss'

const AuthForm: NextPage = () => {
  return (
    <section className={styles.auth}>
      <h1>Login</h1>
      <form>
        <div className={styles.control}>
          <label htmlFor='email'>Your Email</label>
          <input type='email' id='email' required />
        </div>
        <div className={styles.control}>
          <label htmlFor='password'>Your Password</label>
          <input
            type='password'
            id='password'
            required
          />
        </div>

        <div className={styles.actions}>
          <button>Login</button>
          <button className={styles.toggle}>
            Create new account
          </button>
        </div>
      </form>
    </section>
  )
}

export default AuthForm;