import { createContext, useState } from "react";

interface AuthContextInterface {
  token: string;
  isLoggedIn: boolean;
  login: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextInterface>({
  token: '',
  isLoggedIn: false,
  login: (token: string) => { },
  logout: () => { }
});


type Props = {
  children: React.ReactNode
}



const AuthProvider: React.FC<Props> = (props) => {
  const [token, setToken] = useState('');

  const loginHandler = (token: string) => {
    setToken(token);
  };

  const logoutHandler = () => {
    setToken('');
  }

  const authContext = {
    token: token,
    isLoggedIn: !!token,
    login: loginHandler,
    logout: logoutHandler
  }

  return (
    <AuthContext.Provider value={authContext}>
      {props.children}
    </AuthContext.Provider>
  )
};

export default AuthProvider;