import { createContext } from 'react';

export interface Item {
  id: string;
  name: string;
  amount: number;
  price: number;
}

export interface CartContextInterface {
  items: Item[];
  totalAmount: number;
  addItem: (item: Item) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextInterface>({
  items: [],
  totalAmount: 0,
  addItem: (item: Item) => { },
  removeItem: (id: string) => { },
  clearCart: () => { }
});

export default CartContext;