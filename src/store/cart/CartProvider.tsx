import React, { useReducer } from "react"
import CartContext, { CartContextInterface } from "./cart-context"
import { Item } from './cart-context';

interface Action {
  type: string
  item: Item | undefined
  id: string | undefined
};

interface DefaultCart {
  items: Item[];
  totalAmount: number;
}

const defaultCartState: DefaultCart = {
  items: [],
  totalAmount: 0
}

const cartReducer = (state: DefaultCart, action: Action) => {
  if (action.type === 'ADD') {
    const updatedTotalAmount = state.totalAmount + action.item!.price * action.item!.amount;

    const existingCartItemIndex = state.items.findIndex(
      (item: Item) => item.id === action.item!.id
    );

    const existingItem = state.items[existingCartItemIndex];

    let updatedItems;

    if (existingItem) {
      const updatedItem = {
        ...existingItem,
        amount: existingItem.amount + action.item!.amount
      };

      updatedItems = [...state.items];

      updatedItems[existingCartItemIndex] = updatedItem;

    } else {
      updatedItems = state.items.concat(action.item!);
    };

    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount
    };
  };


  if (action.type === 'REMOVE') {
    const existingCartItemIndex = state.items.findIndex(
      (item: Item) => item.id === action.id
    );

    const existingItem = state.items[existingCartItemIndex];

    const updatedTotalAmount = state.totalAmount - existingItem.price;

    let updatedItems;

    if (existingItem.amount === 1) {
      updatedItems = state.items.filter((item: Item) => item.id !== action.id);
    } else {
      const updatedItem = { ...existingItem, amount: existingItem.amount - 1 };
      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = updatedItem;
    }

    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount
    };
  };


  if (action.type === 'CLEAR') {
    return defaultCartState;
  };

  return defaultCartState;
};

type Props = {
  children: React.ReactNode
}

const CartProvider: React.FC<Props> = (props) => {
  const [cartState, dispatchCartAction] = useReducer(cartReducer, defaultCartState);

  const addItemToCartHandler = (item: Item) => {
    dispatchCartAction({ type: 'ADD', item: item, id: undefined })
  }

  const removeItemFromCartHandler = (id: string) => {
    dispatchCartAction({ type: 'REMOVE', item: undefined, id: undefined })
  }

  const clearCartHandler = () => {
    dispatchCartAction({ type: 'CLEAR', item: undefined, id: undefined })
  }

  const cartContext: CartContextInterface = {
    items: [],
    totalAmount: 0,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
    clearCart: clearCartHandler
  }

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;