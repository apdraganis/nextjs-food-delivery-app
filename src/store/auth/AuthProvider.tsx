import { createContext, useEffect, useState } from "react";
import { onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, UserCredential } from 'firebase/auth';
import { auth } from '../../../config/firebase';


// interface AuthContextInterface {
//   user: any;
//   login: (email: string, password: string) => Promise<UserCredential>;
//   signup: (email: string, password: string) => Promise<UserCredential>;
//   logout: () => void;
// }

export const AuthContext = createContext<any>({});

type Props = {
  children: React.ReactNode
}

const AuthProvider: React.FC<Props> = (props) => {
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
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {loading ? null : props.children}
    </AuthContext.Provider>
  )
};

export default AuthProvider;