import { ReactNode } from 'react';
import Nav from './Nav';

type Props = {
  children: ReactNode
}

const Layout: React.FC<Props> = ({ children }) => {
  return (
    <>
      <Nav />
      <main>{children}</main>
    </>
  )
};

export default Layout;