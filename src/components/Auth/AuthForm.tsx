import { NextPage } from "next";
import { useRouter } from "next/router";
import { FormEvent, useContext, useRef, useState } from "react";
import { fireAuthContext } from "../../store/auth/fireAuthContext";
import styles from './AuthForm.module.scss'

const AuthForm: NextPage = () => {
  const router = useRouter();
  const { user, signup, login, logout } = useContext(fireAuthContext);
  const emailRef = useRef<HTMLInputElement>(null);
  const passRef = useRef<HTMLInputElement>(null);
  const [isLogin, setIsLogin] = useState(true);
  const [authError, setAuthError] = useState(false);

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
    setAuthError(false);
    emailRef.current!.value = '';
    passRef.current!.value = '';
  }

  const loginHandler = async () => {
    let email = emailRef.current!.value;
    let pass = passRef.current!.value;
    try {
      await login(email, pass);
      router.replace('/products')
    } catch (error) {
      setAuthError(true);
      emailRef.current!.focus();
    }
  }

  const signupHandler = async () => {
    let email = emailRef.current!.value;
    let pass = passRef.current!.value;
    try {
      await signup(email, pass);
    } catch (error) {
      setAuthError(true);
      emailRef.current!.focus();
    }
  };

  const logoutHandler = () => {
    logout();
    router.replace('/');
  }


  const submitHandler = (event: FormEvent) => {
    event.preventDefault();
  };

  return (
    <section className={styles.auth}>
      {user && (
        <>
          <h1>Manage Account</h1>
          <div className={styles.actions}>
            <button onClick={logoutHandler}>Log Out</button>
          </div>
        </>
      )}
      {!user && (
        <>
          <h1>{isLogin ? 'Log In' : 'Create Account'}</h1>
          <form onSubmit={submitHandler}>
            <div className={styles.control}>
              <label htmlFor='email'>Email</label>
              <input type='email' id='email' ref={emailRef} />
            </div>
            <div className={styles.control}>
              <label htmlFor='password'>Password</label>
              <input
                type='password'
                id='password'
                ref={passRef}
              />
            </div>
            {authError && (
              <>
                <p>Invalid Credentials! {!isLogin && 'Password must have at least 6 characters.'}</p>

              </>
            )}
            <div className={styles.actions}>
              {isLogin && <button onClick={loginHandler}>Log In</button>}
              {!isLogin && <button onClick={signupHandler}>Create Account</button>}
              <button className={styles.toggle} onClick={switchAuthModeHandler}>{!isLogin ? 'Log In' : 'Create Account'}</button>
            </div>
          </form>
        </>
      )}
    </section>
  )
}

export default AuthForm;