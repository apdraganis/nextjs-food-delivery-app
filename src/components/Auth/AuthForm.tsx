import { NextPage } from "next";
import { useRouter } from "next/router";
import { FormEvent, FormEventHandler, useContext, useRef, useState } from "react";
import { AuthContext } from "../../store/auth/AuthProvider";
import styles from './AuthForm.module.scss'

const AuthForm: NextPage = () => {
  const router = useRouter();
  const authCtx = useContext(AuthContext);
  const emailRef = useRef<HTMLInputElement>(null);
  const passRef = useRef<HTMLInputElement>(null);
  const [isLogin, setIsLogin] = useState(true);
  const [authError, setAuthError] = useState(false);

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
    setAuthError(false);
  }

  const loginHandler = async () => {
    const email = emailRef.current!.value;
    const pass = passRef.current!.value;

    const res = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDp7kDi_aaBPymgH1782RfsI_0ZDtU9k1E',
      {
        method: 'POST',
        body: JSON.stringify({
          email: email,
          password: pass,
          returnSecureToken: true
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      });

    const data = await res.json();

    if (res.ok) {
      authCtx.login(data.idToken);
      router.replace('/products');
    } else {
      setAuthError(true)
      emailRef.current!.focus();
    }
  }

  const signupHandler = async () => {
    let email = emailRef.current!.value;
    let pass = passRef.current!.value;

    const res = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDp7kDi_aaBPymgH1782RfsI_0ZDtU9k1E', {
      method: 'POST',
      body: JSON.stringify({
        'email': email,
        'password': pass,
        'returnSecureToken': true
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })

    const data = await res.json();

    if (res.ok) {
      router.replace('/products');
    } else {
      setAuthError(true)
      emailRef.current!.focus();
    }
  };


  const submitHandler = (event: FormEvent) => {
    event.preventDefault();

  };

  return (
    <section className={styles.auth}>
      {authCtx.isLoggedIn && (
        <>
          <h1>Manage Account</h1>
          <div className={styles.actions}>
            <button onClick={authCtx.logout}>Log Out</button>
          </div>
        </>
      )}
      {!authCtx.isLoggedIn && (
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