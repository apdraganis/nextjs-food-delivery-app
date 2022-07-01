import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth } from '../../../config/firebase';

export const fireAuthContext = createContext<any>({});

// export const useAuth = () => useContext(fireAuthContext);

type Props = {
  children: React.ReactNode
}

const FireAuthProvider: React.FC<Props> = (props) => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser({
          uid: user.uid,
          email: user.email,
          displayName: user.displayName
        })
      } else {
        setUser(null)
      }
      setLoading(false);
    })

    return () => unsubscribe()
  }, [])

  const signup = (email: string, password: string) => {
    return createUserWithEmailAndPassword(auth, email, password);
  }

  const login = (email: string, password: string) => {
    return signInWithEmailAndPassword(auth, email, password);
  }

  const logout = async () => {
    setUser(null);
    await signOut(auth);
  }

  return (
    <fireAuthContext.Provider value={{ user, login, signup, logout }}>
      {loading ? null : props.children}
    </fireAuthContext.Provider>
  )
};

export default FireAuthProvider;