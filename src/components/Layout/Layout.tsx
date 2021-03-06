import { ReactNode, useState } from 'react';
import Modal from '../UI/Modal';
import Nav from './Nav';
import Cart from '../Cart/Cart';
import Footer from './Footer';

type Props = {
  children: ReactNode
}

const Layout: React.FC<Props> = ({ children }) => {
  const [showCart, setShowCart] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const showCartModalHandler = (showCart: boolean) => {
    showCart ? setShowCart(true) : setShowCart(false);
    setModalOpen(true)
  };

  const hideCartModalHandler = () => {
    setModalOpen(false);
  };

  return (
    <>
      {modalOpen && (
        <Modal showCart={showCart} onClose={hideCartModalHandler}>
          <Cart onClose={hideCartModalHandler} />
        </Modal>)}
      <Nav onShowCart={() => showCartModalHandler(showCart)} />
      <main>{children}</main>
      <Footer />
    </>
  )
};

export default Layout;